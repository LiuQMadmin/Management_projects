const multer = require('multer') // 处理接受 multipart/form-data
const path = require('path')
const randomString = require('node-random-string')
class FileUpload{
  // 验证图片的格式
  _fileFilter(req, file, cb) {
    let mimeRegexp = new RegExp('(image\/png|image\/jpg|image\/jpeg|image\/gif)', 'gi');
    console.log(file.mimetype);
    if (mimeRegexp.test(file.mimetype)) {
      cb(null, true)
    } else {
      cb(null, false)
      cb(new Error('文件格式不正确'))
    }
  }







    uploadfile(req,res,next){
      let filename = ''
    let storage=multer.diskStorage({
      // 前端发送过来的图片存储再后端的那个位置
      destination: (req, file, cb) => {
        //   这里需要自己新建一个upload文件夹
        cb(null, path.resolve(__dirname, '../public/upload'))
      },
      // 传送的文件存储再后端文件的名字
      filename:(req,file,cb)=>{
        // 获取文件的原始名字
        let fileOriName=file.originalname
        // 截取文件的后缀名
        let lastDot=fileOriName.lastIndexOf(".");
        // 截取出来后缀名字
        let exFilename=fileOriName.slice(lastDot);
        // 获取一个随机的名字
        let rs=randomString({
          length:10,
          lowerCase:true
        });
        filename=rs+exFilename;
        cb(null,filename)
      }
      
    })
    // single("companyLogo")读取前端发来的图片
    var upload=multer({
      storage,
      fileFilter: fileUpload._fileFilter
    }).single("companyLogo")
   
    upload(req, res, (err) => {
      if (err) {
        res.render('fail', {
          data: JSON.stringify(err.message)
        })
      } else {
        // 传递filename 到下个中间件
        req.filename = filename
        next()
      }
    })
  }
}
const fileUpload=new FileUpload();
module.exports=fileUpload;