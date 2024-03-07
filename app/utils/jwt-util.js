require('dotenv').config()

const jwt = require('jsonwebtoken')

exports.generateAccessToken = function (tokenBody) {
  return jwt.sign(tokenBody, process.env.JWT_TOKEN_SECRET, { expiresIn: '2d' })
}
