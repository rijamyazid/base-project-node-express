module.exports = function (req, res, next) {
  res.ReturnOk = function (data, messages) {
    let _data = null
    let _isDataValid = false
    if (data) {
      if (data.length > 0) {
        _isDataValid = true
      }
      if (Object.keys(data).length > 0) {
        _isDataValid = true
      }
      if (_isDataValid) {
        _data = data
      }
    }

    const _messages = []
    if (messages) {
      if (typeof messages === 'string') {
        _messages.push(messages)
      } else {
        for (const _message of messages) {
          _messages.push(_message)
        }
      }
    }

    res.status(200).json({
      status: true,
      messages: _messages,
      data: _data
    })
  }

  res.ReturnError = function (httpStatusCode, messages) {
    const _messages = []
    if (messages) {
      if (typeof messages === 'string') {
        _messages.push(messages)
      } else {
        for (const _message of messages) {
          _messages.push(_message)
        }
      }
    }

    let _httpStatusCode = 400
    if (!httpStatusCode) {
      _messages.push('There is no http status code')
    } else {
      _httpStatusCode = httpStatusCode
    }

    res.status(_httpStatusCode).json({
      status: false,
      messages: _messages,
      data: null
    })
  }

  next()
}
