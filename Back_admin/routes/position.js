var express = require('express')
var router = express.Router()
// 引入进来职位管理的c下面的position.js
const positionController = require('../controllers/position')
const oAuthbase = require('../middlewares/oAuth-base')
const fileUpload=require("../middlewares/upload-file")


// 这里是从app.js转过来的二级路由，在这里在进行筛选跳转
router.route('/')
// 这里先进行认证，如果认证不通过，下面的就无法执行
  .all(oAuthbase)
  .get(positionController.findAll)
  .post(fileUpload.uploadfile,positionController.save)
  .delete(positionController.delete)
  .search(positionController.search)
module.exports = router