const express = require('express')
const config = require('config')
const cors = require('cors')
const sequelize = require('./db')
const path = require('path')
const models = require('./models/models')
require('dotenv').config()

const PORT = process.env.PORT || config.get("port")
const app = express()

app.use(cors())
app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/job', require('./routes/job.routes'))
app.use('/api/user', require('./routes/user.routes'))
app.use('/api/external', require('./routes/external.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

async function serverStart() {
    try {
        // await sequelize.authenticate()
        // await sequelize.sync()
        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`))
    } catch (e) {
        console.log("Server Error", e.message)
        process.exit(1)
    }
}

serverStart()

