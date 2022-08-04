import React, {useEffect, useMemo, useState} from 'react';
import styleSheet from "./RightSide.module.css"
import {useContextState} from "../../../../../state-provider/allStateProvider";
import RightItem from "./RightItem/RightItem"
import {useHttp} from "../../../../../hooks/http.hook";
import Loader from "../../../../Loader/Loader";

const RightSide = () => {

    const {alertHandler, getJobs, allJobs} = useContextState()
    const {error, clearError} = useHttp()
    const [rightLoading, setRightLoading] = useState(true)
    const [numOfPages, setNumOfPages] = useState(2)
    const [uploadMore, setUploadMore] = useState(false)


    useEffect(() => {
        getJobs()
    }, [])

    useEffect(() => {
        alertHandler(error)
        clearError()
    }, [error, clearError])

    useMemo(() => {
        if (allJobs.length) {
            setRightLoading(false)
        }
    }, [allJobs])

    useEffect(() => {
        if (uploadMore) {
            getJobs(numOfPages)
            setNumOfPages(prev => prev++)
            setUploadMore(false)
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

    return (
        <div className={styleSheet.RightSide}>
            <div className={styleSheet.Header}>Последние профессии:</div>
            {rightLoading ? <Loader/> : allJobs.map((el, i) => <RightItem key={i} data={el}/>)}
        </div>
    );
};

export default RightSide;
