const  express=require('express');
const mysqlConn=require('../../libs/mysql_conn');
const fs=require('fs');
const pathLib=require('path');


module.exports=function(){
	var router = express.Router();
     var db=mysqlConn();
      router.get('/',(req,res)=>{ 
            var user_id=req.session['user_id'];
     	  db.query(`SELECT * FROM book_table WHERE user_id = '${user_id}'`,(err,data1)=>{
     	  	  if(err){
     	  	  	console.error(err);
     	  	  }
     	  	  else{
                     db.query(`SELECT sort_name FROM sort_table`,(err,data2)=>{
                         if(err){
                              console.error(err);
                         }
                         else{
                            res.render('shop/seeAllBook.ejs',{username:req.session['username'],
                            bookData:data1,sortData:data2})  
                         }
                     })
     	  	  	 
     	  	  }
     	  })
     	 
     })

      router.post('/',(req,res)=>{
          switch(req.body.act){
              case 'del':{
                   var book_id=req.body.book_id;
                   var book_img=req.body.book_img;
                   db.query(`DELETE FROM book_table WHERE book_id='${book_id}'`,(err,data)=>{
                       if(err){
                           console.error(err);
                       }
                       else{                        
                           var pathname=pathLib.resolve(__dirname,'../../','public');
                           fs.unlink(pathLib.join(pathname,book_img),(err)=>{
                            if(err){
                              console.error(err);
                            }
                            else{
                               res.send('删除书籍成功！');
                            }
                          })
                       }
                   })
              };break;
              case 'change':{
                  var book_id=req.body.book_id;
                  var book_name=req.body.book_name;
                  var book_author=req.body.book_name;
                  var price=req.body.price;
                  var sort=req.body.sort;
                  var publish=req.body.publish;
                  var count=req.body.count;
                  var summary=req.body.summary;
                  db.query(`UPDATE book_table SET book_name='${book_name}',book_author='${book_author}',
                    price='${price}',sort='${sort}',publish='${publish}',
                    count='${count}',summary='${summary}' WHERE book_id='${book_id}'`,(err,data)=>{
                         if(err){
                              console.error(err);
                         }
                         else{
                              res.send('修改成功！');
                         }
                    })
              }
          }
         
     })
   return router;
}