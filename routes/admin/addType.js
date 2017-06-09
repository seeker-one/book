const express = require('express');
const mysqlConn=require('../../libs/mysql_conn');

module.exports=function(){
   var router = express.Router();
     router.get('/',(req,res)=>{
     	  res.render('admin/index.ejs',{username:req.session['username']})
     });

     // 添加书籍类别
     router.post('/',(req,res)=>{
     	 var sort_name=req.body.sort_name;
         
          // 连接数据库
         var db=mysqlConn();
         db.query(`INSERT INTO sort_table (sort_name) VALUES('${sort_name}')`,(err,data)=>{
             if(err){
             	console.error(err);
             	res.send({
             		code:'0',
             		msg:'添加类别失败！'
             	})
             }
             else{
             	res.send({
             		code:'1',
             		msg:'添加类别成功！'
             	});
             }
         })
     })
   return router;

}
