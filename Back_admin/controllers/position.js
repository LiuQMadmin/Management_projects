const postionModel=require("../models/position")

class PositionController {
  constructor(){}

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
  // 产出路由直接调用这个函数
  async delete(req, res, next){
    // 调用删除函数
    let result =await postionModel.delete(req.body.id);
    // 打印看看这个结果是啥
    console.log(result);
    if(result){
      res.render("succ",{
        data:JSON.stringify({
          message:"数据删除成功"
        })
      })
    }else{
      res.render("succ",{
        data:JSON.stringify({
          message:"数据删除失败"
        })
      })
    }
  }
  // 自己定义的查询函数，有可能删除
  async search(req,res,next){
    res.set("Content-type","application/json;charset=utf-8");
    
    let result=await postionModel.search(req.body.campanyName);
   
    res.render("succ",{data:JSON.stringify(result)});
  }
  // 修改的数据返回展示
  async findOne(req, res, next){
    res.set("Content-type","application/json;charset=utf-8");
    let result=await postionModel.findOne(req.query.id);
    res.render("succ",{data:JSON.stringify(result)})
  }
  async update(req,res,next){
    res.set('Content-Type', 'application/json; charset=utf-8');
    // 删除req.body里面这个字段
    delete req.body.companyLogo
    req.body=req.filename ? {...req.body,companyLogo:req.filename}:req.body;
    let result = await postionModel.update(req.body.id,req.body);
    if (result) {
      res.render('succ', {
        data: JSON.stringify({
          message: '数据修改成功.'
        })
      })
    } else {
      res.render('fail', {
        data: JSON.stringify({
          message: '数据修改失败.'
        })
      })
    }
  }
  // 这里是获取数据进行分页的
  async findMany(req,res,next){
    // 保证发送的数据是json格式的
    res.set('Content-Type', 'application/json; charset=utf-8');
    let {page=0,pagesize=5}=req.query;
    let result=await postionModel.findMany({page:~~page, pagesize:~~pagesize});
    if (result) {
      res.render('succ', {
        // 往前端返回数据
        data: JSON.stringify(
          result
        )
      })
    } else {
      res.render('fail', {
        data: JSON.stringify({
          message: '数据获取失败.'
        })
      })
    }
  }
  
}

const positionController = new PositionController()

module.exports = positionController