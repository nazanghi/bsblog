const {Schema} = require('mongoose')

module.exports = new Schema(
    {
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: TextTrackCueList,
            unique: true,
            index: true
        },
        password_digest:{
            Type: String,
            required: true
        }
    },
    {timestamps: true}
)