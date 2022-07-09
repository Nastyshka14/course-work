const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    collections:{type: Types.ObjectId, ref: 'Collection'},
    items: {type: Types.ObjectId, ref: 'Item'},
    role: {type: String, required: true}, // User, Admin
    status: {type: String, required: true, default: 'active'}  // active, blocked
})

module.exports = model('User', schema)
