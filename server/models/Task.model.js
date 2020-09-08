const {Schema, model, Types} = require('mongoose')


const schema = new Schema({
  title: {type: String, default: 'Some task'},
  listId: {type: String},
  owner: {type: Types.ObjectId, ref: 'Users'},
  important: {type: Boolean, default: false},
  myday: {type: Boolean, default: false},
  due: {type: String, default: ''},
  created: {type: String},
  done: {type: Boolean, default: false},
  id: {type: String, default: Types.ObjectId},
  note: {type: String, default: ''},
  remind: {type: String, default: ''},
})

module.exports = model('Tasks', schema)
