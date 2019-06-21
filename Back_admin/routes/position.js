var express = require('express')
var router = express.Router()
// 引入进来职位管理的c下面的position.js
const positionController = require('../controllers/position')
const oAuth = require('../middlewares/oAuth')
// router.route('/position',console.log("position"))
router.route('/')
// 这里先进行认证，如果认证不通过，下面的就无法执行
  .all(oAuth)
  .get(positionController.find)

module.exports = router