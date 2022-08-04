import React, {useEffect, useState} from 'react';
import MyInput from "../UI/MyInput/MyInput";
import styleSheet from "./Forms.module.css"
import MyButton from "../UI/MyButton/MyButton";
import {useContextState} from "../../state-provider/allStateProvider";
import {useHttp} from "../../hooks/http.hook";
import { useNavigate } from "react-router-dom";
import {myConfig} from "../../config.js";


const FormReg = () => {

    const [form, setForm] = useState({name: '', email: '', password: '', passwordS: ''})
    const email = form.email
    const password = form.password
    const {loading, request, error, clearError} = useHttp()
    const {toggleModalReg, alertHandler, login, toggleModalLogin} = useContextState()
    const navigate = useNavigate()

    const changeHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const logRegHandler = () => {
        toggleModalReg()
        toggleModalLogin()
    }

    const regHandler = async (e) => {

        if (form.password !== form.passwordS) {
            return alertHandler('Пароли не совпадают')
        }

        try {
            const dataReg = await request(`http://${myConfig.MY_URL}/api/auth/reg`, 'POST', {...form})
            const dataLogin = await request(`http://${myConfig.MY_URL}/api/auth/login`, 'POST', {email, password})
            login(dataLogin.token, dataLogin.userId, dataLogin.name)
            toggleModalReg()
            navigate("/myAccount")
            alertHandler('Вы зарегестрированы')
            setForm({
                name: '',
                email: '',
                password: '',
                passwordS: ''
            })
        } catch (e) {}
    }

    useEffect(() => {
        alertHandler(error)
        clearError()
    }, [error, clearError])

    return (
        <form className={styleSheet.MyForm} onSubmit={e => e.preventDefault()}  onClick={e => e.stopPropagation()}>
            <div className={styleSheet.inputWrapper}>
                <MyInput value={form.name} onChange={changeHandler} name='name' type="text" currentname="Введите никнейм"/>
                <MyInput value={form.email} onChange={changeHandler} name='email' type="email" currentname="Введите email"/>
                <MyInput value={form.password} onChange={changeHandler} name='password' type="password" currentname="Введите пароль"/>
                <MyInput value={form.passwordS} onChange={changeHandler} name='passwordS' type="password" currentname="Повторите пароль"/>
            </div>
            <MyButton disabled={loading} onClick={regHandler}>Зарегистрироваться</MyButton>
            <MyButton disabled={loading} onClick={toggleModalReg}>Отменить</MyButton>
            <div className={styleSheet.t}>Уже зарегистрированы? <MyButton disabled={loading} onClick={logRegHandler}>Войти</MyButton></div>
        </form>
    );
};

export default FormReg;