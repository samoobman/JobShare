import React, {useEffect, useState} from 'react';
import MyInput from "../UI/MyInput/MyInput";
import styleSheet from "./Forms.module.css"
import MyButton from "../UI/MyButton/MyButton";
import {useContextState} from "../../state-provider/allStateProvider";
import {useHttp} from "../../hooks/http.hook";
import { useNavigate } from "react-router-dom";
import {myConfig} from "../../config.js";


const FormLogin = () => {

    const navigate = useNavigate()
    const [form, setForm] = useState({email: '', password: ''})
    const {loading, request, error, clearError} = useHttp()
    const {toggleModalLogin, login, alertHandler, toggleModalReg} = useContextState()

    const changeHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const logRegHandler = () => {
        toggleModalLogin()
        toggleModalReg()
    }

    const loginHandler = async () => {
        try {
            const dataLogin = await request(`http://${myConfig.MY_URL}/api/auth/login`, 'POST', {...form})
            login(dataLogin.token, dataLogin.userId, dataLogin.name)
            toggleModalLogin()
            navigate("/")
            setForm({email: '', password: ''})
            alertHandler('Вы вошли')
        } catch (e) {}
    }

    useEffect(() => {
        alertHandler(error)
        clearError()
    }, [error, clearError])

    return (
        <form className={styleSheet.MyForm} onSubmit={e => e.preventDefault()}  onClick={e => e.stopPropagation()}>
            <div className={styleSheet.inputWrapper}>
                <MyInput value={form.email} onChange={changeHandler} name='email' type="email" currentname="Введите email"/>
                <MyInput value={form.password} onChange={changeHandler} name='password' type="password" currentname="Введите пароль"/>
            </div>
            <MyButton disabled={loading} onClick={loginHandler}>Войти</MyButton>
            <MyButton disabled={loading} onClick={toggleModalLogin}>Отменить</MyButton>
            <div className={styleSheet.t}>Ещё не зарегистрированы? <MyButton disabled={loading} onClick={logRegHandler}>Регистрация</MyButton></div>
        </form>
    );
};

export default FormLogin;