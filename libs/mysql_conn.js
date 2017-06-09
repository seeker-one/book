const  mysql=require('mysql');
module.exports=function(){
   return mysql.createPool({
	     host:'localhost',
		 port:3306,
		 user:'root',
		 password:'199698',
		 database:'db_bookmanage',
		 multipleStatements: true 
    })
}
