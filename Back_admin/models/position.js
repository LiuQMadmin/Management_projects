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
 }
let positonModel=new Position();
 module.exports=positonModel;