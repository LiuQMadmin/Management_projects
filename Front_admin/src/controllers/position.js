
// 新写的代码
import positionAddTpl from "../views/position_add.hbs"
import positionTpl from '../views/position_list.hbs'
import oAuth from '../utils/oAuth'
import randomstring from "randomstring"
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
  // 给添加按钮绑定一个事件
  $('#router-view').off("click","#addbtn").on('click', '#addbtn', (e) => {
    res.go('/position_add')
  })
  // 这里都是用代理实现按钮的绑定，因为这个数据是动态插入的
  $("#router-view").off("click",".btn-delete").on("click",".btn-delete",function(e){
    // 发送一个ajax请求
    $.ajax({
      url:"/api/position",
      type:"DELETE",
      // 传送给后端的数据
      data:{
        // closest是找李这个按钮元素最近的tr元素,然后找到绑定的在tr上面的id
        id:$(this).closest("tr").attr("data-id")
      },
      headers: {
        'X-Access-Token': localStorage.getItem('token')
      },
      success(result){
        if(result.ret){
          res.go("/position/"+randomstring.generate(7))
        }else{
          alert(result.data);
        }
      }

    })
  })
}
//给职位表单中那妞添加点击事件
function bindPostionAddEvent(res){
  // 点击这个按钮就会返回职位展示页面
  $("#posback").on("click",(e)=>{
    res.back();
  })


  // 给提交按钮绑定一个事件，把表单中的数据传送到后端
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

    

}