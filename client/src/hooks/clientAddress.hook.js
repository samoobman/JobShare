import {useCallback, useEffect, useState} from "react";


export const useAddress = () => {

    const [city, setCity] = useState(null)
    const [country, setCountry] = useState(null)

    const setCityFn = useCallback((cityVar, countryVar) => {
        setCity(cityVar)
        setCountry(countryVar)

        localStorage.setItem('city', JSON.stringify(cityVar))
        localStorage.setItem('country', JSON.stringify(countryVar))
    }, [])

    useEffect(() => {
        const ci = JSON.parse(localStorage.getItem('city'))
        const co = JSON.parse(localStorage.getItem('country'))

        if(ci && co) {
            setCityFn(ci, co)
        }


    }, []);

    return {setCityFn, city, country}
}