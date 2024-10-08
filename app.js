const createError = require('http-errors')
const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger-output.json')

const responseService = require('./app/middlewares/response-mid')

const authRouter = require('./routes/auth-router')
const usersRouter = require('./routes/user-router')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(responseService)
app.use(cors())

app.use('/v1/auth', authRouter)
app.use('/v1/users', usersRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
