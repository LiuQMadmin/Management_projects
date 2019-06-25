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
  // 这个是显示所有的路由
  .get(positionController.findAll)
  // 这个是插入数据和上传图片的路由
  .post(fileUpload.uploadfile,positionController.save)
  // 这个是删除数据的路由
  .delete(positionController.delete)
  // 这个是搜索数据的路由
  // .search(positionController.search)
  // 这个是数据分页的路由
  router.get("/find",positionController.findMany)
  // 这个是更改数据时数据回填的路由
  router.get("/one",positionController.findOne)
  // 这里是更新的路由
  router.post('/update',fileUpload.uploadfile, positionController.update)
module.exports = router