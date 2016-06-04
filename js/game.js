$(document).ready(function () {
  //Declarations  
  var socket = io();   
  var answer_chosen="";
  var answer_correct="";
  var CURR_USERID="";
  var CURR_QUESTIONID="";
  var CURR_RESULT="";
  
$(function () {
    $('.list-group.checked-list-box .list-group-item').each(function () {
        
        // Settings
        var $widget = $(this),
            $checkbox = $('<input type="checkbox" class="hidden" />'),
            color = ($widget.data('color') ? $widget.data('color') : "primary"),
            style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
            settings = {
                on: {
                    icon: 'glyphicon glyphicon-check'
                },
                off: {
                    icon: 'glyphicon glyphicon-unchecked'
                }
            };
            
        $widget.css('cursor', 'pointer')
        $widget.append($checkbox);

        // Event Handlers
        $widget.on('click', function () {
            
            // BEGIN ADD SINGLE SELECTION
            // Clear all other boxes
            $('.list-group.checked-list-box .list-group-item').each(function () {
            $(this).removeClass('list-group-item-primary active');
            $(this).find('.state-icon').removeClass().addClass('state-icon glyphicon glyphicon-unchecked');
            $(this).find('input').prop('checked', false);
            });
            // END ADD SINGLE SELECTION
            
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });
          

        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Set the button's state
            $widget.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $widget.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$widget.data('state')].icon);

            // Update the button's color
            if (isChecked) {
                $widget.addClass(style + color + ' active');
            } else {
                $widget.removeClass(style + color + ' active');
            }
        }

        // Initialization
        function init() {
            
            if ($widget.data('checked') == true) {
                $checkbox.prop('checked', !$checkbox.is(':checked'));
            }
            
            updateDisplay();

            // Inject the icon if applicable
            if ($widget.find('.state-icon').length == 0) {
                $widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
            }
        }
        init();
    });
    
    $('#btn-answer').on('click', function(event) {
        event.preventDefault(); 
        var result="";
        $("#check-list-box li.active").each(function(idx, li) {
            answer_chosen = $(li).text();
            
            //Getting current answer
            CURR_RESULT = answer_chosen;
            
            /*
            if ( answer_correct === answer_chosen)
                result ="RIGHT";
            else result ="WRONG";
            */
        });
        //$('#display-json').html(result);
        
        //Send answer to the server
         var answer = {     
            userId: CURR_USERID,
            questionId: CURR_QUESTIONID,
            result: CURR_RESULT
            };
       socket.emit('client_answer' ,answer);
        console.log('ANSWER SENT TO THE SERVER');

        
    });
});    
   console.log('about.js file loaded');
   
 var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
 };
 
   var username = getUrlParameter('username');
   var password = getUrlParameter('password');
  
   
    socket.on('connect', function() {
        
    socket.emit('username', username);
        console.log('Room = '+password);
        
        //Authenticate the user
        var user = {     
            userEmail: username,
            userPassword: password
            };
       socket.emit('client_login' ,user);
   });
   
   //Get User ID after the authentication
    //get newly registered user credentials
        socket.on('server_login',function(userId){
            document.getElementById('loginid').innerHTML=userId;
            //Getting current user id
            CURR_USERID = userId;
        });
         
   
    //receive server_roomlist from server
    socket.on('server_username',function(content){
            //document.getElementById('newuser').innerHTML=content; 
    });
    
    
    //Login button
    $("#get-new-question").click(function(){
           // var firstname= $('#username').val();
            var password= $('#password').val();
           // console.log('firstname:'+ firstname);
            console.log('new question requested');
            socket.emit('client_question', "new_question");
      });
      
      //receive server_question from server
        socket.on('server_question',function(content){
        //Getting current question id
        CURR_QUESTIONID = content[0]['_id'];
        
        //Extracting question attributes
        console.log('Elementy: '+content['quest']);
        console.log('Elementy: '+content[0]['quest']);
        //document.getElementById('show_question').innerHTML=JSON.stringify(content);
        document.getElementById('show_quest').innerHTML=content[0]['quest'];
        document.getElementById('show_answer1').innerHTML=content[0]['answer1'];
        document.getElementById('show_answer2').innerHTML=content[0]['answer2'];
        document.getElementById('show_answer3').innerHTML=content[0]['answer3'];
        
        //===================================================
        //Creating correct answer
        var answer_index = "answer"+content[0]['answer'];
        answer_correct = content[0][answer_index];
        //====================================================
        
        
        console.log('anwser is: '+content[0][answer_index]); //random
        console.log('random: '+content[0]['random']); //random
        console.log('quest: '+content[0]['quest']); //quest
        console.log('answer: '+content[0]['answer']); //answer
        console.log('answer1: '+content[0]['answer1']); //answer 1
        console.log('answer2: '+content[0]['answer2']); //answer 2
        console.log('answer3: '+content[0]['answer3']); //answer 3
        console.log('chosen answer : '+answer); //answer 3
        //alert(data_array[0]);
        //var question = content.quest;
        //document.getElementById('show_quest').innerHTML=question;

        });
        
        
       //receive server_answer from server
        socket.on('server_answer',function(content){       
        document.getElementById('display-json').innerHTML=content['answer'];
        console.log('chosen answer1 : '+content.answer); //answer 1
        console.log('chosen answer2 : '+content.questionId); //answer 2
        });
 });  
    //]]>
