 <script>
    //<![CDATA[
    $(function () {
     alert("That is wonderful");
    //require node modules (see package.json)
      $('#btnlogin').on('keypress',function(){
           alert("That is wonderful Login pressed");

            var firstname= $('#fname').val();
            var lastname= $('#lname').val();
            var password= $('#passwd').val();
            var country= $('#cntry').val();
            
            console.log('firstname:'+ firstname);
            console.log('lastname:'+ lastname);
            console.log('password'+ password);
            console.log('country'+ country);           
        });

    });  
    //]]>
    </script>