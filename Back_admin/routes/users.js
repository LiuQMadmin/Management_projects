var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

const userController = require('../controllers/users')
const oAuthMiddleWare = require('../middlewares/oAuth')
// 这个链接走注册
router.post('/signup', userController.signup)
// 这个链接走登录
router.post('/signin', userController.signin)
// 这个链接走验证是不是免登陆
router.get('/issignin', oAuthMiddleWare)
// 把这个函数暴露出去
module.exports = router
