const {TravelLog, Comment} = require('../database/schema')

const CreateComment = async (request, response) =>{
    try{
        const comment = new Comment({ ...request.body, user_id: request.params.user_id})
        comment.save()
        await TravelLog.update(
            {_id: request.params.post_id},
            {
                $push: {
                    comments: comment
                }
            }
        )
        response.send(comment)
    }catch(error){throw error}
}
const  RemoveComment= async (request, response) =>{
    try{

    }catch(error){throw error}
}
const  UpdateComment= async (request, response) =>{
    try{

    }catch(error){throw error}
}

module.exports = {
    CreateComment,
    RemoveComment,
    UpdateComment
}