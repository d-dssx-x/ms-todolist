const {Schema, model, Types} = require('mongoose')


const schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  tasks: [{type: Types.ObjectId, ref: 'Tasks'}],
  lists: [{type: Types.ObjectId, ref: 'Lists'}],
})

module.exports = model('Users', schema)
