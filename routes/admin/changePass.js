const express=require('express');
const mysqlConn=require('../../libs/mysql_conn');
const md5=require('../../libs/md5');


module.exports=function(){
	 var router=express.Router();

	 router.get('/',(req,res)=>{
	 	res.render('admin/changePassword.ejs',{username:req.session['username']})
	 })

	 router.post('/',(req,res)=>{
         
         db=mysqlConn();
         var username=req.session['username']
         switch(req.body.act){
         	// 查询原密码是否正确
         	case 'query':{
         		 db.query(`SELECT * FROM user_table WHERE username='${username}'`,(err,data)=>{
	         	  if(err){
	         	  	console.error(err);
	         	  }
	         	  else{
	         	  	 if(data.length==0){
	         	  	 	 res.status(500).send({
	         	  	 	 	code:-1,
	         	  	 	 	msg:'数据库查询失败！'
	         	  	 	 }).end();
	         	  	 }
	         	  	 else{
	         	  	 	 if(md5(req.body.password)==data[0].password){
	         	  	 	 	 res.send({
	         	  	 	 	 	code:1,
	         	  	 	 	 	msg:''
	         	  	 	 	 })
	         	  	 	 }
	         	  	 	 else{
	         	  	 	 	 res.send({
	         	  	 	 	 	code:0,
	         	  	 	 	 	msg:'原密码不正确！'
	         	  	 	 	 })
	         	  	 	 }

	         	  	 }
	         	  }
	            })
         		};break;
         		// 修改密码
         	case 'change':{
         		 var password=md5(req.body.password); 
         		 var username=req.session['username'];
         		 db.query(`UPDATE user_table SET password='${password}' WHERE username='${username}'`,(err,data)=>{
         		 	  if(err){
         		 	  	console.error(err);
         		 	  }
         		 	  else{
                          res.send({
                          	code:1,
                          	msg:'修改密码成功'
                          })
         		 	  }
         		 })
         	};break;

         }
        
	 })
	 return router;
}