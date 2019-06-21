export default function() {
  // 认证(看看本地有没有那个密串，有的话就实现免登陆功能)
  return $.ajax({
    // 这个就是后端密串的路由地址
    url: '/api/users/issignin',
    // 这里是为了设置一下请求头的内容，再ajax中埋下数据，这个数据要发送给后台进行密串的解密对比
    headers: {
      'X-Access-Token': localStorage.getItem('token') || ''
    },
    // 这里接受后端发来的数据
    success: (result) => {
      // 把数据返回给调用他的函数
      return result
    },
    // ajax中还有处理错误的函数
    error: (err) => {
      // this._renderUerTpl({isSignin: false})
      return false
    }
  })
}