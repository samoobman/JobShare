import React, {useState, useContext} from "react";
import {useAuth} from "../hooks/auth.hook";
import {useHttp} from "../hooks/http.hook";
import {useNavigate} from 'react-router-dom';
import {useAddress} from "../hooks/clientAddress.hook";
import {myConfig} from "../config.js";


const MyContext = React.createContext()

export const useContextState = () => {
    return useContext(MyContext)
}

export function ContextProvider({children}) {

    const {request} = useHttp()
    const navigate = useNavigate()

    //UserCity//////////////////////////////////////////////////////////////////////////////////////////////////////////
    const {setCityFn, city, country} = useAddress()


    //Search////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const [searchData, setSearchData] = useState([])

    const searchHandler = async (t) => {
        let data
        try {
            data = await request(
                `http://${myConfig.MY_URL}/api/job/searchJob`,
                'post',
                {job: t}
            )
            if (data.length === 0 && t[0] === t[0].toUpperCase()) {
                const arr = t.split('')
                arr[0] = arr[0].toLowerCase()
                data = await request(
                    `http://${myConfig.MY_URL}/api/job/searchJob`,
                    'post',
                    {job: arr.join('')}
                )
            } else if (data.length === 0 && t[0] === t[0].toLowerCase()) {
                const arr = t.split('')
                arr[0] = arr[0].toUpperCase()
                data = await request(
                    `http://${myConfig.MY_URL}/api/job/searchJob`,
                    'post',
                    {job: arr.join('')}
                )
            }
            setSearchData([...data])
            navigate('/search')
        } catch (e) {
        }
    }


    //auth//////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const {token, userId, login, logout, readyAuth, userName} = useAuth()
    const isAuth = !!token

    const logoutHandler = () => {
        logout()
        navigate('/')
    }

    //User nav//////////////////////////////////////////////////////////////////////////////////////////////////////////

    const getSomeUserPage = (id) => {
        if (isAuth) {
           return navigate(`/someAccount/${id}`)
        }
        return alertHandler('Авторизуйтесь')
    }

    //Jobs Req//////////////////////////////////////////////////////////////////////////////////////////////////////////
    const [allJobs, setAllJobs] = useState([])
    const [userPosts, setUserPosts] = useState([])

    const getUserPosts = async () => {
        try {
            const posts = await request(
                `http://${myConfig.MY_URL}/api/user/getUserPosts`,
                'post',
                {id: userId},
                {Authorization: `Bearer ${token}`}
            )
            setUserPosts([...posts])
        } catch (e) {
            alertHandler(e.message)
        }
    }

    const getJobs = async (page = 0) => {
        try {
            const data = await request(`http://${myConfig.MY_URL}/api/job/getalljobs`, 'POST', {pageNum: page})
            if (page === 0) {
               return setAllJobs([...data])
            }
            setAllJobs(prev => [...prev, ...data])
        } catch (e) {
            alertHandler(e.message)
        }
    }

    const deletePost = async (postID) => {
        try {
            await request(`http://${myConfig.MY_URL}/api/job/deleteJobs`, 'POST', {id: postID},
                {Authorization: `Bearer ${token}`})
            await getUserPosts()
            await getJobs()
            alertHandler('Удалено')
        } catch (e) {
            alertHandler(e.message)
        }
    }

    //modal state///////////////////////////////////////////////////////////////////////////////////////////////////////
    const [modalState, setModalState] = useState({
        menu: false,
        formReg: false,
        formJob: false,
        formLogin: false
    })

    const toggleModalMenu = () => {
        setModalState(prevState => {
            return {
                ...prevState,
                menu: !prevState.menu
            }
        })
    }

    const toggleModalMenuOff = () => {
        setModalState(prevState => {
            return {
                ...prevState,
                menu: false
            }
        })
    }

    const toggleModalReg = () => {
        setModalState(prevState => {
            return {
                ...prevState,
                formReg: !prevState.formReg
            }
        })
    }

    const toggleModalJob = () => {
        setModalState(prevState => {
            return {
                ...prevState,
                formJob: !prevState.formJob
            }
        })
    }

    const toggleModalLogin = () => {
        setModalState(prevState => {
            return {
                ...prevState,
                formLogin: !prevState.formLogin
            }
        })
    }

    //alert pop up logic////////////////////////////////////////////////////////////////////////////////////////////////
    const [alertChildState, setAlertChild] = useState([])

    const alertHandler = (alert) => {
        if (!alert) {
            return
        }
        setAlertChild(prev => prev.concat(alert))
        setTimeout(alertKiller, 5000)
    }

    const alertKiller = () => {
        setAlertChild(prev => prev.slice(1))
    }

    return (
        <MyContext.Provider value={
            {
                setCityFn, city, country,
                searchHandler, searchData,
                getUserPosts, userPosts, deletePost, getSomeUserPage,
                userName,
                readyAuth,
                token,isAuth, login, logoutHandler,
                allJobs, setAllJobs, getJobs, userId,
                alertChildState, alertHandler,
                modalState, toggleModalLogin, toggleModalJob, toggleModalReg, toggleModalMenu, toggleModalMenuOff,
            }
        }>
            {children}
        </MyContext.Provider>
    );
}
