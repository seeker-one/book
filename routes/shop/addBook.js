var express = require('express');
const mysqlConn=require('../../libs/mysql_conn');
const date=require('../../libs/currentDate')
const fs=require('fs');
const pathLib=require('path');

module.exports=function(){
   var router = express.Router();
     router.get('/',(req,res)=>{
     	  // 连接数据库
          var db=mysqlConn();
          db.query(`SELECT sort_name FROM sort_table`,(err,data)=>{
               if(err){
               	console.error(err);
               }
               else{
               	  res.render('shop/addBook.ejs',{username:req.session['username'],type:data})
               }
          }) 
     })

     // 添加书籍信息
     router.post('/',(req,res)=>{

          var db=mysqlConn();
          var oldPath=req.files[0].path;
         
          var newPath=req.files[0].path+pathLib.parse(req.files[0].originalname).ext;

          var newFileName=req.files[0].filename+pathLib.parse(req.files[0].originalname).ext;

        
          fs.rename(oldPath,newPath,(err)=>{
              if(err){
                  console.error(err);  
              }
              else{
                    var book_name=req.body.book_name;
                    var book_author=req.body.book_author;
                    var price=req.body.price;
                    var sort=req.body.sortName;
                    var publish=req.body.publish;
                    var publish_date=new Date().getTime();
                    var count=req.body.count;
                    var summary=req.body.summary;
                    var user_id=req.session['user_id'];
                    console.log(publish_date);
                    db.query(`INSERT INTO book_table (user_id,book_name,book_author,sort,price,publish,publish_date,current_num,count,summary,image_src)
                    VALUES('${user_id}','${book_name}','${book_author}','${sort}','${price}','${publish}','${publish_date}','${count}','${count}','${summary}','${newFileName}')`,(err,data)=>{
                        if(err){
                          console.error(err);
                        }
                        else{
                           res.send('添加书籍成功！');
                        }
                    })    
              }
          })   

     })
  
     return router;

}
