const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)
const routes = express.Router()

const UserController = require('./app/controlleres/UserController')
const SessionController = require('./app/controlleres/SessionController')

routes.get('/', SessionController.create)
routes.post('/signin', SessionController.store)

routes.get('/signup', UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)
routes.get('/app/dashboard', (req, res) => {
    res.render('dashboard')
})
module.exports = routes
