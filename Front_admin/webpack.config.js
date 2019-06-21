const path = require("path");
// 引入进来拷贝html文件的插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 引入进来拷贝公共资源的插件
const CopyPlugin=require("copy-webpack-plugin");
module.exports = {
    // 环境（是开发环境还是生产环境）
    mode: "development",
    // 打包的入口
    entry: "./src/app.js",
    // 打包的出口配置
    output: {
        // 这里和入口文件名一致(用来加载其他的文件)
        filename: "app.js",
        // 打包完要存放的位置
        path: path.resolve(__dirname, "./dev")
    },
    // 配置webserver
    devServer: {
        // 这个是可以访问的文件夹
        contentBase: path.join(__dirname, "./dev"),
        compress: true,
        // 端口号
        port: 8000,
        proxy: {
            '/api': {
              target: 'http://localhost:3000'
            }
          }
    },
    // 配置一下拷贝html文件的插件
    plugins: [
        new HtmlWebpackPlugin({
            // 目标文件名
            filename: "index.html",
            // 源文件路径
            template: "src/index.html"
        }),
        new CopyPlugin([
            //第一个是目标文件，第二个是放到那里
            {from:"./src/public",to:"./public"}
        ])
    ],
    // 配置loader,加载图片
    module: {
        rules: [{
            test: /\.(jpg|png|gif)$/i,
            use: [{
                loader: "url-loader"
            }]
        },
        // 这里是加载静态数据的摸板
        {
            test:/\.html$/i,
            use:{
                loader:"string-loader"
            }
        },
        {
            test: /\.(scss|css)$/i,
            use: ['style-loader', 'css-loader', 'sass-loader']
          },
        // 这里是在加载动态数据
        {
            test: /\.hbs$/i,
            use: {
              loader: 'handlebars-loader'
            }
          }

        ]
    }
}