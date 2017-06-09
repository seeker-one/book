var express = require('express');
var router = express.Router();
const  mysqlConn=require('../../libs/mysql_conn.js');
const  md5=require('../../libs/md5.js');

module.exports=function(){
   var db=mysqlConn();
  // 商家注册
   router.post('/register',(req,res)=>{
       var username=req.body.username;
       var password=md5(req.body.password);
       db.query(`SELECT * FROM user_table WHERE username='${username}'`,(err,data)=>{
            if(err){
               console.error(err);
            }
            else{
              if(data.length==0){
                 db.query(`INSERT INTO user_table (username,password,user_type) VALUES('${username}','${password}','shop')`,(err,data)=>{
                     if(err){
                      console.error(err);
                     }
                     else{
                         res.send("注册成功")
                     }
                 })
              }
              else{
                res.send('该账户已注册,请进行登录！')
              }
            }
       })
   })

   return router;
}

