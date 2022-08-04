import React, {useEffect, useState} from 'react';
import styleSheet from "../AccauntPage.module.css"
import MyButton from '../../../UI/MyButton/MyButton'
import {useContextState} from "../../../../state-provider/allStateProvider";
import MyItem from "./Item/MyItem";
import avaPng from "../../../../img/man.png"

const SomeAccountPage = () => {

    const {userName, getUserPosts, userPosts, logoutHandler, toggleModalJob} = useContextState()

    useEffect(() => {
        getUserPosts()
    }, [])

    return (
        <div className={styleSheet.Page}>
            <div className={styleSheet.head}>
                <div className={styleSheet.titleName}><img className={styleSheet.img} alt={'Аватарка'} src={avaPng}/>
                    <span> </span>
                    {userName}
                    <MyButton onClick={logoutHandler} anthrStyleButt={styleSheet.exitButton}>Выйти</MyButton>
                    <MyButton onClick={toggleModalJob} anthrStyleButt={styleSheet.exitButton}>Добавить профессию</MyButton>
                </div>
            </div>
            <div className={styleSheet.row}>Список профессий:</div>
            {userPosts.length === 0 ? <div className={styleSheet.nanRes}>Профессий пока нет</div> :
                <div>{userPosts.map((el, i) => <MyItem key={i} data={el}/>)}</div>}
        </div>
    );
};

export default SomeAccountPage;
