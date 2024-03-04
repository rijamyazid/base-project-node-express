const { User } = require('../../db/models')
const catchAsync = require('../services/catch-function-error-service')
const HTTPStatusCode = require('../enums/http-status-code-enum') //eslint-disable-line

exports.users = catchAsync(async (req, res) => {
  /*
    #swagger.tags = ['Base']
    #swagger.description = 'Endpoint to get user data'

    #swagger.responses[200] = {
      schema : {
        status : true,
        messages : ['string'],
        data : [
          {
            id: 'uuid',
            name: 'string',
            createdAt: '1990-01-01T01:01:01.000Z',
            updatedAt: '1990-01-01T01:01:01.000Z'
          }
        ]
      }
    }
  */
  const users = await User.findAll() //eslint-disable-line

  res.Return200(users)
})
