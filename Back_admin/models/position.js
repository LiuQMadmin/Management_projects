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
         let time=this.time();
         let position=new this.positonModel({
             ...data,
            //  覆盖这里面的字段
             createTime: time
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
    // 这个是定义的搜索函数，有可能删除
    // search(companyName){
    //     // console.log(companyName);
    //     return this.positonModel.find({companyName});
    // }
    findOne(id){
        return this.positonModel.findById(id);
    }
    // 更新数据
    update(id, update) {
        return this.positonModel.findByIdAndUpdate(id, update)
    }


    time(){
        let myDate=new Date();
        let yue=myDate.getMonth()+1;
        let tian=myDate.getDate();
        let xiaoshi=myDate.getHours();
        let fenzhong=myDate.getMinutes();
        return(yue+"月"+tian+"日 "+xiaoshi+":"+fenzhong);
    }
 }
let positonModel=new Position();
 module.exports=positonModel;