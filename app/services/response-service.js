module.exports = function (req, res, next) {
  res.Return200 = function (inputData, inputMessages) {
    let _data = null
    let _isDataValid = false
    if (inputData) {
      if (inputData.length > 0) {
        _isDataValid = true
      }
      if (Object.keys(inputData).length > 0) {
        _isDataValid = true
      }
      if (_isDataValid) {
        _data = inputData
      }
    }

    const _messages = []
    if (inputMessages) {
      if (typeof inputMessages === 'string') {
        _messages.push(inputMessages)
      } else {
        for (const _message of inputMessages) {
          _messages.push(_message)
        }
      }
    }

    this.status(200)
    this.json({
      status: true,
      messages: _messages,
      data: _data
    })
  }

  res.ReturnError = function (inputHttpStatusCode, inputMessages) {
    const _messages = []
    if (inputMessages) {
      if (typeof inputMessages === 'string') {
        _messages.push(inputMessages)
      } else {
        for (const _message of inputMessages) {
          _messages.push(_message)
        }
      }
    }

    let _httpStatusCode = 400
    if (!inputHttpStatusCode) {
      _messages.push('There is no http status code')
    } else {
      _httpStatusCode = inputHttpStatusCode
    }

    this.status(_httpStatusCode)
    this.json({
      status: false,
      messages: _messages,
      data: null
    })
  }

  next()
}
