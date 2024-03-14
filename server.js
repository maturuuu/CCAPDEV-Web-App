var express = require('express');
var app = express()
const exphbs = require('express-handlebars');
const postlist = require('./serverdata');

app.engine('hbs', exphbs.engine());
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

app.get('/post/:postId', function(req, res) {
    const postId = parseInt(req.params.postId);
    const post = postlist.find(post => post.id === postId);
    if (!post) {
        res.status(404).send('Oopsie, post not found!');
        return;
    }
    res.render('post', { post: post });
});

//handlebars for user main views
// app.get('/:username', function(req, res) {
//     const username = req.params.username;
//     const user = userlist.find(user => user.username === username);
//     if (!user) {
//         res.status(404).send('Oopsie, post not found!');
//         return;
//     }
//     res.render('mainviews', { mainviews: user });
// });

// app.get('/post', function(req, res){
//     res.render('post', {post: postlist});
// });

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

