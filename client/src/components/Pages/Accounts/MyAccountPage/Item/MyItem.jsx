import React, {useState} from 'react';
import MyButton from "../../../../UI/MyButton/MyButton"
import styleSheet from "./Item.module.css"
import moneyImg from '../../../../../img/money.png'
import clockImg from '../../../../../img/clock.png'
import caseImg from '../../../../../img/case.png'
import sleepImg from '../../../../../img/sleep.png'
import freeImg from '../../../../../img/free.png'
import {useContextState} from "../../../../../state-provider/allStateProvider";


const MyItem = (prop) => {

    const date = new Date(prop.data.createdAt).toLocaleString()
    const {deletePost} = useContextState()

    const deletingPost = () => {
        deletePost(prop.data.id)
    }

    return (
        <div className={styleSheet.Item}>
            <div className={styleSheet.head}>
                <div>
                    <img className={styleSheet.img} src={caseImg} alt={'Должность'}/>
                    <span> </span>
                    <span>{prop.data.jobTitle}</span>
                    <div>
                        <div>г. {prop.data.city}</div>
                        <div>{date}</div>
                    </div>
                </div>
                <MyButton onClick={() => deletingPost()} anthrStyleButt={styleSheet.button}>Удалить</MyButton>
            </div>
            <div className={styleSheet.rows}>
                <img className={styleSheet.img} src={moneyImg} alt={'Зарплата'}/>
                <span> </span>
                {prop.data.ySalary} рублей
            </div>
            <div className={styleSheet.rows}>
                <img className={styleSheet.img} src={clockImg} alt={'Рабочих суток'}/>
                <span> </span>
                {prop.data.timeSpendingPerY} суток на работе
            </div>
            <div className={styleSheet.rows}>
                <img className={styleSheet.img} src={sleepImg} alt={'Суток сна'}/>
                <span> </span>
                {prop.data.sleepInY} суток сна
            </div>
            <div className={styleSheet.rows}>
                <img className={styleSheet.img} src={freeImg} alt={'Суток свободы'}/>
                <span> </span>
                {prop.data.freeTime} суток свободы
            </div>
        </div>
    );
};

export default MyItem;
