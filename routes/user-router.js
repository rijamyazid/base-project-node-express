const express = require('express')
const userController = require('../app/controllers/user-controller')
const requireAuth = require('../app/middlewares/auth-mid')

const router = express.Router()

router.get('/', requireAuth, userController.getUsers)
router.get('/:id', requireAuth, userController.getUserById)
router.post('/', requireAuth, userController.addUser)
router.put('/:id', requireAuth, userController.updateUserbyId)

module.exports = router
