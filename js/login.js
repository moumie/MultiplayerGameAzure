$(document).ready(function () {
   console.log('signup.js file loaded');
   

   //Login button
    $("#btnlogin").click(function(){
            var firstname= $('#username').val();
            var password= $('#password').val();
            
            //alert(firstname+ "  "+password);
            console.log('firstname:'+ firstname);
            console.log('password'+ password);
    
        /*
     $.ajax({
        url: "/users",
        type: "GET",
        dataType: "json",
        success: function (resJson) {
            $.each(resJson, function (i, user) {
                console.log(user);
            });
        },
        error: function (xhr, status) {
            console.log("Sorry, there was a problem!");
        }
    });  */     
       
        //  login a known user
    var userData = {
        email: firstname,
        password: password
    };
/*
    $.ajax({
        url: "/users",
        type: "POST",
        dataType: "json",
        data: userData,
        error: function (xhr, status) {
            console.log("Sorry, there was a problem!");
        },
        complete: function (xhr, status) {
            console.log(xhr);
            console.log("status "+status);
        }
    });
    */
    //window.location.href = '/about';
    //var url = "http://jquery4u.com";    
    //$(location).attr('href',url);
    // }); 
   
   /*
      $('#btnlogin').on('keypress',function(){
           alert("That is wonderful Login pressed");

            var firstname= $('#login-username').val();
            var lastname= $('#lname').val();
            var password= $('#passwd').val();
            var country= $('#cntry').val();
            
            console.log('firstname:'+ firstname);
            console.log('lastname:'+ lastname);
            console.log('password'+ password);
            console.log('country'+ country);           
        });
    */
 });  
    //]]>
   /* 
   //Signup button
   //require node modules (see package.json)
    $("#btnlogin").click(function(){
            var firstname= $('#username').val();
            var password= $('#password').val();
            
            //alert(firstname+ "  "+password);
            console.log('firstname:'+ firstname);
            console.log('password'+ password);
    
    
       
        //  login a known user
    var userData = {
        email: firstname,
        password: password
    };

    $.ajax({
        url: "/users",
        type: "POST",
        dataType: "json",
        data: userData,
        error: function (xhr, status) {
            console.log("Sorry, there was a problem!");
        },
        complete: function (xhr, status) {
            console.log(xhr);
            console.log("status "+status);
        }
    });
   
   
 
 });  
    //]]>
   */
}); 