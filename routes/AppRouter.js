const Router = require('express').Router()

const UserRouter = require('./UserRouter')
const CommentRouter = require('./CommentRouter')
const TravelLogRouter = require('./TravelLogRouter')

Router.use('/users', UserRouter)
Router.use('/posts', TravelLogRouter)
Router.use('/comments', CommentRouter)

module.exports = Router