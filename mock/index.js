const express = require('express')

const userRouter = require('./user')

module.exports = function (app) {
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())
    app.use('/dev-api', userRouter)
}
