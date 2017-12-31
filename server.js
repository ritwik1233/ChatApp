var express = require('express');
var app = express();
var path=require('path');
var http    = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var session = require('express-session');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27016/chatapp2');
require('./models/models')
var users=[];
var User=mongoose.model('User');
var email;
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(express.static('public'));
app.use(cookieParser());
app.use(session({
    secret: "fd34s@!@dfa453f3DF#$D&W",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: !true }
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
io.on('connection', function(socket) {
  console.log('new connection');
var dateFormat = require('dateformat');
	var now = dateFormat(new Date(), "dd/mm/yyyy,hh:MM:ss TT");
	var filedate=now.toString().substring(0,10);
	var filetime=now.toString().substring(11);
	
  socket.on('add-customer', function(customer) {
    io.emit('notification', {
      email: email,
      customer: customer,
      date:filedate,
      time:filetime
    });
    
  });
});
app.post('/post', function(req, res, next){
   console.log(req.body.email);
   console.log(req.body.password);
   req.session.email=req.body.email;
   email=req.session.email;
   console.log("session "+req.session.email);
   //sess.email=req.body.email;
   User.findOne({'email':req.body.email,'password':req.body.password}, function(err,data){
	if(err)
	{
		console.log("database error");
		res.send("error ");
	}
	else
	{
		
		if(data==null)
		{

			console.log("no user found");
			res.send("error");

		}
		else
		{
			if(data.email==req.body.email)
			{
				email=req.body.email;
				console.log("userfound");
				res.send("success");
			}
		}
	}
	

   }
   );
   
});
app.post('/register', function(req, res, next){
   console.log(req.body.username);
   console.log(req.body.email);
   console.log(req.body.password);
   var user=new User();
   user.username=req.body.username;
   user.email=req.body.email;
   user.password=req.body.password;
   user.save(function(err)
   {
   	if(err)
   	{
   		res.send("error");
   	}
   	else
   	{
   		console.log("database updated");
   		res.send("success");
   	}
   });
});


http.listen(3000, function() {
  console.log('Server listening on port 3000');
});
