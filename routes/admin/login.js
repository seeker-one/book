const express=require('express');
const md5=require('../../libs/md5');
const mysqlConn=require('../../libs/mysql_conn');
module.exports=function(){
	var router=express.Router();
      
      router.get('/',(req,res)=>{
      	 res.render('admin/login.ejs',{title:'管理员登录'});
      	
      })
      // 登录
      router.post('/',(req,res)=>{
      	   const username=req.body.username;
      	   const password=md5(req.body.password);

               // 连接数据库
               var db=mysqlConn();
                db.query(`SELECT * FROM user_table WHERE username='${username}'`,(err,data)=>{
                    if(err){
                        res.send('database error').end();
                    }
                    else{
                        if(data.length==0){
                           res.send('该用户不存在!').end();
                        }
                        else{
                  
                            if(password==data[0].password){
                                 req.session.username=username;
                                 req.session.user_type=data[0].user_type;
                                 res.send('ok').end();                            
                            }
                            else{
                               res.send('密码错误').end();
                            }                         
                        }
                        
                    }
                })
      	  
      })
	  return router;
}

