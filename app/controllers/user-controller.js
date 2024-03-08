const { Op } = require('sequelize')
const { User } = require('../../db/models')
const catchAsync = require('../services/catch-function-error-service')
const bcryptUtil = require('../utils/bcrypt-util')
const HTTPStatusCode = require('../enums/http-status-code-enum') //eslint-disable-line

exports.getUsers = catchAsync(async (req, res) => {
  /*
    #swagger.tags = ['Users']
    #swagger.description = 'Endpoint to get list of user'

    #swagger.responses[200] = {
      schema : {
        status : true,
        messages : ['string'],
        data : [
          {
            id: 'string',
            name: 'string',
            username: 'string',
            password: 'string',
            isActive: true,
            createdAt: '1990-01-01T01:01:01.000Z',
            updatedAt: '1990-01-01T01:01:01.000Z'
          }
        ]
      }
    }
  */
  const users = await User.findAll()

  return res.ReturnOk(users)
})

exports.getUserById = catchAsync(async (req, res) => {
  /*
    #swagger.tags = ['Users']
    #swagger.description = 'Endpoint to get user by id'

    #swagger.responses[200] = {
      schema : {
        status : true,
        messages : ['string'],
        data : [
          {
            id: 'string',
            name: 'string',
            username: 'string',
            password: 'string',
            isActive: true,
            createdAt: '1990-01-01T01:01:01.000Z',
            updatedAt: '1990-01-01T01:01:01.000Z'
          }
        ]
      }
    }
  */
  const reqId = req.params.id
  if (!reqId) {
    return res.ReturnError(HTTPStatusCode.BadRequest, 'There is no user id')
  }

  const user = await User.findAll({
    where: {
      [Op.and]: {
        id: reqId,
        isActive: true
      }
    }
  })

  return res.ReturnOk(user)
})

exports.addUser = catchAsync(async (req, res) => {
  /*
    #swagger.tags = ['Users']
    #swagger.description = 'Endpoint to create new user'
    #swagger.parameters['body'] = {
      in: 'body',
      schema : {
        name : 'string',
        username : 'string',
        password : 'string'
      }
    }
    #swagger.responses[200] = {
      schema : {
        status : true,
        messages : ['string'],
        data : {
          id: 'string',
          name: 'string',
          username: 'string',
          password: 'string',
          isActive: true,
          createdAt: '1990-01-01T01:01:01.000Z',
          updatedAt: '1990-01-01T01:01:01.000Z'
        }
      }
    }
  */
  const { name: reqName, username: reqUsername, password: reqPassword } = req.body

  if (!reqUsername || !reqPassword) {
    return res.ReturnError(HTTPStatusCode.BadRequest, 'There is no username or password')
  }

  const date = new Date()
  const currentYear = date.getFullYear()
  const currentMonth = date.getMonth()
  const currentDate = date.getDate()

  const users = await User.findAll({
    where: {
      id: {
        [Op.like]: `${String(currentYear).padStart(4, '0')}-` +
          `${String(currentMonth + 1).padStart(2, '0')}${String(currentDate).padStart(2, '0')}-%`
      }
    }
  })

  if (!users) {
    users.push([])
  }

  const hashedPassword = bcryptUtil.formatPassword(reqPassword)
  const generatedId = `${String(currentYear).padStart(4, '0')}-` +
      `${String(currentMonth + 1).padStart(2, '0')}${String(currentDate).padStart(2, '0')}-` +
      `${String(users.length + 1).padStart(5, '0')}`

  const user = await User.create({
    id: generatedId,
    name: reqName,
    username: reqUsername,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date()
  })

  if (!user) {
    return res.ReturnError(HTTPStatusCode.ServerError, 'Failed creating new user')
  }

  return res.ReturnOk({ data: user })
})

exports.updateUserbyId = catchAsync(async (req, res) => {
  /*
    #swagger.tags = ['Users']
    #swagger.description = 'Endpoint to update user by id'
    #swagger.parameters['body'] = {
      in: 'body',
      schema : {
        name : 'string',
        username : 'string',
        password : 'string'
      }
    }
    #swagger.responses[200] = {
      schema : {
        status : true,
        messages : ['string'],
        data : null
      }
    }
  */
  const reqId = req.params.id
  const { name: reqName, username: reqUsername, password: reqPassword } = req.body

  const users = await User.findAll({
    where: {
      id: reqId
    }
  })

  if (users && users.length > 0) {
    const user = users[0]
    user.name = reqName
    user.username = reqUsername
    user.password = bcryptUtil.formatPassword(reqPassword)

    try {
      await user.update({ id: reqId })
      await user.save()
    } catch (error) {
      return res.ReturnError(HTTPStatusCode.BadRequest, error)
    }
  } else {
    return res.ReturnError(HTTPStatusCode.BadRequest, `There is no user with id ${reqId}`)
  }

  return res.ReturnOk(null, 'User data has been updated')
})
