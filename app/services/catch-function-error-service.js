const HTTPStatusCode = require('../enums/http-status-code-enum')

module.exports = function (fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((error) => {
      const messages = error.errors.map((data) => {
        return data.message
      })
      if (error.name === 'SequelizeConnectionRefusedError') {
        res.ReturnError(HTTPStatusCode.ServerError, 'Database connection ' + error.parent.code)
      } else if (error.name === 'SequelizeUniqueConstraintError') {
        res.ReturnError(HTTPStatusCode.BadRequest, messages)
      } else {
        res.ReturnError(HTTPStatusCode.BadRequest, messages)
      }
    })
  }
}
