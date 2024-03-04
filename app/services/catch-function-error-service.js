const HTTPStatusCode = require('../enums/http-status-code-enum')

module.exports = function (fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((error) => {
      if (error.name === 'SequelizeConnectionRefusedError') {
        res.ReturnError(HTTPStatusCode.ServerError, 'Database connection ' + error.parent.code)
      } else if (error.name === 'ValidationError') {
        res.ReturnError(HTTPStatusCode.BadRequest, error.message.replace(/[\\"]/g, ''))
      } else {
        res.ReturnError(HTTPStatusCode.BadRequest, error.message)
      }
    })
  }
}
