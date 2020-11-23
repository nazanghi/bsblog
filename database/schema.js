const {model} = require('mongoose')

const UserSchema = require('./models/User')
const TravelLogSchema = require('./models/TravelLog')
const CommentSchema = require('./models/Comments')

const User = model('users', UserSchema)
const Comment= model('comments', CommentSchema)
const TravelLog = model('travel_logs', TravelLogSchema)

module.exports = {
    User,
    Comment,
    TravelLog
}