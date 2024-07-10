const { ObjectId } = require('mongodb')
const {model, Schema} = require('mongoose')

const autoSchema = new Schema({
    counter: Number,
    post1: ObjectId, 
    post2: ObjectId,
    post3: ObjectId,
    post4: ObjectId
})

module.exports = model('Auto', autoSchema)