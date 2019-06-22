const postionModel=require("../models/position")

class PositionController {
  constructor(){}

  // find(req, res, next) {
  //   res.set('Content-Type', 'application/json; charset=utf-8')
  //   res.render('succ', {data: 'ok'})
  // }
  // 把前端发来的数据进行存储
  async save(req,res,next){
    console.log(req.body);
    let result=await postionModel.save({
      ...req.body,
      companyLogo:req.filename
    });
    if(result){
      res.render("succ",{
        data:JSON.stringify({
          message:"数据保存成功！"
        })
      })
     
    }else{
      res.render("fail",{
        data:JSON.stringify({
          message:"数据保存失败！"
        })
      })
     
    }
  } 

  async findAll(req,res,next){
    res.set("Content-type","application/json;charset=utf-8");
    let result=await postionModel.findAll();
    // 返回正确格式的json字符串
    res.render("succ",{data:JSON.stringify(result)});
  }
}

const positionController = new PositionController()

module.exports = positionController