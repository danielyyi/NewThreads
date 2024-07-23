const {model, Schema} = require('mongoose')
const tagSchema = new Schema({
    name: String, 
    color: String
})

module.exports = model('Tag', tagSchema)