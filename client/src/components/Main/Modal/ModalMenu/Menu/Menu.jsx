import React from 'react';
import styleSheets from "./Menu.module.css"
import {Link} from "react-router-dom";
import {useContextState} from "../../../../../state-provider/allStateProvider"
import {isMobile} from 'react-device-detect';

const Menu = () => {

    const {toggleModalJob, toggleModalReg, isAuth, logoutHandler, toggleModalLogin} = useContextState()
    const linkStyle = styleSheets.linkStyle
    const disappearLink = [styleSheets.linkStyle, styleSheets.regLinkMenu]



    if (isAuth) {
        return (
            <div className={styleSheets.Menu}>
                <Link className={linkStyle} to="/"><div className={isMobile ? styleSheets.menuButtonM : styleSheets.menuButton}>Главная</div></Link>
                <Link className={linkStyle} to="/myAccount"><div className={isMobile ? styleSheets.menuButtonM : styleSheets.menuButton}>Аккаунт</div></Link>
                {isMobile || document.documentElement.clientWidth < 1150 ?
                    <Link className={linkStyle} to="/vacancies"><div className={isMobile ? styleSheets.menuButtonM : styleSheets.menuButton}>Вакансии</div></Link> :
                <div></div>}
                {isMobile || document.documentElement.clientWidth < 1150 ?
                    <Link className={linkStyle} to="/jobs"><div className={isMobile ? styleSheets.menuButtonM : styleSheets.menuButton}>Профессии</div></Link> :
                    <div></div>}
                <Link className={linkStyle} to="/" onClick={toggleModalJob}><div className={isMobile ? styleSheets.menuButtonM : styleSheets.menuButton}>Добавить профессию</div></Link>
                <Link className={linkStyle} to="/about"><div className={isMobile ? styleSheets.menuButtonM : styleSheets.menuButton}>О сайте</div></Link>
                <Link onClick={logoutHandler} className={linkStyle} to="/"><div className={isMobile ? styleSheets.menuButtonM : styleSheets.menuButton}>Выйти</div></Link>
            </div>
        );
    }

    return (
        <div className={styleSheets.Menu}>
            <Link className={linkStyle} to="/"><div className={isMobile ? styleSheets.menuButtonM : styleSheets.menuButton}>Главная</div></Link>
            {isMobile || document.documentElement.clientWidth < 1150 ?
                <Link className={linkStyle} to="/vacancies"><div className={isMobile ? styleSheets.menuButtonM : styleSheets.menuButton}>Открытые вакансии</div></Link> :
                <div></div>}
            {isMobile || document.documentElement.clientWidth < 1150 ?
                <Link className={linkStyle} to="/jobs"><div className={isMobile ? styleSheets.menuButtonM : styleSheets.menuButton}>Профессии</div></Link> :
                <div></div>}
            <Link className={linkStyle} to="/" onClick={toggleModalReg}><div className={isMobile ? styleSheets.menuButtonM : styleSheets.menuButton}>Добавить профессию</div></Link>
            <Link className={linkStyle} onClick={toggleModalLogin} to="/"><div className={isMobile ? styleSheets.menuButtonM : styleSheets.menuButton}>Войти</div></Link>
            <Link className={disappearLink.join(' ')} to="/" onClick={toggleModalReg}><div className={isMobile ? styleSheets.menuButtonM : styleSheets.menuButton}>Регистрация</div></Link>
            <Link className={linkStyle} to="/about"><div className={isMobile ? styleSheets.menuButtonM : styleSheets.menuButton}>О сайте</div></Link>
        </div>
    );
};

export default Menu;
