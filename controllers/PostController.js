const { post } = require('../database/models/User')
const {TravelLog, User, Comment} = require('../database/schema')

const GetPosts = async (request, response) => {
    try {
        const {page, limit } = request.query
        const offset =
        page ==='1' 
        ? 0
        : Math.floor(parseInt(page)* parseInt(limit))
        const posts = await TravelLog.find()
            .limit(parseInt(limit))
            .skip(offset)
            .sort({popularity_rating: 'desc'})
        response.send(posts)
    } catch (error) {throw error}
}

const GetPostById = async (request, response) => {
    try{
        const post = await (await TravelLog.findById(request.params.post_id)).populated([
            {model: 'users',
            select: '_id name',
            path: 'user_id',
            },
            {path: 'comments',
            populate: {
                model: 'users',
                path: 'user_id',
                select: '_id name'
            }}
        ])
        response.send(post)
    }
     catch(error) {throw error}
}

const CreatePost = async (request, response) => {
    try {
        const newPost = new TravelLog({
            ...request.body, user_id: request.params.user_id
        })
        newPost.save()
        response.send(newPost)
    }catch(error){throw error}
}

const DeletePost = async (request, response) => {
    try {
        await Comment.deleteMany({_id: {$in: post.comments}})
        await TravelLog.findByIdAndDelete(request.params.post_id)
        response.send({message: 'Post Deleted'})
    } catch(error){throw error}
}

const UpdatePost = async (request, response) => {
    try {
        await TravelLog.findByIdAndUpdate(
            request.params.post_id,
            {
                ...request.body
            },
            { new: true,
            useFindAndModify: false },
            (error, (d) => (error ? error: response.send(d)))
        )
    } catch(error) {throw error}
}

module.exports = {
    GetPosts,
    GetPostById,
    CreatePost,
    DeletePost,
    UpdatePost
}