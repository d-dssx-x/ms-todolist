process.env.NODE_CONFIG_DIR = './server/config'
const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const app = express()

app.use(express.json())

const PORT = config.get('port')
const MONGO_URI = config.get('mongoUri')

app.use('/api/auth', require('./routes/auth.routes'))

async function start() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    })

    app.listen(PORT, (e) => {
      return e ? console.log(e) : console.log(`Server start work on ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
