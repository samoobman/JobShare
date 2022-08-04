import React, {useEffect, useState} from 'react';
import MyInput from "../../../UI/MyInput/MyInput";
import styleSheet from "../../Forms.module.css"
import MyButton from "../../../UI/MyButton/MyButton";
import {useContextState} from "../../../../state-provider/allStateProvider";
import {useNavigate} from "react-router-dom";
import {useHttp} from "../../../../hooks/http.hook";
import {myConfig} from "../../../../config.js";


const Another = () => {

    const {loading, request, error, clearError} = useHttp()
    const {toggleModalJob, alertHandler, getJobs, userId, token, userName, getUserPosts} = useContextState()
    let navigate = useNavigate();
    const [formJobState, setJobState] = useState({
        jobTitle: "",
        hPerDay: '',
        daysInWeek: '',
        sPerWeek: '',
        dVacPerY: '',
        sleepH: '',
        city: ''
    })
    const [jobResultState, setJobResult] = useState({})

    const changeHandler = (e) => {
        setJobState({...formJobState, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        const workDaysPerY = Math.ceil((365 - formJobState.dVacPerY) / 7) * formJobState.daysInWeek
        const timeSpendCount = Math.ceil((workDaysPerY * formJobState.hPerDay) / 24)
        const sleep = Math.ceil((formJobState.sleepH * 365) / 24)
        const free = Math.ceil(365 - (sleep + timeSpendCount))
        let ySalaryCount = formJobState.sPerWeek * 52
        setJobResult({
            user: userName,
            owner: userId,
            jobTitle: formJobState.jobTitle,
            ySalary: ySalaryCount.toString(),
            timeSpendingPerY: timeSpendCount.toString(),
            sleepInY: sleep.toString(),
            freeTime: free.toString(),
            city: formJobState.city
        })
    }, [formJobState])

    const formHandler = async () => {
        let isValid = true

        for (let key in formJobState) {
            if (formJobState.daysInWeek === 0 ||
                formJobState.daysInWeek === '' ||
                formJobState.hPerDay === 0 ||
                formJobState.hPerDay === '' ||
                formJobState.sPerWeek === 0 ||
                formJobState.sPerWeek === '' ||
                formJobState.sleepH === 0 ||
                formJobState.sleepH === '' ||
                formJobState.city === '') {
                isValid = false
            }
        }

        if (isValid) {
            try {
                const dataJob = await request(
                    `http://${myConfig.MY_URL}/api/job/jobpost`,
                    'POST',
                    {...jobResultState},
                    {Authorization: `Bearer ${token}`}
                )
                setJobState({
                    jobTitle: "",
                    hPerDay: '',
                    daysInWeek: '',
                    sPerWeek: '',
                    dVacPerY: '',
                    sleepH: '',
                    city: ''
                })
                setJobResult({})
                alertHandler("Опубликовано")
                toggleModalJob()
                await getJobs()
                getUserPosts()
                navigate(`/result/${dataJob.job.id}`)
            } catch (e) {
            }

        } else {
            alertHandler("Некорректно!")
        }
    }

    useEffect(() => {
        alertHandler(error)
        clearError()
    }, [error, clearError])

    return (
        <form className={styleSheet.MyForm} onSubmit={e => e.preventDefault()} onClick={e => e.stopPropagation()}>
            <div className={styleSheet.inputWrapper}>
                <MyInput value={formJobState.city} name={"city"} onChange={changeHandler} type='text' currentname='Ваш город'/>
                <MyInput value={formJobState.jobTitle} name={"jobTitle"} onChange={changeHandler} type="text" currentname="Название должности"/>
                <MyInput value={formJobState.hPerDay} name={"hPerDay"} onChange={changeHandler} type='number' currentname='Рабочих часов в день'/>
                <MyInput value={formJobState.daysInWeek} name={"daysInWeek"} onChange={changeHandler} type='number' currentname='Рабочих дней в неделю'/>
                <MyInput value={formJobState.dVacPerY} name={"dVacPerY"} onChange={changeHandler} type='number' currentname='Дней отпуска в году'/>
                <MyInput value={formJobState.sPerWeek} name={"sPerWeek"} onChange={changeHandler} type='number' currentname='Зарплата в неделю'/>
                <MyInput value={formJobState.sleepH} name={"sleepH"} onChange={changeHandler} type='number' currentname='Часов сна в сутки'/>
            </div>
            <MyButton disabled={loading} onClick={formHandler}>Готово</MyButton>
            <MyButton disabled={loading} onClick={toggleModalJob}>Отменить</MyButton>
        </form>
    );
};

export default Another;