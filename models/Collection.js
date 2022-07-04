const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
name: {type: String, required: true},
description: {type: String, required: true},
theme: {type: String},
image:{type: String},
date:{type: Date, default: new Date()},
owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Collection', schema)