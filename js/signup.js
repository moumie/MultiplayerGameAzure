$(document).ready(function () {
   console.log('login.js file loaded');
   

   //Login button
    $("#reg-signupbtn").click(function(){
            var regUsername= $('#reg-username').val();
            var regPassword= $('#reg-password').val();
            var regFirstname= $('#reg-firstname').val();
            var regLastname= $('#reg-lastname').val();
            var regEmail= $('#reg-email').val();

            //alert(firstname+ "  "+password);
            console.log('regUsername:'+ regUsername);
            console.log('regPassword'+ regPassword);
            console.log('regFirstname:'+ regFirstname);
            console.log('regLastname:'+ regLastname);
            console.log('regEmail'+ regEmail);        
   
       
   //  User signup object
    var userRegData = {
        userName: regUsername,
        userPassword: regPassword,
        userFirstname: regFirstname,
        userLastname: regLastname,
        userEmail: regEmail
    };

    $.ajax({
        url: "/signup",
        type: "POST",
        dataType: "json",
        data: userRegData,
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

   
}); 