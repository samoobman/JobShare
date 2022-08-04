const {Router} = require('express')
const auth = require('../middleware/auth.middleware')
const {User} = require('../models/models')
const {Job} = require('../models/models')

const userRouter = Router()

userRouter.post(
    '/getUserName',
    async (req, res) => {
        try {
            const {id} = req.body
            const user = await User.findOne({where: {id}})
            return res.status(200).json(user.name)
        } catch (e) {
            res.status(500).json({message: 'Имя пользователя не найдено'})
        }
    })

userRouter.post(
    '/getUserPosts',
    auth,
    async (req, res) => {
        try {
            const {id} = req.body
            const posts = await Job.findAll({where: {userId: id}})
            return res.json(Object.values(posts))
        } catch (e) {
            res.status(500).json({message: 'Постов юзера не найдено'})
        }
    })

module.exports = userRouter