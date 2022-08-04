import React from 'react';
import styleSheet from "./Item.module.css"
import moneyImg from '../../../../../img/money.png'
import clockImg from '../../../../../img/clock.png'
import caseImg from '../../../../../img/case.png'
import sleepImg from '../../../../../img/sleep.png'
import freeImg from '../../../../../img/free.png'


const SomeItem = (prop) => {

    const date = new Date(prop.data.createdAt).toLocaleString()

    return (
        <div className={styleSheet.Item}>
            <div className={styleSheet.head}>
                <img className={styleSheet.img} src={caseImg} alt={'Должность'}/>
                <span> </span>
                <span>{prop.data.jobTitle}</span>
                <div>
                    <div>г. {prop.data.city}</div>
                    <div>{date}</div>
                </div>
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

export default SomeItem;
