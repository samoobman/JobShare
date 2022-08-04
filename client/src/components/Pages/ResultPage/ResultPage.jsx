import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styleSheet from "./ResultPage.module.css"
import {useParams} from 'react-router-dom'
import {useHttp} from "../../../hooks/http.hook";
import caseImg from "../../../img/case.png";
import moneyImg from "../../../img/money.png";
import clockImg from "../../../img/clock.png";
import sleepImg from "../../../img/sleep.png";
import freeImg from "../../../img/free.png";
import userImg from "../../../img/man.png";
import {useContextState} from "../../../state-provider/allStateProvider";
import Loader from "../../Loader/Loader";
import {myConfig} from "../../../config.js";

const ResultPage = () => {

    const {request} = useHttp()
    const [resultData, setResultData] = useState({})
    const {alertHandler} = useContextState()
    const [userName, setUserName] = useState()
    const [loading, setLoading] = useState(true)
    const [userId, setUserId] = useState()
    const id = useParams().id

    const findJob = async () => {
        try {
            const data = await request(`http://${myConfig.MY_URL}/api/job/${id}`, 'GET', null)
            setResultData({...data})
            setUserId(data.owner)
        } catch (e) {
        }
    }

    const getUser = async (owner) => {
        try {
            const userName = await request(`http://${myConfig.MY_URL}/api/user/getUserName`, 'post', {owner})
            setUserName(userName)
        } catch (e) {
            alertHandler(e.message)
        }
    }

    useEffect(() => {
        findJob()
    }, [])

    useMemo(() => {
        if (userId) {
            getUser(userId)
            setLoading(false)
        }
    }, [userId])

    const date = new Date(resultData.date).toLocaleString()

    if (loading) {
        return <Loader/>
    }

    return (
        <div className={styleSheet.Page}>
            <div className={styleSheet.head}>
                <div>
                    <img className={styleSheet.img} src={userImg} alt={'Пользователь'}/>
                    <span> </span>
                    {userName}
                </div>
                <div>
                    <div>г. {resultData.city}</div>
                    <div>{date}</div>
                </div>
            </div>
            <div className={styleSheet.body}>
                <div className={styleSheet.rows}>
                    <img className={styleSheet.img} src={caseImg} alt={'Должность'}/>
                    <span> </span>
                    {resultData.jobTitle}
                </div>
                <div className={styleSheet.rows}>
                    <img className={styleSheet.img} src={moneyImg} alt={'Зарплата за год'}/>
                    <span> </span>
                    {resultData.ySalary} рублей за год
                </div>
                <div className={styleSheet.rows}>
                    <img className={styleSheet.img} src={clockImg} alt={'Рабочих суток в году'}/>
                    <span> </span>
                    {resultData.timeSpendingPerY} суток на работе в году
                </div>
                <div className={styleSheet.rows}>
                    <img className={styleSheet.img} src={sleepImg} alt={'Суток сна в год'}/>
                    <span> </span>
                    {resultData.sleepInY} суток сна в год
                </div>
                <div className={styleSheet.rows}>
                    <img className={styleSheet.img} src={freeImg} alt={'Суток свободы за год'}/>
                    <span> </span>
                    {resultData.freeTime} суток свободы за год
                </div>
            </div>
        </div>
    );
};

export default ResultPage;