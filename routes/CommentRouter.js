const Router = require('express').Router()
const CommentController = require('../controllers/CommentController')

Router.post(
    '/:post_id/user/:user_id', 
    CommentController.CreateComment
)