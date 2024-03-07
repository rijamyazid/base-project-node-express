require('dotenv').config()

const jwt = require('jsonwebtoken')
const catchAsync = require('../services/catch-function-error-service')
const HTTPStatusCode = require('../enums/http-status-code-enum')

module.exports = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.ReturnError(HTTPStatusCode.Unauthorized, 'There is no authorization header')
  }

  const authKey = authHeader.split(' ')[0]
  const authValue = authHeader.split(' ')[1]

  if (!authKey || !authValue || authKey !== 'Bearer') {
    return res.ReturnError(HTTPStatusCode.Unauthorized, 'Authorization header is not valid')
  }

  try {
    const decodedToken = jwt.verify(authValue, process.env.JWT_TOKEN_SECRET)

    req.userSession = decodedToken
    next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.ReturnError(HTTPStatusCode.Unauthorized, 'Token has expired')
    } else if (err.name === 'JsonWebTokenError') {
      return res.ReturnError(HTTPStatusCode.Unauthorized, 'Token is not valid')
    } else if (err.name === 'NotBeforeError') {
      return res.ReturnError(HTTPStatusCode.Unauthorized, 'Token is not active')
    } else {
      return res.ReturnError(HTTPStatusCode.Unauthorized, `Other jwt problem: ${res.message}`)
    }
  }
})
