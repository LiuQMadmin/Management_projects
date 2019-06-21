
// 先把mongoose进入进来
const mongoose=require("mongoose");
// 连接数据库的语句
mongoose.connect("mongodb://localhost:27017/haohuo", { useNewUrlParser: true });
// 拿到连接对象
let db=mongoose.connection;
// 爆出来连接错误的消息
db.on('error', console.error.bind(console, 'connection error:'));
// 把数据库连接的对象暴露出去
module.exports=db;