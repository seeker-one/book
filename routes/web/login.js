var express = require('express');
var router = express.Router();
const  mysqlConn=require('../../libs/mysql_conn.js');
const  md5=require('../../libs/md5.js');

module.exports=function(){
	 var db=mysqlConn();
	 // 商家登录
	 router.post('/login',(req,res)=>{
	     var username=req.body.username;
	     var password=md5(req.body.password);
	     var user_type='shop';
	     db.query(`SELECT * FROM user_table WHERE username='${username}' AND user_type='shop'`,(err,data)=>{
	          if(err){
	             console.error(err);
	          }
	          else{
	          	  if(data.length>0){
	          	  	 if(password==data[0].password){ 
	          	  	     req.session.username=username; 
	          	  	     req.session.user_id=data[0].user_id;
	          	  	     req.session.user_type=data[0].user_type;
		                 res.send('登录成功！'); 
		            }
		            else{
		                res.send('密码不正确！');
		            }
	          	  }
	          	  else{
                        res.send('该账户不存在，请先去注册！')
	          	  }		            
	          }
	     })
	 })
     
     return router;

}