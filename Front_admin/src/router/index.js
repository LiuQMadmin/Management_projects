// 引进来sme-router
import SEMRouter from "sme-router"
// 引进来高亮的函数
import activeMiddleware from './active'
import* as positionController from "../controllers/position"
import* as indexController from "../controllers/index"
import* as oAuth from "../utils/oAuth"
// 引入进来路由的插件（可以实现动态页面精准的插入）
const router=new SEMRouter("router-view");
// 有请求/的函数就执行indexController.render
router.route("/",indexController.render);
// 有请求/position/任和内容的positionController.render
router.route("/position/:_",positionController.render);
// 如果没有登录的话就不能进行职位操作


//这个是点击的添加按钮之后需要展示页面的路由
router.route("/position_add",positionController.add); 

// 这个是更新的路由
router.route("/position_update/:id",positionController.update)




// 这里是为了实现重定向
// 有任何没有存在的请求都去请求重定向到/下面去请求
router.route('*', (req, res, next) => {
    res.redirect('/') // 实际上协助跳转到 / 路由上
})
// 这里是为渲染页面(默认执行的)
router.use(activeMiddleware)