const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  title: {type: String, default: 'Custom list'},
  type: {type: String, default: 'custom'},
  id: {type: String, required: true, unique: true},
  owner: {type: Types.ObjectId, ref: 'User'},
})

module.exports = model('Lists', schema)
