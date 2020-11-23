const { User, TravelLog} = require('../database/schema')
const jwt = require('jsonwebtoken')
const {
    checkPassword,
    generatePassword
} = require('../middleware/PasswordHandler')

const GetProfile = async (request, response) => {
    try {
        const user = await User.findById(request.params.user_id).select('_id name')
        const posts = await TravelLog.find({ user_id: request.params.user_id})
        response.send({ user, posts})
    } catch(error) {throw error}
}

const CreateUser = async (request, response) => {
    try{
        const body = request.body
        const password_digest = await generatePassword(body.password)
        const user = new User({
            name: body.name,
            email: body.email,
            password_digest
        })
        user.save()
        response.send(user)
    }catch(error){throw error}
}

const SignInUser = async (request, response, next) => {
    try{
        const user = await User.findOne({email: request.body.email })
        if (
            user&&
            (await checkPassword(request.body.password, user.password.digest))
        ) {
            const payload = {
                _id: user._id,
                name: user.name
            }
            response.locals.payload = payload
            return next()
        }
        response.status(401).send({message: `Unauthorized`})

    } catch(error){throw error}
}

const RefreshSession = (request, response)=> {
    try { 
        const token = response.locals.token
        response.send({
            user: jwt.decode(token),
            token: response.locals.token
        })
    } catch(error) {throw error}
}

module.exports = {
    GetProfile,
    CreateUser,
    SignInUser,
    RefreshSession
}