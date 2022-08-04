import React, {useState} from 'react';
import styleSheet from "./Header.module.css"
import MyButton from "../../../UI/MyButton/MyButton";
import {useContextState} from "../../../../state-provider/allStateProvider"
import ModalMenu from "../../Modal/ModalMenu/ModalMenu";
import Menu from "../../Modal/ModalMenu/Menu/Menu";
import {useNavigate} from "react-router-dom";
import searchImg from "../../../../img/search.png";
import menuImg from "../../../../img/menu.png";
import {isMobile} from 'react-device-detect';

const Header = () => {

    const {
        modalState,
        toggleModalMenu,
        isAuth,
        toggleModalLogin,
        searchHandler,
        toggleModalMenuOff
    } = useContextState()
    const navigate = useNavigate()
    const [inputSearchState, setInputSearchState] = useState('')

    const changeHandler = (e) => {
        setInputSearchState(e.target.value)
    }

    const searchB = () => {
        searchHandler(inputSearchState)
        setInputSearchState('')
    }

    const searchE = (e) => {
        if (e.key === 'Enter') {
            searchHandler(inputSearchState)
            setInputSearchState('')
        }
    }

    if (isAuth) {
        return (
            <div>
                <header className={isMobile ? styleSheet.HeaderM : styleSheet.Header}>
                    <div onClick={() => toggleModalMenu()}
                         className={isMobile ? styleSheet.menuButtonM : styleSheet.menuButton}><img src={menuImg}/>
                    </div>
                    <div onClick={() => navigate("/")}
                         className={isMobile ? styleSheet.siteLogoM : styleSheet.siteLogo}><h1>JobShare</h1></div>
                    {
                        isMobile || document.documentElement.clientWidth < 1150 ? <div></div> :
                            <div className={styleSheet.authButtons}>
                                <div className={styleSheet.searchContainer}>
                                    <input value={inputSearchState} onChange={changeHandler} onKeyPress={searchE}
                                           placeholder={'Поиск профессий'} className={styleSheet.search}/>
                                    <input onClick={searchB} type={"image"} src={searchImg}
                                           className={styleSheet.btnSearch}/>
                                </div>
                                <div><MyButton onClick={() => {
                                    navigate("/myAccount")
                                }}>Аккаунт</MyButton></div>
                            </div>
                    }
                </header>
                {isMobile || document.documentElement.clientWidth < 1150 ? <div className={styleSheet.searchContainer}>
                    <input value={inputSearchState} onChange={changeHandler} onKeyPress={searchE}
                           placeholder={'Поиск профессий'} className={styleSheet.searchM}/>
                    <input onClick={searchB} type={"image"} src={searchImg} className={styleSheet.btnSearchM}/>
                </div> : <div></div>}
                <ModalMenu visible={modalState.menu}>
                    <Menu/>
                </ModalMenu>
            </div>
        );
    }

    return (
        <div>
            <header className={isMobile ? styleSheet.HeaderM : styleSheet.Header}>
                <div onClick={() => toggleModalMenu()} className={isMobile ? styleSheet.menuButtonM : styleSheet.menuButton}>
                    <img src={menuImg}/>
                </div>
                <div onClick={() => navigate("/")} className={isMobile ? styleSheet.siteLogoM : styleSheet.siteLogo}>
                    <h1>JobShare</h1></div>
                {
                    isMobile || document.documentElement.clientWidth < 1150 ? <div></div> :
                        <div className={styleSheet.authButtons}>
                            <div className={styleSheet.searchContainer}>
                                <input value={inputSearchState} onChange={changeHandler} onKeyPress={searchE}
                                       placeholder={'Поиск профессий'} className={styleSheet.search}/>
                                <input onClick={searchB} type={"image"} src={searchImg}
                                       className={styleSheet.btnSearch}/>
                            </div>
                            <div>
                                <MyButton onClick={toggleModalLogin}>Войти</MyButton>
                            </div>
                        </div>
                }
            </header>
            {isMobile || document.documentElement.clientWidth < 1150 ?
                <div className={styleSheet.searchContainer}>
                    <input value={inputSearchState} onChange={changeHandler} onKeyPress={searchE}
                           placeholder={'Поиск профессий'} className={styleSheet.searchM}/>
                    <input onClick={searchB} type={"image"} src={searchImg} className={styleSheet.btnSearchM}/>
                </div> : <div></div>}
            <ModalMenu visible={modalState.menu}>
                <Menu/>
            </ModalMenu>
        </div>
    );
}

export default Header;
