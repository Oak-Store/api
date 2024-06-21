const routes = require('express').Router()

const UserController = require('../controllers/user')
const ProjectController = require('../controllers/project')

routes.post('/newuser', UserController.addUser)
routes.get('/users', UserController.getUsers)
routes.get('/user/:uid', UserController.getUser)

routes.get('/projects', ProjectController.getProjects)
routes.post('/newproject', ProjectController.newProject)
routes.get('/project/:uid', ProjectController.getProject)

module.exports = routes