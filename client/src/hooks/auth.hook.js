import {useCallback, useEffect, useState} from "react";


export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [userName, setUserName] = useState(null)
    const [readyAuth, setReadyAuth] = useState(false)

    const login = useCallback((jwtToken, id, name) => {
        setToken(jwtToken)
        setUserId(id)
        setUserName(name)
        localStorage.setItem('name', JSON.stringify(name))
        localStorage.setItem('id', JSON.stringify(id))
        localStorage.setItem('t', JSON.stringify(jwtToken))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setUserName(null)
        localStorage.clear()
    }, [])

    useEffect(() => {
        const t = JSON.parse(localStorage.getItem('t'))
        const id = JSON.parse(localStorage.getItem('id'))
        const n = JSON.parse(localStorage.getItem('name'))

        if(t && id) {
            login(t, id, n)
        }
        setReadyAuth(true)
    }, []);

    return {login, logout, token, userId, readyAuth, userName}
}