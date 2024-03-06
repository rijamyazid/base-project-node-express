require('dotenv').config()

const bcrypt = require('bcrypt')

exports.formatPassword = function (password) {
  return bcrypt.hashSync(password, Number(process.env.BCRYPTENCSALTLENGTH))
}

exports.isPasswordValid = function (password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword)
}