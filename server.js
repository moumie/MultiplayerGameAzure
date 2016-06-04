var express = require("express");
var app = express();
var http = require('http').createServer(app)
var io = require('socket.io')(http);
var port = process.env.PORT || 1337;
var router = express.Router();
var bodyParser  =   require("body-parser");
//var mongo = require('mongodb').MongoClient;
//var mongo = require('./db.js');
var path = __dirname + '/views/';
var pathdbuser = __dirname + '/models/user.js';
var pathdbquestion = __dirname + '/models/question.js';
var pathdbpeople = __dirname + '/models/people.js';
var pathscore = __dirname + '/models/score.js';
var pathmongo = __dirname + '/models/mongo.js';

var MONGODB_DATABASE_URL='mongodb://localhost:27017/test';

//mongoose.createConnection(MONGODB_DATABASE_URL);
var userOp = require(pathdbuser);
var questionOp = require(pathdbquestion);
var peopleOp = require(pathdbpeople);
var scoreOp = require(pathscore);
var mongoOp = require(pathmongo);

//list of users online
var userOnlineList = new Object(); 

app.use('/htmlfiles',express.static(__dirname + '/views'));
app.use('/jsfiles',express.static(__dirname + '/js'));
app.use('/modulefiles',express.static(__dirname + '/node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));



console.log("Dirname" + __dirname);
console.log("Dirname views " + __dirname+ '/views/');

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});


router.get("/game",function(req,res){
  res.sendFile(path + "game.html");
});


router.get("/about",function(req,res){
  res.sendFile(path + "about.html");
});

router.get("/contact",function(req,res){
  res.sendFile(path + "contact.html");
});

router.get("/hello",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});


/*
 * 
 * ========================== Begin : QUESTION  ==============================
 * 
 */

//1 : GET /questions – Return all question from MongoDB
router.route("/questions")
    .get(function(req,res){
        var response = {};
        questionOp.find({},function(err,data){
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
    
//2 : POST /question – Add new question in MongoDB.

     .post(function(req,res){
        var db = new questionOp();
        var response = {};
        // fetch email and password from REST request.
        // Add strict validation when you use this in Production.
        db.quest = req.body.quest; 
        // Hash the password using SHA1 algorithm.
        db.answer = req.body.answer;// require('crypto')
                          //.createHash('sha1')
                          //update(req.body.password)
                         // .digest('base64');
        db.save(function(err){
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "Question Data added"};
            }
            res.json(response);
        });
    })
    
//3: GET /question/:id – Return Question with matched ID.
router.route("/questions/:id")
    .get(function(req,res){
        var response = {};
        questionOp.findById(req.params.id,function(err,data){
        // This will run Mongo Query to fetch data based on ID.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    });


/*
 * 
 * ========================== End : QUESTION  ==============================
 * 
 */


/*
 * Begin : SIGNUP
 */
//1 : GET /users – Return all Users from MongoDB
router.route("/signup")
        .post(function(req,res){
        var db = new userOp();
        var response = {};
        db.userName = req.body.userName; 
        db.userPassword = req.body.userPassword;// require('crypto')
        db.userFirstname = req.body.userFirstname; 
        db.userLastname = req.body.userLastname; 
        db.userEmail = req.body.userEmail; 

        db.save(function(err){
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "Data added"};
            }
            res.json(response);
        });
    });
/*
 * End : SIGNUP
 */


/*
 * 
 * ========================== Begin : USER  ==============================
 * 
 */

//1 : GET /users – Return all Users from MongoDB
router.route("/users")
    .get(function(req,res){
        var response = {};
        userOp.find({},function(err,data){
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })


//2 : POST /users – Add new user in MongoDB.

//route() will allow you to use same path for different HTTP operation.
//So if you have same URL but with different HTTP OP such as POST,GET etc
//Then use route() to remove redundant code.
    .post(function(req,res){
        var db = new userOp();
        var response = {};
        // fetch email and password from REST request.
        // Add strict validation when you use this in Production.
        db.userEmail = req.body.email; 
        // Hash the password using SHA1 algorithm.
        db.userPassword = req.body.password;// require('crypto')
                          //.createHash('sha1')
                          //update(req.body.password)
                         // .digest('base64');
        db.save(function(err){
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "Data added"};
            }
            res.json(response);
        });
    });

//3: GET /users/:id – Return User with matched ID.
router.route("/users/:id")
    .get(function(req,res){
        var response = {};
        userOp.findById(req.params.id,function(err,data){
        // This will run Mongo Query to fetch data based on ID.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
    
 //4 : PUT /users/:id – Update users information.
 .put(function(req,res){
        var response = {};
        // first find out record exists or not
        // if it does then update the record
        userOp.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
            // we got data from Mongo.
            // change it accordingly.
                if(req.body.email !== undefined) {
                    // case where email needs to be updated.
                    data.userEmail = req.body.email;
                }
                if(req.body.password !== undefined) {
                    // case where password needs to be updated
                    data.userPassword = req.body.password;
                }
                // save the data
                data.save(function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error updating data"};
                    } else {
                        response = {"error" : false,"message" : "Data is updated for "+req.params.id};
                    }
                    res.json(response);
                })
            }
        });
    })
    
    //5 : DELETE /users/:id – Delete particular user.
     .delete(function(req,res){
        var response = {};
        // find the data
        userOp.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                // data exists, remove it.
                userOp.remove({_id : req.params.id},function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error deleting data"};
                    } else {
                        response = {"error" : true,"message" : "Data associated with "+req.params.id+"is deleted"};
                    }
                    res.json(response);
                });
            }
        });
    });
  /*
 * 
 * ========================== End : USER  ==============================
 * 
 */  
    
