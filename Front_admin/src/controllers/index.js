import menuTpl from '../views/menu.html'
import homeTpl from '../views/home.hbs'

import Users from './users'

export const render = (req, res, next) => {
  // 转载menu
  $('.sidebar-menu').html(menuTpl)

  // 渲染登录注册
  new Users()

  // 返回路由的home页
  res.render(homeTpl({}))
}




































// 这些之前写的
// function _renderUerTpl({isSignin=false,username}) {
//   let template = Handlebars.compile(userTpl)
//   let renderedUserTpl = template({
//     isSignin,
//     username
//   })
//   $('.user-menu').html(renderedUserTpl)
// }

// // 渲染user模板，绑定登录注册事件
// function _user(res) {
//   _renderUerTpl({})
//   $('#user').on('click', 'span', function(e) {
//     // e.stopPropagation()
//     if ($(this).attr('id') === 'user-signin') {
//       $('.box-title').html('登录')
//     } else {
//       $('.box-title').html('注册')
//     }
//   })
// }

// // 用户注册
// function _signup() {
//   $('#confirm').on('click', () => {
//     console.log($('#user-form').serialize())
//     $.ajax({
//       url: '/api/users/signup',
//       type: 'POST',
//       data: $('#user-form').serialize(),
//       success:(result)=>{
//         alert(result.data.message);
//       }
//     })
//   })
// }



// // 用户登录
// function _signin() {
//   $('#confirm').on('click', () => {
//     console.log($('#user-form').serialize())
//     $.ajax({
//       url: '/api/users/signin',
//       type: 'POST',
//       data: $('#user-form').serialize(),
//       success:(result)=>{
//         alert(result.data.message);
//         // 这里进行dom操作
//         let template = Handlebars.compile(userTpl)
//         let renderedUserTpl = template({
//           isSignin:"false",
//           username:""
//         })
//       }
//     })
//   })
// }












// export const render = (req, res, next) => {
//   $('.sidebar-menu').html(menuTpl)
//   _renderUerTpl({isSignin: false})
//   _user(res)
//   _signup()
//   _signin()
//   // 返回路由的home页
//   res.render(homeTpl({}))
// }
