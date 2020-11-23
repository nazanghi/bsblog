
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
        await Comment.deleteOne({ _id: request.params.comment_id})
        const updatedPost = await TravelLog.findByIdAndUpdate(
            request.params.post_id,
            { $pull: {comments: { _id: request.params.comment_id }}},
            { upsert: true, new: true}
        )
        response.send(updatedPost)
    }catch(error){throw error}
}
const  UpdateComment= async (request, response) =>{
    try{
        await Comment.findByIdAndUpdate(
            request.params.comment_id,
            {...request.body},
            {upsert: true, new: true},
            (error, d) => (error ? error : response.send(d))
            )
        }catch(error){throw error}
}

module.exports = {
    CreateComment,
    RemoveComment,
    UpdateComment
}