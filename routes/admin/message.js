const express=require('express');

const mysqlConn=require('../../libs/mysql_conn');


module.exports=function(){
	 const router=express.Router();
	  var db=mysqlConn();

	  router.get('/',(req,res)=>{
	  	  db.query(`SELECT username FROM user_table WHERE user_type='shop'`,(err,data)=>{
               if(err){
               	console.error(err);
               }
               else{
               	  res.render('admin/message.ejs',{username:req.session['username'],email:data})
               }
	  	  })
	  	 
	  })

	  //消息添加
	  router.post('/',(req,res)=>{
	  	 
	  	 switch(req.body.act){
            case 'all':{	
                 var news_title=req.body.news_title;
                 var news_con=req.body.news_con;
                 var receiver=req.body.act;
                 var date=new Date().getTime();
                db.query(`INSERT INTO news_table(news_title,news_con,receiver,date) VALUES('${news_title}',
                	'${news_con}','${receiver}','${date}')`,(err,data)=>{
                	if(err){
                		console.error(err);
                	}
                	else{
                        res.send('发布成功！');
                	}
                })
            };break;

            case 'private':{
            	 var news_title=req.body.news_title;
                 var news_con=req.body.news_con;
                 var receiver=req.body.receiver;
                 var date=new Date().getTime();
                 db.query(`INSERT INTO news_table(news_title,news_con,receiver,date) VALUES('${news_title}',
                	'${news_con}','${receiver}','${date}')`,(err,data)=>{
                	if(err){
                		console.error(err);
                	}
                	else{
                        res.send('发送成功！');
                	}
                })
            };break;
	  	 }
	  	
	  })


	  return router;
}