const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const rateLimit = require('express-rate-limit')

const { userRouter, contactRouter } = require('./api')

const { errorHandler } = require('./middleware')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
app.use(logger(formatsLogger))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  handler: (req, res, next) => {
    return res.status(429).json({
      status: 'error',
      code: 429,
      message: 'Too many Requests'
    })
  }
})
app.use('/api', limiter)

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  preflightContinue: false,
  optionsSuccessStatus: 204
}))

app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/contacts', contactRouter)

app.use((req, res) => {
  res.status(404).json({ message: '🚫 Not found' })
})

app.use(errorHandler)

module.exports = app
