const routes = require('express').Router()

const UserController = require('../controllers/user')
const AppController = require('../controllers/app')

routes.post('/newuser', UserController.addUser)
routes.get('/users', UserController.getUsers)
routes.get('/user/:uid', UserController.getUser)

routes.get('/apps', AppController.getApps)
routes.post('/newapp', AppController.newApp)
routes.get('/app/:uid', AppController.getApp)

module.exports = routes