var express = require('express');
var router = express.Router();

/* GET home page. */

router.use((req, res, next)=>{
    if((!req.session['username'] || req.session['user_type']!='admin') && req.url!='/login'){ //没有登录
    	 console.log(req.url)
        res.redirect('/admin/login');
       
    }else{
      next();
    }
  });

 router.get('/', function(req, res, next) {
    res.render('admin/index.ejs',{username:req.session['username']});
 }); 
   //登录路由
 router.use('/login',require('./login')());

 // 添加书籍类别
 router.use('/addType',require('./addType')());

// 管理书籍类别
 router.use('/seeAllType',require('./seeAllType')());

 // 添加书籍
 router.use('/addBook',require('./addBook')());

 // 管理全部书籍
 router.use('/seeAllBook',require('./seeAllBook')());


 // 添加管理员
 router.use('/addAdmin',require('./addAdmin')());

 // 删除管理员
 router.use('/seeAllAdmin',require('./seeAllAdmin')());

 // 修改密码
  router.use('/changePass',require('./changePass')());

  // 广告位设置
  router.use('/ads',require('./ads')());

  // 消息设置
  router.use('/message',require('./message')());

  // 退出登录
  router.use('/logout',require('./logout.js')())
module.exports = router;
