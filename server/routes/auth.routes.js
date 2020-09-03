const {Router} = require('express')
const User = require('../models/User.model')
const bcrypt = require('bcrypt')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

const router = new Router()

const JWTS = config.get('jwt')

router.post('/reg',
    [
      check('email', 'Bad data!').isEmail(),
      check('password', 'Bad data!').isLength({
        min: 6,
      }),
    ],
    async (req, res) => {
      try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res.status(400).json({
            message: 'Bad data!',
          })
        }
        const {email, password} = req.body
        const candidate = await User.findOne({email})
        if (candidate) {
          return res.status(400).json({message: 'This user already exists'})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({
          email,
          password: hashedPassword,
        })
        await user.save()
        return res.status(201).json({message: 'User created'})
      } catch (e) {
        return res.status(500).json({message: 'Error:('})
      }
    })

router.post('/log',
    [
      check('email', 'Bad data').normalizeEmail().isEmail(),
      check('password', 'Bad data').exists(),
    ],
    async (req, res) => {
      try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res.status(400).json({
            message: 'Bad data!',
          })
        }
        const {email, password} = req.body
        const user = await User.findOne({email})
        if (!user) {
          return res.status(400).json({message: 'This user not exists'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
          return res.status(400)
              .json({message: 'User are not exist or password is not correct!'})
        }
        const token = jwt.sign(
            {userId: user.id},
            JWTS,
            {expiresIn: '1y'},
        )
        return res.status(200).json({token})
      } catch (e) {
        return res.status(500).json({message: 'Error:('})
      }
    })

module.exports = router
