const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)
const routes = express.Router()
const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')
const UserController = require('./app/controlleres/UserController')
const SessionController = require('./app/controlleres/SessionController')
const DashboardController = require('./app/controlleres/DashboardController')
const FileController = require('./app/controlleres/FileController')

routes.use((req, res, next) => {
    res.locals.flashSuccess = req.flash('success')
    res.locals.flashError = req.flash('error')
    next()
})

routes.get('/files/:file', FileController.show)


routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', guestMiddleware, SessionController.store)

routes.get('/signup', UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

routes.use('/app', authMiddleware)

routes.use('/app/logout', SessionController.destroy)

routes.get('/app/dashboard', DashboardController.index)
module.exports = routes
