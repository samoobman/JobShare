const {Router} = require('express')
const request = require('request')
const exRouter = Router()
const translate = require('translate-google')

exRouter.post(
    '/getCity',
    async (req, res) => {
        try {

            let ip = req.ip.split(":").pop()
            if (ip === '127.0.0.1') {
                ip = '94.140.142.124'
            }

            await request('https://api.snoopi.io/' + ip, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    res.json(JSON.parse(body))
                }
            })

        } catch (e) {
            res.status(500).json({message: 'Всё пропало, попробуйте снова'})
        }
    })

exRouter.post(
    '/getJobsHH',
    async (req, res) => {
        try {

            const countryName = await translate(req.body.country, {to: 'ru'})
            const cityName = await translate(req.body.city, {to: 'ru'})

            if (cityName === 'Москва') {
                await request({
                        headers: {
                            'User-Agent': 'JOBSHARE/1.0'
                        },
                        uri: 'https://api.hh.ru/vacancies?area=1&per_page=15'
                    },
                    function (response, body) {
                        const resBody = JSON.parse(body.body)
                        resBody.city = 'Москва'
                        resBody.id = '1'
                        res.json(resBody)
                    })
            } else if (cityName === 'Санкт-Петербург') {
                await request({
                        headers: {
                            'User-Agent': 'JOBSHARE/1.0'
                        },
                        uri: 'https://api.hh.ru/vacancies?area=2&per_page=15'
                    },
                    function (response, body) {
                        const resBody = JSON.parse(body.body)
                        resBody.city = 'Санкт-Петербург'
                        resBody.id = '2'
                        return res.json(resBody)
                    })
            } else {
                await request({
                        headers: {
                            'User-Agent': 'JOBSHARE/1.0'
                        },
                        uri: `https://api.hh.ru/areas/countries`
                    },
                    async function (response, body) {
                        let countryID = ''
                        if (!JSON.parse(body.body)[1].hasOwnProperty('name')) {
                            const resBody = {}
                            resBody.city = cityName
                            resBody.result = "Не удалось найти ваш город"
                            res.json(resBody)
                        } else {
                            await Object.values(JSON.parse(body.body)).find(e => e.name === countryName ? countryID = e.id : null)
                            await request({
                                    headers: {
                                        'User-Agent': 'JOBSHARE/1.0'
                                    },
                                    uri: `https://api.hh.ru/areas/${countryID}`
                                },
                                async function (response, body) {
                                    let cityID = ''
                                    await JSON.parse(body.body).areas.find(el => el.areas.find(
                                        (e) => {
                                            (e.name.split(' ').length === 3 ?
                                                e.name.split(' ')[1] :
                                                e.name.split(' ').length === 2 ?
                                                    e.name.split(' ')[0] :
                                                    e.name) === cityName ?
                                                cityID = e.id : null
                                        }))
                                    if (cityID === '') {
                                        await request({
                                                headers: {
                                                    'User-Agent': 'JOBSHARE/1.0'
                                                },
                                                uri: `https://api.hh.ru/vacancies?area=1&per_page=15`
                                            },
                                            function (response, body) {
                                                const resBody = JSON.parse(body.body)
                                                resBody.city = 'Москва'
                                                resBody.id = 1
                                                res.json(resBody)
                                            })
                                    } else {
                                        await request({
                                                headers: {
                                                    'User-Agent': 'JOBSHARE/1.0'
                                                },
                                                uri: `https://api.hh.ru/vacancies?area=${cityID}&per_page=15`
                                            },
                                            function (response, body) {
                                                const resBody = JSON.parse(body.body)
                                                resBody.city = cityName
                                                resBody.id = cityID
                                                res.json(resBody)
                                            })
                                    }
                                })
                        }
                    })
            }

        } catch (e) {
            res.status(500).json({message: "Всё пропало, попробуйте снова"})
        }
    })

