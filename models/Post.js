const {model, Schema} = require('mongoose')
const postSchema = new Schema({
    caption: String,
    image: String,
    color: String,
    username: String,
    createdAt: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String,
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = model('Post', postSchema)