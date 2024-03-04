const express = require('express')
const userController = require('../app/controllers/user-controller')

const router = express.Router()

router.get('/get', userController.users)

module.exports = router
