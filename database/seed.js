const faker = require('faker')
const connection = require('./connection')
const {Types} = require('mongoose')
const {User, TravelLog, Comment} = require('./schema')

const users = new Array(50).fill().map(()=> ({
    _id: Types.ObjectId(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    password_digest: faker.random.word()
}))

const comments = new Array(100).fill().map(()-> ({
    _id: Types.ObjectId(),
    comment: faker.lorem.sentences(),
    user_id: users[Math.floor(Math.random()* users.length)]._id
}))

const posts = new Array(75).fill.map(() => ({
    _id: Types.ObjectId(),
    title: faker.random.words(),
    image_url: faker.random.image(),
    popularity_rating: faker.random.number(),
    description: faker.lorem.paragraph(),
    location: faker.address.city(),
    comments: comments
        .slice(
            Math.floor(Math.random()*comments.length),
            Math.floor(Math.random()*comments.length)
        )
        .map((comment)=>comment._id),
        user_id: users[Math.floor(Math.random()*users.length)]._id
}))

const seed = async () => {
    await connection.connect
    await User.insertMany(users)
    await TravelLog.insertMany(posts)
    await Comment.insertMany(comments)
    await connection.disconnect 
    process.exit()
}

seed()