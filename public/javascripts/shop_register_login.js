 function shop(url,data){
          $.ajax({
               url:url,
               type:"POST",
               data:data,
               success:function(data){
                  alert(data);
                  if(data=='登录成功！'){
                     window.location.href='/shop' ;
                  }
               },
               error:function(){

               }
          })
   }
  $(function(){
       <!-- 商家注册 -->
       $("#shopRegister").click(function(){
             shop('/register',{
              username:$('#registerEmail').val(),
              password:$("#registerPass").val()
             })
       })
        <!-- 商家登录 -->
       $("#shopSubmit").click(function(){
             shop('/login',{
              username:$('#loginEmail').val(),
              password:$("#loginPass").val()
             })
       })
  })