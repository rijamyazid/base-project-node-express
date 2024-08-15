const jwtUtil = require('../utils/jwt-util')
const bcryptUtil = require('../utils/bcrypt-util')
const { Op } = require('sequelize')
const { User } = require('../../db/models')
const catchAsync = require('../services/catch-function-error-service')
const HTTPStatusCode = require('../enums/http-status-code-enum')

exports.login = catchAsync(async (req, res) => {
  /*
    #swagger.tags = ['Auth']
    #swagger.description = 'Endpoint to login and get token'
    #swagger.parameters['body'] = {
      in: 'body',
      schema : {
        username : 'string',
        password : 'string'
      }
    }
    #swagger.responses[200] = {
      schema : {
        status : true,
        messages : ['string'],
        data : {
          token: 'string',
          payload: {
            username: 'string'
          }
        }
      }
    }
  */
  const { username: reqUsername, password: reqPassword } = req.body //eslint-disable-line

  const user = await User.findOne({
    where: {
      [Op.and]: {
        username: reqUsername
      }
    }
  })

  if (user) {
    if (!bcryptUtil.isPasswordValid(reqPassword, user.password)) {
      return res.ReturnError(HTTPStatusCode.NotFound, 'User not found, check your username or password')
    }
  } else {
    return res.ReturnError(HTTPStatusCode.NotFound, 'User not found, check your username or password')
  }

  const _payload = {
    username: reqUsername
  }

  const _token = jwtUtil.generateAccessToken(_payload)

  return res.ReturnOk({
    token: _token,
    payload: _payload
  })
  
  //Test
})
