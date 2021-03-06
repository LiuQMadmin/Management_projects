
// 新写的代码
import positionAddTpl from "../views/position_add.hbs"
import positionTpl from '../views/position_list.hbs'
import positionUpdateTpl from "../views/position_update.hbs"
import oAuth from '../utils/oAuth'
import randomstring from "randomstring"
export const render = async (req, res, next) => {
  let result = await oAuth()
  if (result.data.isSignin) {
    let page=req.query&&req.query.page||0;
    let pagesize=req.query&&req.query.pagesize||5;
    var count=[];
    var num=[];
    var total;
    $.ajax({
      url:"api/position",
      headers:{
        "X-Access-Token":localStorage.getItem("token")
      },
      success(result){
        total=Math.ceil(result.data.length/pagesize);
        for(var i=1;i<total+1;i++){
          // count.push(i);
          if(page==(i-1)){
            count.push({"a":i,"c":true});
          }else{
            count.push({"a":i,"c":false});
          }
        }
        
        
        // 动态添加职位展示的页面
        // res.render(positionTpl(
        //   {
        //     // data: result.data,
        //     // hasResult: result.data.length > 0
        //   }
        // ))
      }
    })
// 这个是刚写的
    
    $.ajax({
      url:"api/position/find",
      headers:{
        "X-Access-Token":localStorage.getItem("token")
      },
      data:{
        page,
        pagesize
      },
      success(result){
        for(var i=1;i<6;i++){
          num.push(i+page*5)
        }
        result.data.forEach((item,index) => {
          item.num=index+1+5*page;
        });
        // 动态添加职位展示的页面
        res.render(positionTpl(
          {
            data: result.data,
            hasResult: result.data.length > 0,
            url:location.hash.split('?')[0],
            count,
            num,
            page,
            // 这里是判断分页的时候在最前面和最后面就不能再翻页了
            before:(~~page-1)<0 ? 0 :(~~page-1),
            after:(~~page+1)>(total-1) ? (total-1) :(~~page+1)
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









export const update=(req,res,next)=>{
  $.ajax({
    // 想后端请求的url
    url: '/api/position/one',
    data: {
      id: req.params.id
    },
    headers: {
      'X-Access-Token': localStorage.getItem('token')
    },
    success(result) {
      if (result.ret) {
        res.render(positionUpdateTpl({
          ...result.data
        }))
      } else {
        alert(result.data)
      }
    }
  })
  // 点击修改按钮之后就会出现渲染的摸板
  // res.render(positionUpdateTpl({}));
  bindPostionUpdateEvent(req, res);
}

function bindPositionListEvent(res){
  // 给添加按钮绑定一个事件
  $('#router-view').off("click","#addbtn").on('click', '#addbtn', (e) => {
    res.go('/position_add')
  })
  // 这里都是用代理实现按钮的绑定，因为这个数据是动态插入的，这里是删除按钮的
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
  $("#router-view").off("click",".btn-update").on("click",".btn-update",function(e){
  //  获取id的值，用来去数据库里面查询数据进行添加进来
    res.go("/position_update/"+$(this).closest("tr").attr("data-id"))
  })

  // 给搜索按钮绑定一个点击按钮
  $("#router-view").off("click","#possearch").on("click","#possearch",(e)=>{
      
    

    




    let campanyName=$("#keywords").val();
    $.ajax({
        url:"api/position",
        type:"SEARCH",
        data:{
          // closest是找李这个按钮元素最近的tr元素,然后找到绑定的在tr上面的id
          campanyName,
        },
        headers:{
          "X-Access-Token":localStorage.getItem("token")
        },
        success(result){
          
          // 动态添加职位展示的页面
          res.render(positionTpl(
            {
              data: result.data,
              hasResult: result.data.length > 0,
              count:[{"a":1}],
            }
          ))
          $("#keywords").val(campanyName)

        }
      })





    })






}
//给职位表单中按钮添加点击事件
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
// 这里是定义了更新页面里面按钮的监听
function bindPostionUpdateEvent(req,res){
  $("#router-view").off("click","#posback").on("click","#posback",(e)=>{
    res.back();
  })

  // 这里定义的是提交按钮的功能
  $("#router-view").off('click', '#possubmit').on('click', '#possubmit',(e)=>{
    $('#posupdate').ajaxSubmit({
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

