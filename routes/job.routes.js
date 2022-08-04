const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const auth = require('../middleware/auth.middleware')
const {Job} = require('../models/models')


const jobRouter = Router()

jobRouter.post(
    '/jobpost',
    [
        check('jobTitle', 'Не введена вакансия').exists(),
        check('ySalary', 'Не удалось вычислить зарплату').exists(),
        check('timeSpendingPerY', 'Не удалось вычислить рабочее время').exists(),
        check('sleepInY', 'Не удалось вычислить время на сон').exists(),
        check('freeTime', 'Не удалось вычислить свободное время').exists(),
        check('city', 'Не удалось получить ваш город').exists(),
        check('user', 'Не удалось получить ваш никнейм').exists()
    ],
    auth,
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Данные некорректны'
                })
            }
            const {city, jobTitle, ySalary, timeSpendingPerY, sleepInY, freeTime, user} = req.body
            const job = await Job.create({
                jobTitle,
                ySalary,
                timeSpendingPerY,
                sleepInY,
                freeTime,
                city,
                userName: user,
                userId: req.userId.userId
            })
            return res.status(201).json({message: 'Опубликовано'})
        } catch (e) {
            res.status(500).json({message: 'Всё пропало, попробуйте снова'})
        }
    })

jobRouter.post(
    '/deleteJobs',
    auth,
    async (req, res) => {
        try {
            const deleteJob = await Job.findOne({where: {id: req.body.id}})
            if (deleteJob) {
                await deleteJob.destroy()
                return res.status(200).json({message: 'Удалено'})
            }
        } catch (e) {
            res.status(500).json({message: 'Не получилось'})
        }
    })

jobRouter.post(
    '/getalljobs',
    async (req, res) => {
        try {
            let page = req.body.pageNum
            if (page === 0) {
                page = 1
            }
            const limit = 25
            const offset = (limit * page - limit)
            const getJobs = await Job.findAndCountAll({limit, offset, order: [['id', 'DESC']]})
            return res.status(200).json(getJobs.rows)
        } catch (e) {
            res.status(500).json({message: 'Профессии не найдены'})
        }
    })

jobRouter.get(
    '/:id',
    async (req, res) => {
        try {
            const job = await Job.findOne({where: {id: req.params.id}})
            if (job) {
                return res.status(200).json(job)
            }
        } catch (e) {
          res.status(500).json({message: 'Не удалось получить'})
        }
    })

jobRouter.post(
    '/searchJob',
    async (req, res) => {
        try {
            const {job} = req.body
            const jobSearch = await Job.findAll({where: {jobTitle: job}, limit: 100})
            if (jobSearch) {
                return res.status(200).json(jobSearch)
            }
        } catch (e) {
            return res.status(500).json({message: 'Не удалось найти'})
        }
    })

module.exports = jobRouter