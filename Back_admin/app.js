var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 这里是路由的位置
// 后端的路由的可以说这么回事，在app.js中配置app.use('/api/users', usersRouter);
// app.use('/api/position', posRouter)等路径来执行不同的函数，执行的函数里面又可以
// 分为不同路径，进而实现了路由，精准实现路径的访问
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var posRouter = require('./routes/position')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 这里定义的是一级路由

app.use('/', indexRouter);
//用户登录和注册等一系列操作时就走这个路由
// usersRouter里面定义了多个二级路由，根据api后面跟的参数进行二级路由的选择
app.use('/api/users', usersRouter);
// 只有用户登录之后才可以管理职位
// posRouter里面定义了多个二级路由，根据api后面跟的参数进行二级路由的选择
app.use('/api/position', posRouter)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
