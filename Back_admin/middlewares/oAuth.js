const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

const oAuth = (req, res, next) => {
  res.set('Content-Type', 'application/json; charset=utf-8')
  
  let token = req.header('X-Access-Token')
   // let cert = fs.readFileSync(path.resolve(__dirname, '../keys/rsa_public_key.pem')
  jwt.verify(token, "hello", (err, decoded) => {
    // 密串不匹配的时候返回的状态就用fail摸板返回渲染称json数据返回给前端
    if (err) {
      res.render('fail', {
        data: JSON.stringify({
          isSignin: false
        })
      })
    } else {
     
      //  密串匹配的时候返回的状态就用succ摸板返回渲染称json数据返回给前端
      res.render('succ', {
        data: JSON.stringify({
          // decoded这里面含有用户名字
          username: decoded.username,
          isSignin: true
        })
      })
       // 走下一个请求position.js中的
      //  next()
    }
  })
}

module.exports = oAuth