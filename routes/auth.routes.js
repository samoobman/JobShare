const {Router} = require('express')
const bcrypt = require('bcrypt')
const {User} = require('../models/models')
const {check, validationResult} = require('express-validator')
const jwToken = require('jsonwebtoken')
const config = require('config')


const authRouter = Router()

authRouter.post(
    '/reg',
    [
        check('name', 'Введите имя').exists(),
        check('email', 'Введите корректный email').isEmail(),
        check('password', 'Пароль должен быть не менее 4 символов').isLength({min: 4})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные'
                })
            }

            const {name, email, password} = req.body
            const user = await User.findOne({where: {email}})

            if (user) {
                return res.json({message: 'Email уже занят'})
            }

            const passwordHash = await bcrypt.hash(password, 12)
            const userCreate = await User.create({name, email, password: passwordHash})
            return res.json({message: 'Вы зарегестрированы'})

        } catch (e) {
            res.status(500).json({message: 'Всё пропало'})
        }
    })

authRouter.post(
    '/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные'
                })
            }

            const {password, email} = req.body
            const user = await User.findOne({where: {email}})

            if (user) {
                const passwordMatching = await bcrypt.compare(password, user.password)

                if (!passwordMatching) {
                    return res.json({message: 'Введены некорректные данные при входе'})
                }

                const token = jwToken.sign(
                    {userId: user.id},
                    config.get('jwtSec'),
                    {expiresIn: '1y'}
                )

                return res.json({token, userId: user.id, name: user.name})
            }
        } catch (e) {
            res.status(500).json({message: 'Нет такого пользователя'})
        }
    })


module.exports = authRouter