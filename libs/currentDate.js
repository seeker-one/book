var oDate=new Date();

var year=oDate.getFullYear();
var month=oDate.getMonth()+1;
var date=oDate.getDate();

var hour=oDate.getHours();
var min=oDate.getMinutes();
var sec=oDate.getSeconds();

var currentDate=year+'-'+month+'-'+date+' '+hour+':'+min+':'+sec;
module.exports=currentDate;


