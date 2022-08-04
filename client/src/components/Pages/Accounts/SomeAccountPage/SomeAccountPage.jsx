import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import styleSheet from "../AccauntPage.module.css"
import {useContextState} from "../../../../state-provider/allStateProvider";
import {useHttp} from "../../../../hooks/http.hook";
import SomeItem from "./Item/SomeItem";
import avaPng from "../../../../img/man.png"
import {myConfig} from "../../../../config.js";



const SomeAccountPage = () => {

    const {alertHandler, token} = useContextState()
    const {request} = useHttp()
    const [userJobs, setUserJobs] = useState([])
    const [userName, setUserName] = useState([])
    const linkId = useParams().id

    const getUserPosts = async (id, t) => {
        try {
            const user = await request(
                `http://${myConfig.MY_URL}/api/user/getUserName`,
                'post',
                {id}
            )
            setUserName(user)
            const userPosts = await request(
                `http://${myConfig.MY_URL}/api/user/getUserPosts`,
                'post',
                {id},
                {Authorization: `Bearer ${t}`}
            )
            setUserJobs([...userPosts])
        } catch (e) {
            alertHandler(e.message)
        }
    }

    useEffect(() => {
        getUserPosts(linkId, token)
    }, [linkId])

    return (
        <div className={styleSheet.Page}>
            <div className={styleSheet.head}>
                <div className={styleSheet.titleName}><img className={styleSheet.img} alt={'Аватарка'} src={avaPng}/>
                <span> </span>
                    {userName}
                </div>
            </div>
            <div className={styleSheet.row}>Список профессий:</div>
            {userJobs.length === 0 ? <div className={styleSheet.nanRes}>Профессий пока нет</div> : <div>{userJobs.map((el, i) => <SomeItem key={i} data={el}/>)}</div>}
        </div>
    );
};

export default SomeAccountPage;