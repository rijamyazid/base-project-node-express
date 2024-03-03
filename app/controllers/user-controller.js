const {
  User
} = require('../../db/models')

exports.getUser = async (req, res) => {
  /*
    #swagger.tags = ['Base']
    #swagger.description = 'Endpoint to get user data'
  */
  const users = await User.findAll() //eslint-disable-line
  /*
    #swagger.responses[200] = {
      schema : {
        text : 'string'
      }
    }
  */
  res.send('Get User')
}