app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

/*
app.listen(3000,function(){
  console.log("Live at Port 3000");
  
});
http.listen(3001);
*/
 console.log("-----------------docs---------------");

    
http.listen(port, function () {
  console.log('Server listening at port %d', port);
});
//Establishing connection to client and disconnecting
io.sockets.on('connection', function(socket){
    console.log('Connected to a new client');

  //Server receives new login credentials (userEmail, userPassword) from a client 
    socket.on('client_login',function(msg){
    
    //receive data and room
     console.log('User email: '+msg.userEmail + "User password: "+msg.userPassword);
     
    //Returning the id of the new user to the client
    userOp.findOne({userEmail:msg.userEmail, userPassword:msg.userPassword},function(err,data){
     if(err) {
              socket.emit('server_login',"Error occured");
              console.log('Error 0 : '+ err);
       } else {
          
        if (data) {
            console.log('Auth 0 : '+ data.userEmail);
            console.log('Auth 1 : '+ data.userPassword);
            console.log('Auth 2 : '+ data._id);
            
            //Add user in the list
            userOnlineList[data._id]=data.userEmail;
            
            //Send to client:
            socket.emit('server_login',data._id);
            
            //Emitting the list of users' online
            io.emit('server_useronlinelist',userOnlineList);
            
            console.log('User list : '+ userOnlineList);
         }else{
             
            console.log('Empty object: no match found');
            
            //Authentication fails, no match found message sent:
            socket.emit('server_login', 'no match found');
         } 
         
       }
    }); 
    });
    
    //Getting chosen answer and updating the database
    socket.on('client_answer', function(answerdata) {
            console.log('Userid : '+ answerdata.userId);
            console.log('Questionid : '+ answerdata.questionId);
            console.log('Result : '+ answerdata.result);
            
            //Comparing the user answer
             //Returning the id of the new user to the client
            questionOp.findOne({_id:answerdata.questionId},function(err,data){
              //Authenticate the user
            //Send answer to the client
            var SERV_USERID=answerdata.userId;
            var SERV_QUESTIONID=answerdata.questionId;
            var SERV_RESULT="";
            
            //Extracting the right answer
            var suffix = data.answer;
            var rightanswer= data["answer"+suffix];
            console.log('Answer Index : '+ suffix);
            console.log('Answer WWW : '+ rightanswer);

            
             if(err) {
                      //socket.emit('server_login',"Error occured");
                      console.log('Error 0 : '+ err);
               } else {

                if (data) {
                    if(rightanswer===answerdata.result){
                        SERV_RESULT = "RIGHT";
                        var answer = {     
                        userId: SERV_USERID,
                        questionId: SERV_QUESTIONID,
                        answer: SERV_RESULT
                        };
                         //Send to client:
                         socket.emit('server_answer',answer);
                         
                         //Update the database
                         score(SERV_USERID, SERV_QUESTIONID, 1);
                         console.log('ANS 1 '+ rightanswer);

                    }else{
                        SERV_RESULT = "WRONG";
                        var answer = {     
                        userId: SERV_USERID,
                        questionId: SERV_QUESTIONID,
                        answer: SERV_RESULT
                        };
                         //Send to client:
                         socket.emit('server_answer',answer);
                         //Update the database
                         score(SERV_USERID, SERV_QUESTIONID, 0);
                         console.log('ANS 2 '+ rightanswer);

                    }
                    console.log('Auth 0 : '+ data.userEmail);
                 }else{

                    console.log('Empty object: no match found');

                    //correct fails, no match found message sent:
                    socket.emit('server_answer', 'no match found');
                 } 

               }
            }); 
            
          });

   //Dispatch random questions to all players
    socket.on('client_question', function(data) {
            console.log('Question received');
            questionDispatcher();
            console.log('Question dispatched');
          });
    
    
    //Error detection and logging
    socket.on('error', function(err) {
        console.log('Error!', err);
    });
    
    //Subscription to a room/group
    socket.on('username', function(data) { 
        console.log('Username is : ', data);
        var newuser = "the new user is :"+data
        io.sockets.emit('server_username', newuser);
    });
    
    //Score insertion
    function score(uid, qid, sc){
        var db = new scoreOp();
        db.userid=uid;
        db.questionid=qid;
        db.score=sc;
        db.save(function(err){
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
        if(err) {
                console.log("Error adding data");
               } else {
                console.log("Score data added");
             }
        });
    }
    
    //Question dispatcher 
    function questionDispatcher(){
     //Getting a random question
    var random = Math.random();
    console.log("Random nummer"+ random); // 1 element 
    questionOp.find({ "random": { $lt: random }}, function (err, result) {    
         //console.log("Random gt docs"+ result); 
           io.sockets.emit('server_question', result);
         
         if (result === null) {
         questionOp.find({ "random": { $gt: random }}, function (err, result) {
         
         io.sockets.emit('server_question', result);

          
         }).limit(1);
         }
    }).limit(1);
}
    
});


