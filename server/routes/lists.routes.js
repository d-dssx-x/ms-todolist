const {Router} = require('express')
const List = require('../models/List.model')
const Task = require('../models/Task.model')
const tokenMiddle = require('../middleware/token.middleware')

const router = new Router()

router.get('/', [tokenMiddle], async (req, res) => {
  try {
    const lists = await List.find({owner: req.user.userId})
    return res.status(200).json(lists)
  } catch (e) {
    console.log(e)
    return res.status(500).json({message: 'Error:('})
  }
})
router.post('/', [tokenMiddle], async (req, res) => {
  try {
    const list = new List({
      title: req.body.title,
      owner: req.user.userId,
    })
    await list.save()
    return res.status(201).json(list)
  } catch (e) {
    console.log(e)
    return res.status(500).json({message: 'Error:('})
  }
})
router.patch('/', [tokenMiddle], async (req, res) => {
  try {
    const {id, title} = req.body
    await List.findOneAndUpdate({id}, {title})
    const lists = await List.find({owner: req.user.userId})
    return res.status(200).json(lists)
  } catch (e) {
    console.log(e)
    return res.status(500).json({message: 'Error:('})
  }
})
router.delete('/', [tokenMiddle], async (req, res) => {
  try {
    await List.findOneAndDelete({id: req.body.id})
    const lists = await List.find({owner: req.user.userId})
    await Task.deleteMany({listId: req.body.id})
    return res.status(200).json(lists)
  } catch (e) {
    console.log(e)
    return res.status(500).json({message: 'Error:('})
  }
})

module.exports = router
