const {model, Schema} = require('mongoose')
const userSchema = new Schema({
    username: String, //brandName
    password: String,
    email: String,
    bio: String, //description
    pfp:String,
    brandLink: String,
    createdAt: String,
})

module.exports = model('User', userSchema)