const {Router} = require('express')
const tokenMiddle = require('../middleware/token.middleware')
const Task = require('../models/Task.model')
const moment = require('moment')


const router = new Router()

router.get('/', [tokenMiddle], async (req, res) => {
  try {
    const tasks = await Task.find({owner: req.user.userId})
    return res.status(200).json(tasks)
  } catch (e) {
    console.log(e)
    return res.status(500).json({message: 'Error:('})
  }
})
router.post('/add', [tokenMiddle], async (req, res) => {
  try {
    const task = new Task({
      created: moment().format('LLLL'),
      ...req.body,
      owner: req.user.userId,
    })
    await task.save()
    return res.status(201).json(task)
  } catch (e) {
    console.log(e)
    return res.status(500).json({message: 'Error:('})
  }
})
router.patch('/patch', [tokenMiddle], async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate({id: req.body.id}, {...req.body}, {
      new: true,
    })
    return res.status(200).json(task)
  } catch (e) {
    console.log(e)
    return res.status(500).json({message: 'Error:('})
  }
})
router.delete('/', [tokenMiddle], async (req, res) => {
  try {
    await Task.findOneAndDelete({id: req.body.id})
    const tasks = await Task.find({owner: req.user.userId})
    return res.status(200).json(tasks)
  } catch (e) {
    console.log(e)
    return res.status(500).json({message: 'Error:('})
  }
})

module.exports = router
