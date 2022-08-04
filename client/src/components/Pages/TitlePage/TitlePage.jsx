import React, {useEffect, useMemo, useState} from 'react';
import {useHttp} from "../../../hooks/http.hook";
import Loader from "../../Loader/Loader";
import TitleItem from "./TitleItem/TitleItem";
import axios from "axios";
import {myConfig} from "../../../config.js";
import styleSheets from './TitlePage.module.css'
import {isMobile} from 'react-device-detect';

const TitlePage = () => {

    const {request} = useHttp()
    const [data, setData] = useState([])
    const [titleLoading, setTitleLoading] = useState(true)
    const [page, setPage] = useState(0)
    const [uploadMore, setUploadMore] = useState(false)

    const getNews = async () => {
        const dataFetch = await request(`http://${myConfig.MY_URL}/api/external/getJobsNews`, 'POST', {page})
        setData(prev => [...prev, ...dataFetch.included.materials.objects])
    }

    useEffect(() => {
        if (uploadMore) {
            axios.post(
                `http://${myConfig.MY_URL}/api/external/getJobsNews`,
                {page: page + 20}
            )
                .then((res) => {
                        setPage(prev => prev + 20)
                        setData(prev => [...prev, ...res.data.included.materials.objects])
                    }
                )
                .finally(() =>
                    setUploadMore(false)
                )
        }
    }, [uploadMore])

    const uploadFn = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 1000
            && page < 133 && uploadMore === false) {
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
        getNews()
    }, [])

    useMemo(() => {
        if (data.length) {
            setTitleLoading(false)
        }
    }, [data])

    return (
        <div>
            <div className={isMobile ? styleSheets.titleTextM : styleSheets.titleText}>
                На этом сайте вы можете поделиться своей профессией и сравнить её с другими, а так же, возможно, сможете узнать что то новенькое.
            </div>
            <div>
                {titleLoading ? <Loader/> : data.map((el, i) => <TitleItem item={el} key={i}/>)}
            </div>
        </div>
    );
};

export default TitlePage;
