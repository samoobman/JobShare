const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    name: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING}
})

const Job = sequelize.define('job', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userName: {type: DataTypes.STRING},
    city: {type: DataTypes.STRING},
    jobTitle: {type: DataTypes.STRING},
    ySalary: {type: DataTypes.STRING},
    timeSpendingPerY: {type: DataTypes.STRING},
    sleepInY: {type: DataTypes.STRING},
    freeTime: {type: DataTypes.STRING},
})

User.hasMany(Job)
Job.belongsTo(User)

module.exports = {
    User, Job
}