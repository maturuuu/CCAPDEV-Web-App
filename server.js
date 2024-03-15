var express = require('express');
var app = express()
const exphbs = require('express-handlebars');
const postlist = require('./serverdata');
const userlist = require('./userdata');

let currentuser = "@kibbleking"; // stores current user's username

app.engine('hbs', exphbs.engine());
app.set('view engine', 'hbs');

//default route to homepage
app.get('/', function(req, res){
    res.render('nonRegMainView', {post: postlist})
});


//add routes here
app.get('/register', function(req, res){
    currentuser = "@kibbleking" //logs in @kibbleking
    res.sendFile(__dirname + '/' + 'RegisterView.html')
});

app.get('/login', function(req, res){
    currentuser = "@kibbleking" //logs in @kibbleking
    res.sendFile(__dirname + '/' + 'LoginView.html')
});

app.get('/profile', function(req, res){
    const username = currentuser;
    const user = userlist.find(user => user.authorusername === username);
    if (!user) {
        res.status(404).send('Oopsie, you need to log in first!');
        return;
    }
    const userposts = postlist.filter(post => post.authorusername === username)
    res.render('viewMyProfile', {user: user, post: userposts});
})

app.get('/userprofile/:username', function(req, res){
    const username = req.params.username;
    const user = userlist.find(user => user.authorusername === username);
    if (!user) {
        res.status(404).send('Oopsie, user profile not found!');
        return;
    }
    const userposts = postlist.filter(post => post.authorusername === username)
    const activeusername = currentuser;
    const activeuser = userlist.find(activeuser => activeuser.authorusername === activeusername);
    res.render('regViewUserProfile', {user: user, post: userposts, activeuser: activeuser});
});

app.get('/editprofile', function(req, res){
    const username = currentuser;
    const user = userlist.find(user => user.authorusername === username);
    if (!user) {
        res.status(404).send('Oopsie, you need to log in first!');
        return;
    }
    res.render('editprofile', {user: user, layout: 'editprofile'});
});

app.get('/post/:postId', function(req, res) {
    const postId = parseInt(req.params.postId);
    const post = postlist.find(post => post.id === postId);
    if (!post) {
        res.status(404).send('Oopsie, post not found!');
        return;
    }
    res.render('post', { post: post });
});

app.get('/home/:username', function(req, res) {
    const username = req.params.username;
    const user = userlist.find(user => user.authorusername === username);
    if (!user) {
        res.status(404).send('Oopsie, user not found!');
        return;
    }
    res.render('regMainView', {user: user, post: postlist});
});

app.get('/postnonreg', function(req, res){
    res.sendFile(__dirname + '/' + 'post-nonReg.html')
});

app.get('/newpost', function(req, res){
    res.sendFile(__dirname + '/' + 'new-post.html')
});

app.get('/editpost/:postId', function(req, res){
    const postId = parseInt(req.params.postId);
    const post = postlist.find(post => post.id === postId);
    if (!post) {
        res.status(404).send('Oopsie, post not found!');
        return;
    }
    res.render('editpost', {post: post, layout: 'editpost'});
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

