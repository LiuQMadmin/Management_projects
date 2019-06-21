import userTpl from '../views/user.html'
import oAuth from '../utils/oAuth'
class Users{
    constructor(){
        this._init()
    }
    // 页面初始化的时候渲染页面
    async _init(){
      // 验证时不是本地存在密串，实现免登陆
        let result = await oAuth()
        // result就是后端返回的数据,下面就是返回数据的内容
        // data: JSON.stringify({
          //   username: decoded.username,
          //   isSignin: true
          // })
        if (result) {
          // 返回的数据放的摸板中去处理
        this._renderUerTpl({...result.data})
        } else {
          // 如果里面灭有的result为空时，就设置isSignin: false，不能实现免登陆
        this._renderUerTpl({isSignin: false})
        }
    }
    // 这里渲染的函数
    _renderUerTpl({isSignin=false, username=''}) {
      // 使用handlebars插件处理摸板
        let template = Handlebars.compile(userTpl)
        // 这里面是摸板中要插入数据
        let renderedUserTpl = template({
          // 这样的写法就是表示key和value都一样
          isSignin,
          username
        })
        $('.user-menu').html(renderedUserTpl)
        // 给渲染的摸板添加添加事件
        this._user()
      }
      // 渲染user模板，绑定登录注册事件
  _user() {
    // 因为是别的函数调用他，所以要先绑定this
    let that = this
    // 这里可以给注销按钮绑定一个事件
    $('.user-menu').on('click', '#signout', () => {
      // 清空本地存储的密串数据
      localStorage.removeItem('token')
      // 再刷新一下页面
      location.reload()
    })
    // 给登陆和注册按钮绑定一个事件
    // 第一个参数是事件名字，第二个参数是那个元素，第三个是回调函数
    // 要做的事件都在回调函数里面执行
    $('#user').on('click', 'span', function(e) {
      // 选定一个id=user-signin的元素
      if ($(this).attr('id') === 'user-signin') {
        // 在选定的元素中添加一个登录
        $('.box-title').html('登录')
        that._doSign('/api/users/signin', 'signin')
      } else {
         // 在选定的元素中添加一个注册
        $('.box-title').html('注册')
        that._doSign('/api/users/signup', 'signup')
      }
    })
  }
  // 登录注册ajax
  _doSign(url, type) {
    $('#confirm').off('click').on('click', async () => {
      $.ajax({
        url,
        type: 'POST',
        // 这里是获取form表达的内容
        data: $('#user-form').serialize(),
        // 回调函数里面是后端发来的数据，第一个参数为结果集，第二个参数为状态码，第三个参数为
        success: (result, statusCode, jqXHR) => {
          if (type === 'signin') {
            this._signinSucc(result, jqXHR)
          } else {
            alert(result.data.message)
          }
        }
      })
    })
  }
// 实现免登陆功能
_signinSucc(result, jqXHR) {
  if (result.ret) {
    this._renderUerTpl({
      isSignin: true,
      username: result.data.username
    })
    // 存储token（jqXHR.getResponseHeader('X-Access-Token'这里面可以取出来后端发来的密串）
    // 把这个密串以key为token,value为jqXHR.getResponseHeader('X-Access-Token')的键值对
    localStorage.setItem('token', jqXHR.getResponseHeader('X-Access-Token'))
    location.reload()
  }
}


}

export default Users