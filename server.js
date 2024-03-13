var express = require('express');
var app = express()


//default route to homepage
app.get('/', function(req, res){
    res.sendFile(__dirname + '\\' + 'nonRegMainView.html')
});

//add routes here

app.get('/rmv', function(req, res){
    res.sendFile(__dirname + '//' + 'RegMainView.html')
});

app.get('/register', function(req, res){
    res.sendFile(__dirname + '//' + 'RegisterView.html')
});

app.get('/login', function(req, res){
    res.sendFile(__dirname + '//' + 'LoginView.html')
});

app.use(express.static(__dirname)); //allows use of static files like css

var server = app.listen(3000, function(){
    console.log("Web App running at port 3000")
});

