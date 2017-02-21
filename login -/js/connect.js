/**
 * Created by thinkpad on 2017/2/17.
 */
const express = require("express");
const mysql = require("mysql");
const querystring = require("querystring");

var router = express.Router();
var urllib=require('url');
//链接mysql
var conn = mysql.createPool({
    host: 'localhost',       //主机
    user: 'root',               //MySQL认证用户名
    database: 'login',
    port: '3306'
});

var server = express();
var newTrue=true;
server.listen(8080);
//获取数据
// server.all("*",function (req,res,next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1');
//     if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
//     else  next();
// });
var data = {'message': '用户名重复','message1': '注册成功'};
server.use("/",function (req, res) {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET,POST");
    var str = "";
    req.on("data", function (data) {
        str += data;
    });
    req.on("end", function () {
        var POST = querystring.parse(str);
        conn.getConnection(function (err, conn) {
            var userAddSql = 'insert into login (uid,pwd,xueli,male,liked) values(?,?,?,?,?)';
            var param = [POST.uid, POST.psd, POST.xueli, POST.male, POST.liked];

            //mysql获取数据
             var userGetSql = 'SELECT * FROM login';  //选择table

            conn.query(userGetSql, function (err, result) {

                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                }

                // for (var i = 0; i < result.length; i++) {
                //     if (result[i].uid === param[0]) {
                //         console.log('重复了 ');
                //         // var params=urllib.parse(req.url,true);
                //             res.send(JSON.stringify(data.message));//普通的json
                //         newTrue=false;
                //         return;
                //     }
                // }


                //判断，mysql数据是否为空
               if(result.length!=0){
                   //遍历，查重
                   for(var i in result){
                       if(result[i].uid === param[0]){
                           res.send(JSON.stringify(data.message));//普通的json
                           newTrue=false;
                           return;
                       }else{
                           conn.query(userAddSql, param, function (err, rs) {
                               res.send(JSON.stringify(data.message1));//普通的json
                           });
                       }
                   }
               }else{
                   conn.query(userAddSql, param, function (err, rs) {
                       res.send(JSON.stringify(data.message1));//普通的json
                   });
               }

            });
            // console.log(newTrue)
            // if(newTrue){
            //     conn.query(userAddSql, param, function (err, rs) {
            //         res.send(JSON.stringify(data.message1));//普通的json
            //     });
            // }else{
            //     newTrue=true;
            // }


            conn.release();
        });
    });

});



