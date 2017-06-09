var express = require('express');
const mysqlConn=require('../../libs/mysql_conn');

module.exports=function(){
   var router = express.Router();
     router.get('/',(req,res)=>{
         // 连接数据库
          var db=mysqlConn();
          db.query(`SELECT * FROM sort_table`,(err,data)=>{
          	  if(err){
          	  	console.error(err);
          	  	res.send({
          	  		code:0,
          	  		msg:'数据库连接异常！'
          	  	})
          	  }
          	  else{
          	  	res.render('admin/seeAllType.ejs',{username:req.session['username'],data:data})
          	  }  
          })
     	  
     })
     router.post('/',(req,res)=>{
         // 连接数据库
         var db=mysqlConn();
         switch(req.body.act){

            // 删除书籍类别
            case 'del':{
                  db.query(`DELETE  FROM sort_table WHERE id='${req.body.id}'`,(err,data)=>{
                       if(err){
                        console.error(err);
                       }
                       else{
                          res.send({
                              code:1,
                              msg:'删除成功！'
                          })
                       }
                  })
            };break;
            case 'change':{
                db.query(`UPDATE sort_table SET sort_name='${req.body.sortName}' WHERE id='${req.body.id}'`,
                  (err,data)=>{
                       if(err){
                        console.error(err);
                       }
                       else{
                          res.send({
                            code:1,
                            msg:'修改成功！'
                          })
                       }
                  })
            }
         }
     })
   return router;

}
