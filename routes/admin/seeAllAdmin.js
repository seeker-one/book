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
               res.render('admin/seeAllAdmin.ejs',{username:req.session['username'],userData:data});
            }
       })
		
	});

	router.post('/',(req,res)=>{
         
          // 连接数据库
         var db=mysqlConn();
         switch(req.body.act){
            case 'del':{
               var id=req.body.id;
               db.query(`DELETE FROM user_table WHERE user_id='${id}'`,(err,data)=>{
                     if(err){
                        console.error(err);
                     }
                     else{
                         res.send({
                           code:1,
                           msg:'删除账户成功！'
                         })
                     }
               })
            }
         }
        
	})
	return router;
}