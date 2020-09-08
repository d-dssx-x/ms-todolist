const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  title: {type: String, default: 'Custom list'},
  type: {type: String, default: 'custom'},
  owner: {type: Types.ObjectId, ref: 'Users'},
  id: {type: String, default: Types.ObjectId},
})

module.exports = model('Lists', schema)
