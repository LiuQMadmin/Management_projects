// const positionTpl=require("../views/position.hbs");
// export const render=(req,res,next)=>{
//         // 花括号里面可以传数据，直接调用摸板就行
//         res.render(positionTpl({}));
 
    
// }

// 新写的代码
import positionAddTpl from "../views/position_add.hbs"
import positionTpl from '../views/position_list.hbs'
import oAuth from '../utils/oAuth'

export const render = async (req, res, next) => {
  let result = await oAuth()
  if (result.data.isSignin) {
    $.ajax({
      url:"api/position",
      headers:{
        "X-Access-Token":localStorage.getItem("token")
      },
      success(result){
        // 动态添加职位展示的页面
        console.log(result.data)
        res.render(positionTpl(
          {
            data: result.data,
            hasResult: result.data.length > 0
          }
        ))
      }
    })
    
    bindPositionListEvent(res);
  } else {
    res.go('/')
  }
}
// 点击添加职位显示的页面
export const add=(req,res,next)=>{
  // 这个添加按钮的页面
  res.render(positionAddTpl({}));
  bindPostionAddEvent(res);
}

function bindPositionListEvent(res){
  $('#router-view').on('click', '#addbtn', (e) => {
    res.go('/position_add')
  })
}
//给职位表单中那妞添加点击事件
function bindPostionAddEvent(res){
  // 点击这个按钮就会返回职位展示页面
  $("#posback").on("click",(e)=>{
    res.back();
  })


  // 给提交按钮绑定一个时间，把表单中的数据传送到后端
  $("#possubmit").on("click",(e)=>{
      $('#possave').ajaxSubmit({
        resetForm: true,
        headers: {
          'X-Access-Token': localStorage.getItem('token')
        },
        success(result) {
          res.back()
        }
      })
    })
    // $.ajax({
    //   // url:"/api/position",
    //   // type:"POST",
    //   // // 把表单中的数据全部传送过去
    //   // data:$("#possave").serialize(),
    //   // headers:{
    //   //   "X-Access-Token":localStorage.getItem("token")
    //   // },
    //   // success(result){
    //   //   res.back()
    //   // }
    // })
 


}