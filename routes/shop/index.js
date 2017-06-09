var express = require('express');
var router = express.Router();
const mysqlConn=require('../../libs/mysql_conn');

/* GET home page. */
// 连接数据库
 var db=mysqlConn();
router.use((req, res, next)=>{
    if((!req.session['username'] || req.session['user_type']!='shop') && req.url!='/shop'){ //没有登录
    	 console.log(req.url)
        res.redirect('/');   
    }else{
      next();
    }
  });


  // 商家管理首页
 router.get('/', function(req, res, next) {     
      db.query(`SELECT sort_name FROM sort_table`,(err,data)=>{
           if(err){
            console.error(err);
           }
           else{
              res.render('shop/addBook.ejs',{username:req.session['username'],type:data})
           }
      }) 
 }); 

 // 添加书籍
 router.use('/addBook',require('./addBook')());

 // 管理全部书籍
 router.use('/seeAllBook',require('./seeAllBook')());

 // 账户设置
 router.use('/accountManage',require('./accountManage')());

 //  消息中心
 router.use('/message',require('./message')());

// 退出登录
router.get('/logout',(req,res)=>{
      req.session.username=null;
      req.session.user_type=null;
      req.session.user_id=null;
      res.redirect('/')
   })
 
module.exports = router;