exRouter.post(
    '/getJobsHHSearch',
    async (req, res) => {
        try {

            const cityName = req.body.city[0].toUpperCase() + req.body.city.slice(1)

            if (cityName === 'Москва') {

                await request({
                        headers: {
                            'User-Agent': 'JOBSHARE/1.0'
                        },
                        uri: `https://api.hh.ru/vacancies?area=1&per_page=15`
                    },
                    function (response, body) {
                        if (!JSON.parse(body.body).hasOwnProperty('items')) {
                            res.json(JSON.parse(body.body))
                        } else {
                            const resBody = JSON.parse(body.body)
                            resBody.city = cityName
                            resBody.id = '1'
                            res.json(resBody)
                        }
                    })
            } else if (cityName === 'Санкт-Петербург') {

                await request({
                        headers: {
                            'User-Agent': 'JOBSHARE/1.0'
                        },
                        uri: `https://api.hh.ru/vacancies?area=2&per_page=15`
                    },
                    function (response, body) {
                        if (!JSON.parse(body.body).hasOwnProperty('items')) {
                            res.json(JSON.parse(body.body))
                        } else {
                            const resBody = JSON.parse(body.body)
                            resBody.city = cityName
                            resBody.id = '2'
                            res.json(resBody)
                        }
                    })
            } else {

                await request({
                        headers: {
                            'User-Agent': 'JOBSHARE/1.0'
                        },
                        uri: `https://api.hh.ru/areas/113`
                    },
                    async function (response, body) {
                        let cityID = ''
                        if (!JSON.parse(body.body).hasOwnProperty('areas')) {
                            const resBody = {}
                            resBody.city = cityName
                            resBody.result = 'Не получилось найти'
                            res.json(resBody)
                        } else {
                            await JSON.parse(body.body).areas.find(el => el.areas.find(
                                (e) => {
                                    (e.name.split(' ')[0] === e.name.split(' ')[0].toLowerCase() && e.name.split(' ').length >= 2 ?
                                        e.name.split(' ')[1] :
                                        e.name.split(' ')[0]) === cityName ?
                                        cityID = e.id : null
                                }))
                            await request({
                                    headers: {
                                        'User-Agent': 'JOBSHARE/1.0'
                                    },
                                    uri: `https://api.hh.ru/vacancies?area=${cityID}&per_page=15`
                                },
                                function (response, body) {
                                    if (!JSON.parse(body.body).hasOwnProperty('items')) {
                                        res.json(JSON.parse(body.body))
                                    } else {
                                        const resBody = JSON.parse(body.body)
                                        resBody.city = cityName
                                        resBody.id = cityID
                                        res.json(resBody)
                                    }
                                })
                        }
                    })
            }

        } catch (e) {
            res.status(500).json({message: 'Всё пропало, попробуйте снова'})
        }
    })

exRouter.post(
    '/getJobsHHMore',
    async (req, res) => {
        try {
            const cityID = req.body.id
            const page = req.body.pageNum
            await request({
                    headers: {
                        'User-Agent': 'JOBSHARE/1.0'
                    },
                    uri: `https://api.hh.ru/vacancies?area=${cityID}&per_page=15&page=${page}`
                },
                async function (response, body) {
                    if (!JSON.parse(body.body).hasOwnProperty('items')) {
                        const resBody = JSON.parse(body.body)
                        resBody.result = 'Не получилось найти'
                        res.json(resBody)
                    } else {
                        const resBody = JSON.parse(body.body)
                        res.json(resBody)
                    }
                })

        } catch (e) {
            res.status(500).json({message: 'Всё пропало, попробуйте снова'})
        }
    })

exRouter.post(
    '/getJobsNews',
    async (req, res) => {
        try {
            const page = req.body.page
            await request(`https://iz.ru/api/0/tag/rabota?json={"include":{"materials":{"limit":20,"offset":${page}},"config":false}}`,
                function (response, body) {
                    res.json(JSON.parse(body.body))
            })

        } catch (e) {
            res.status(500).json({message: 'Всё пропало, попробуйте снова'})
        }
    })

module.exports = exRouter