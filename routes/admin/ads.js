
// 广告位处理

var express = require('express');
const mysqlConn=require('../../libs/mysql_conn');
const fs=require('fs');
const pathLib=require('path');

module.exports=function(){
	 var router=express.Router();
	 var db=mysqlConn();

     // 渲染
	 router.get('/',(req,res)=>{
	 	  db.query(`SELECT * FROM ad_table`,(err,data)=>{
	 	  	  if(err){
	 	  	  	console.error(err);
	 	  	  }
	 	  	  else{
	 	  	  	res.render('admin/ads.ejs',{username:req.session['username'],adData:data})
	 	  	  }
	 	  })
	 	  
	 })

     // 添加广告
	 router.post('/add',(req,res)=>{
	 	 
          var oldPath=req.files[0].path;
          
          var newPath=req.files[0].path+pathLib.parse(req.files[0].originalname).ext;

          var newFileName=req.files[0].filename+pathLib.parse(req.files[0].originalname).ext;
          fs.rename(oldPath,newPath,(err)=>{
              if(err){
                  console.error(err);  
              }
              else{
                    var ad_text=req.body.ad_text;
                    var ad_href=req.body.ad_href;
                    
                  db.query(`INSERT INTO ad_table (ad_text,ad_href,ad_img) VALUES('${ad_text}',
                  	'${ad_href}','${newFileName}')`,(err,data)=>{
                        if(err){
                          console.error(err);
                        }
                        else{
                          res.redirect('/admin/ads');
                        }
                    })  

              }
          })
	 })

	 // 删除广告
	 router.get('/del',(req,res)=>{
	 	 var ad_id=req.query.ad_id;
	 	 var ad_img=req.query.imgSrc;
	 	 db.query(`DELETE FROM ad_table WHERE ad_id='${ad_id}' `,(err,data)=>{
	 	 	 if(err){
	 	 	 	console.error(err);
	 	 	 }
	 	 	 else{
	 	 	 	   var pathname=pathLib.resolve(__dirname,'../../','public');
	               fs.unlink(pathLib.join(pathname,ad_img),(err)=>{
	                if(err){
	                  console.error(err);
	                }
	                else{
	                   res.redirect('/admin/ads');
	                }
	              })
	 	 	 }
	 	 })
	 })

	 return router;
}