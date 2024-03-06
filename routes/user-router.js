const express = require('express')
const userController = require('../app/controllers/user-controller')

const router = express.Router()

router.get('/', userController.getUsers)
router.get('/:id', userController.getUserById)
router.post('/', userController.addUser)
router.put('/:id', userController.updateUserbyId)

module.exports = router
