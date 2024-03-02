const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  // #swagger.tags = ['Base CRUD']
  res.send('Home')
})

module.exports = router
