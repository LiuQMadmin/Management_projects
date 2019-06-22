var express = require('express')
var router = express.Router()
// 引入进来职位管理的c下面的position.js
const positionController = require('../controllers/position')
const oAuthbase = require('../middlewares/oAuth-base')
const fileUpload=require("../middlewares/upload-file")
// router.route('/position',console.log("position"))
router.route('/')
// 这里先进行认证，如果认证不通过，下面的就无法执行
  .all(oAuthbase)
  .get(positionController.findAll)
  .post(fileUpload.uploadfile,positionController.save)

module.exports = router