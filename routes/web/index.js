var express = require('express');
var router = express.Router();
const  mysqlConn=require('../../libs/mysql_conn.js');

var db=mysqlConn();

// 返回书籍目录
 router.get('/', function(req, res) {
    db.query(`SELECT * FROM sort_table`,(err,data)=>{
        if(err){
          console.error(err);
        }
        else{
           res.render('web/index.ejs',{sortData:data});
        }
    })
    
 }); 
// 书籍数目
router.post('/querySum',(req,res)=>{
      db.query(`SELECT COUNT(book_id) AS sum FROM  book_table `,(err,data)=>{
          if(err){
            console.error(err);
          }
          else{
              res.send({
               pageCount:data
              })
          }
       }) 
})

 router.post('/',(req,res)=>{
    switch(req.body.act){
      case 'new':{
           // 最新书籍
        var pageNum=parseInt(req.body.pageNum-1)*16;
        console.log(pageNum)
        db.query(`SELECT * FROM  book_table ORDER BY publish_date DESC LIMIT ${pageNum},16 `,(err,data)=>{
           if(err){
              console.error(err);
           }
           else{
              res.send({
               code:1,
               data:data
              })     
           }
        })
      };break;
      case 'hot':{

      }
    }   
 })

// 书籍详细介绍
 router.get('/book_detail',(req,res)=>{
     var id=req.query.id;
     db.query(`SELECT user_table.username,book_table.* FROM user_table,book_table WHERE book_id='${id}' AND user_table.user_id=
      book_table.user_id`,(err,data1)=>{
        if(err){
          console.error(err);
         
        }
        else{
          db.query(`SELECT * FROM ad_table`,(err,data2)=>{
              if(err){
                console.error(err);
              }
              else{
                  res.render('web/book_detail.ejs',{bookData:data1[0],adData:data2})
              }
          })
        }
     })
 })

// 模糊查找书籍
 router.get('/book_search',(req,res)=>{
     var name=req.query.bookName;
     db.query(`SELECT book_id,book_name,price,sort,publish_date,image_src FROM book_table WHERE book_name LIKE '%${name}%' `,(err,data)=>{
          if(err){
             console.error(err);
          }
          else{
             res.render('web/search.ejs',{bookData:data})
          }
     })
    
 })

// 种类查找
 router.get('/book_searchKind',(req,res)=>{
     var sort=req.query.sortName;
     db.query(`SELECT book_id,book_name,price,sort,publish_date,image_src FROM book_table WHERE sort='${sort}' `,(err,data)=>{
          if(err){
             console.error(err);
          }
          else{
             res.render('web/search.ejs',{bookData:data})
          }
     })
 })

 // 发表留言
 router.post('/book_detail/comment',(req,res)=>{
       var book_id=req.body.book_id;
       var email=req.body.email;
       var content=req.body.content;
      db.query(`INSERT INTO leaveMessage_table(book_id,email,content) VALUES('${book_id}','${email}',
        '${content}') `,(err,data)=>{
          if(err){
            console.error(err);
          }
          else{
              res.send('评论成功！');
          }
       }) 
})

 // 请求留言
 router.post('/book_detail/queryComment',(req,res)=>{
       var book_id=req.body.book_id;
      db.query(`SELECT * FROM leaveMessage_table WHERE book_id = '${book_id}'`,(err,data)=>{
          if(err){
            console.error(err);
          }
          else{
              res.send({
                 commentData:data
              });
          }
       }) 
})


 // 注册
 router.post('/register',require('./register')());

 // 登录
 router.post('/login',require('./login')());
 
module.exports = router;
