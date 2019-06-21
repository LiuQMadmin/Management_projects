const db = require('../utils/db')
class UserModel {
  constructor() {
    // 这里是数据的声明程序
    this.userModel = db.model('users', {
      username: String,
      password: String
    })
  }
//封装的插入操作
  insert(data) {
    let users = new this.userModel(data)
    return users.save()
  }
// 封装的查询操作
  select(data) {
    return this.userModel.findOne({username: data.username})
  }
}
// 把这个程序暴露出去
module.exports = new UserModel()