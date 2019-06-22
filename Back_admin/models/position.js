const db=require("../utils/db");
 class Position{
     constructor(){
         let PositionSchema={
            companyLogo: String,
            companyName: String,
            positionName: String,
            city: String,
            salary: String,
            createTime: String
         }
         this.positonModel=db.model("postions",PositionSchema);
     }
    //  插入数据操作
     save(data){
         let position=new this.positonModel({
             ...data,
            //  覆盖这里面的字段
             createTime: '2019年6月21日'
         })
         return position.save();
     }
    // 查询所有的数据
    findAll(){
        // 回来再进行排序
        return this.positonModel.find({}).sort({_id: -1});
    }
    // 删除数据
    delete(id){
        console.log(id)
        // 调用数据库函数进行数据的查找
        return this.positonModel.findByIdAndRemove(id)
    }
 }
let positonModel=new Position();
 module.exports=positonModel;