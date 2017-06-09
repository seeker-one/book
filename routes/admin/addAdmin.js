const express=require('express');
const mysqlConn=require('../../libs/mysql_conn');
const md5=require('../../libs/md5');

module.exports=function(){
	var router = express.Router();

	router.get('/',(req,res)=>{
       var db=mysqlConn();
       db.query(`SELECT * FROM user_table WHERE user_type !="admin"`,(err,data)=>{
            if(err){
               console.error(err);
            }
            else{            
               res.render('admin/addAdmin.ejs',{username:req.session['username']});
            }
       })
		
	});

    // 添加管理员
	router.post('/',(req,res)=>{        
         // 连接数据库
         var db=mysqlConn();
         switch(req.body.act){
            case 'add':{
               var username=req.body.username;
               var password=md5(req.body.password);
               db.query(`INSERT INTO user_table(username,password,user_type) VALUES('${username}','${password}','commonAdmin')`,
                  (err,data)=>{
                     if(err){
                        console.error(err);
                     }
                     else{
                          res.send({
                           code:1,
                           msg:'添加成功！'
                          })
                     }
               })
            };break;
         }
        
	})
	return router;
}