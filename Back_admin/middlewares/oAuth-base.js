const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const oAuthBase = (req, res, next) => {
    res.set('Content-Type', 'application/json; charset=utf-8')
    let token = req.header('X-Access-Token')
    jwt.verify(token, "hello", (err, decoded) => {
      if (err) {
        res.render('fail', {
          data: JSON.stringify({
            isSignin: false
          })
        })
      } else {
        next()
      }
    })
  }
  
  module.exports = oAuthBase