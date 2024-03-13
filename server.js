var express = require('express');
var app = express()


//default route to homepage
app.get('/', function(req, res){
    res.sendFile(__dirname + '\\' + 'nonRegMainView.html')
});

//add routes here
app.get('/home', function(req, res){
    res.sendFile(__dirname + '/' + 'RegMainView.html')
});

app.get('/register', function(req, res){
    res.sendFile(__dirname + '/' + 'RegisterView.html')
});

app.get('/login', function(req, res){
    res.sendFile(__dirname + '/' + 'LoginView.html')
});

app.get('/profile', function(req, res){
    res.sendFile(__dirname + '/' + 'RegViewUser.html')
})

app.get('/post', function(req, res){
    res.sendFile(__dirname + '/' + 'post.html')
});

app.get('/editpost', function(req, res){
    res.sendFile(__dirname + '/' + 'edit-post.html')
});

app.get('/editreply', function(req, res){
    res.sendFile(__dirname + '/' + 'edit-reply.html')
});

app.get('/newreply', function(req, res){
    res.sendFile(__dirname + '/' + 'new-reply.html')
});

app.use(express.static(__dirname)); //allows use of static files like css

var server = app.listen(3000, function(){
    console.log("Web App running at port 3000")
});

