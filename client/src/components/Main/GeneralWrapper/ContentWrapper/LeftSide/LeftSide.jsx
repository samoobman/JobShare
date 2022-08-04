import React, {useEffect, useMemo, useState} from 'react';
import axios from 'axios'
import styleSheet from "./LeftSide.module.css"
import {useHttp} from "../../../../../hooks/http.hook";
import Loader from "../../../../Loader/Loader";
import LeftItem from "./LeftItem/LeftItem";
import {useContextState} from "../../../../../state-provider/allStateProvider";
import okImg from "../../../../../img/ok.png";
import {myConfig} from "../../../../../config.js";
import {isMobile} from 'react-device-detect';



const LeftSide = () => {

    const {city, setCityFn, country, alertHandler} = useContextState()
    const {request} = useHttp()
    const [jobs, setJobs] = useState([])
    const [leftLoading, setLeftLoading] = useState(true)
    const [cityInputState, setInputCityState] = useState('')
    const [numOfPages, setNumOfPages] = useState(0)
    const [currentCity, setCurrentCity] = useState('')
    const [currentCityID, setCurrentCityID] = useState('')
    const [uploadMore, setUploadMore] = useState(false)

    const getInfoAndJobs = async () => {
        try {
            let cityInfo
            let countryInfo
            city ? cityInfo = city : cityInfo = null
            country ? countryInfo = country : countryInfo = null
            if (!city || !country) {
                const ipDetail = await request(`http://${myConfig.MY_URL}/api/external/getCity`, 'POST')
                if (ipDetail.City) {
                    cityInfo = ipDetail.City
                    countryInfo = ipDetail.CountryName
                    setCityFn(cityInfo, countryInfo)
                }
            }
            const data = await request(`http://${myConfig.MY_URL}/api/external/getJobsHH`, 'POST', {
                city: cityInfo,
                country: countryInfo
            })
            if (!data.hasOwnProperty('items')) {
                setCurrentCity(data.city)
                setLeftLoading(false)
            } else {
                setJobs(data.items)
                setCurrentCity(data.city)
                setCurrentCityID(data.id)
            }
        } catch (e) {
        }
    }

    const changeHandler = (e) => {
        setInputCityState(e.target.value)
    }

    const inputCityB = async () => {
        try {
            setLeftLoading(true)
            const data = await request(
                `http://${myConfig.MY_URL}/api/external/getJobsHHSearch`,
                'POST',
                {city: cityInputState}
            )
            if (!data.hasOwnProperty('items')) {
                setLeftLoading(false)
                alertHandler('Не найдено')
            } else {
                setJobs(data.items)
                setCurrentCity(data.city)
                setCurrentCityID(data.id)
            }
        } catch (e) {
        }
    }

    const inputCityE = async (e) => {
        if (cityInputState.length > 2) {
            try {
                if (e.key === 'Enter') {
                    setLeftLoading(true)
                    const data = await request(
                        `http://${myConfig.MY_URL}/api/external/getJobsHHSearch`,
                        'POST',
                        {city: cityInputState}
                    )
                    if (!data.hasOwnProperty('items')) {
                        setLeftLoading(false)
                        alertHandler('Не найдено')
                    } else {
                        setJobs(data.items)
                        setCurrentCity(data.city)
                        setCurrentCityID(data.id)
                    }
                }
            } catch (e) {
            }
        }
    }

    const renderJobs = () => {
        if (leftLoading) {
            return <Loader/>
        }
        if (jobs.length === 0) {
            return <div className={styleSheet.warning}>Не удалось загрузить вакансии.<br/><br/>Попробуйте перезагрузить
                страницу.</div>
        }
        return jobs.map((el, i) =>
            <LeftItem data={el} key={i}/>
        )
    }

    useEffect(() => {
        if (uploadMore) {
            setNumOfPages(prev => prev++)
            axios.post(
                `http://${myConfig.MY_URL}/api/external/getJobsHHMore`,
                {id: currentCityID, pageNum: numOfPages}
            )
                .then((res) => {
                        setJobs(prev => [...prev, ...res.data.items])
                    }
                )
                .finally(() =>
                    setUploadMore(false)
                )
        }
    }, [uploadMore])

    const uploadFn = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 1000
            && numOfPages < 133) {
            setUploadMore(true)
        }
    }

    useEffect(() => {
        document.addEventListener('scroll', uploadFn)
        return function () {
            document.removeEventListener('scroll', uploadFn)
        }
    }, [])

    useEffect(() => {
        getInfoAndJobs()
    }, [])

    useMemo(() => {
        if (jobs.length && leftLoading === true) {
            setLeftLoading(false)
        }
    }, [jobs])

    return (
        <div className={styleSheet.LeftSide}>
            {currentCity ?
                <div className={styleSheet.Header}>Работа в городе {currentCity}:</div> :
                <div className={styleSheet.Header}>Загрузка...</div>}
            {<div>
                <div className={styleSheet.cityContainer}>
                    <input value={cityInputState} onChange={changeHandler} onKeyPress={inputCityE}
                           placeholder={'Изменить город'} className={isMobile ? styleSheet.cityInM : styleSheet.cityIn}/>
                    <input onClick={inputCityB} type={"image"} src={okImg}
                           className={isMobile ? styleSheet.btnSearchM : styleSheet.btnSearch}/>
                </div>
            </div>}
            {useMemo(() => renderJobs(), [jobs, leftLoading])}
        </div>
    );
};

export default LeftSide;
