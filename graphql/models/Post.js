const {model, Schema} = require('mongoose')
const { ObjectId, Decimal128 } = require('mongodb')
const postSchema = new Schema({
    username: String, //brandName
    title: String,
    caption: String, //description
    price: Schema.Types.Number,
    image: String,
    productLink: String,
    createdAt: String,
    
    sex: {
        type: String,
        enum: ['male', 'female', 'unisex'] // Enum for sex
    },
    category: {
        type: String,
        enum: [ 'tshirt', 'sweatshirt', 'shorts', 'pants', 'hat', 'other'] // Enum for type
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = model('Post', postSchema)