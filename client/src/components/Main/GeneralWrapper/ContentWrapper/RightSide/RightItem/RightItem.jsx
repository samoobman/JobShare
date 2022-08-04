import React, {useEffect, useState} from 'react';
import styleSheet from "./Item.module.css"
import moneyImg from '../../../../../../img/money.png'
import clockImg from '../../../../../../img/clock.png'
import caseImg from '../../../../../../img/case.png'
import sleepImg from '../../../../../../img/sleep.png'
import userImg from '../../../../../../img/man.png'
import freeImg from '../../../../../../img/free.png'
import townImg from '../../../../../../img/town.png'
import {useHttp} from "../../../../../../hooks/http.hook";
import {useContextState} from "../../../../../../state-provider/allStateProvider";

const RightItem = (prop) => {

    const [toggleState, setToggleState] = useState(false)
    const {alertHandler, getSomeUserPage} = useContextState()
    const {error, clearError} = useHttp()
    const [childrenAfter, setChildrenA] = useState([])
    const [childrenBefore, setChildrenB] = useState([])
    const date = new Date(prop.data.createdAt).toLocaleString()
    const [styleArr, setStyleArr] = useState(styleSheet.title)


    useEffect(() => {
        alertHandler(error)
        clearError()
    }, [error, clearError])

    const showDetails = () => {
        if (!toggleState) {
            setChildrenB([
                <div onClick={e => e.preventDefault()} className={styleSheet.head}>
                    <div onClick={() => getSomeUserPage(prop.data.userId)}>
                        <div>
                            <div>
                                <img className={styleSheet.img} src={userImg} alt={'Пользователь'}/>
                                <span> </span>
                                {prop.data.userName}
                            </div>
                            <div className={styleSheet.r}>
                                <img className={styleSheet.img} src={townImg} alt={'Город'}/>
                                <span> </span>
                                {prop.data.city}
                            </div>
                        </div>
                        <div>{date}</div>
                    </div>
                </div>])
            setChildrenA([
                <div className={styleSheet.rows}>
                    <img className={styleSheet.img} src={sleepImg} alt={'Суток сна'}/>
                    <span> </span>
                    {prop.data.sleepInY} суток сна
                </div>,
                <div className={styleSheet.rows}>
                    <img className={styleSheet.img} src={freeImg} alt={'Суток свободы'}/>
                    <span> </span>
                    {prop.data.freeTime} суток свободы
                </div>])
            setStyleArr(styleSheet.titleB)
            setToggleState(true)
        } else {
            setChildrenB([])
            setChildrenA([])
            setStyleArr(styleSheet.title)
            setToggleState(false)
        }

    }

    return (
        <div className={styleSheet.RightItem} onClick={showDetails}>
            <div className={styleArr}>
                <img className={styleSheet.imgProf} src={caseImg} alt={'Должность'}/>
                <span> </span>
                <span>{prop.data.jobTitle}</span>
            </div>
            {childrenBefore.map(el => el)}
            <div className={styleSheet.rows}>
                <img className={styleSheet.img} src={moneyImg} alt={'Зарплата'}/>
                <span> </span>
                {prop.data.ySalary} руб./год
            </div>
            <div className={styleSheet.rows}>
                <img className={styleSheet.img} src={clockImg} alt={'Рабочих суток'}/>
                <span> </span>
                {prop.data.timeSpendingPerY} суток работы
            </div>
            {childrenAfter.map(el => el)}
        </div>
    );
};

export default RightItem;
