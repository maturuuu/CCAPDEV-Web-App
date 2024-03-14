var express = require('express');
var app = express()

const exphbs = require('express-handlebars');

//importing serverdata.js
const posts = require('./posts')

//setting handlebars
app.engine('hbs', exphbs());
app.set('view engine', 'hbs');

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

app.get('/userprofile', function(req, res){
    res.sendFile(__dirname + '/' + 'ViewUserProfile.html')
});

// app.get('/post', function(req, res){
//     res.sendFile(__dirname + '/' + 'post.html')
// });

//finds posts dynamically based on post id
app.get('/post/:postid', (req, res) => {
    const postid = parseInt(req.params.postid);
    const post = posts.find(post => post.id == postid);
    if(!post){
        res.status(404).send("Oops! That post doesn't exist!");
        return;
    }
    res.render('post', {post});
});

app.get('/postnonreg', function(req, res){
    res.sendFile(__dirname + '/' + 'post-nonReg.html')
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

app.get('/search', function(req, res){
    res.sendFile(__dirname + '/' + 'Search.html')
});

app.use(express.static(__dirname)); //allows use of static files like css

var server = app.listen(3000, function(){
    console.log("Web App running at port 3000")
});

