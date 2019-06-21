// const positionTpl=require("../views/position.hbs");
// export const render=(req,res,next)=>{
//         // 花括号里面可以传数据，直接调用摸板就行
//         res.render(positionTpl({}));
 
    
// }

// 新写的代码
import positionTpl from '../views/position.hbs'
import oAuth from '../utils/oAuth'

export const render = async (req, res, next) => {
  let result = await oAuth()
  if (result.data.isSignin) {
    res.render(positionTpl({}))
  } else {
    res.go('/')
  }
}
