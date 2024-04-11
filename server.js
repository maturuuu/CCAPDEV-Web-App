const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/LetThemCook')

var express = require('express');
var app = express()
const exphbs = require('express-handlebars');

// mco2 arrays
// const postlist = require('./serverdata');
// const userlist = require('./userdata');

//database
const User = require("./models/User") //this is userlist
const Post = require("./models/Post") //this is postlist

let currentuser = "@kibbleking"; // stores current user's username

app.engine('hbs', exphbs.engine()); //without helpers
app.set('view engine', 'hbs');


//collection retrieval via console
// User.find({})
//     .exec()
//     .then(posts => {
//         console.log('Users:', posts);
//     })
//     .catch(err => {
//         console.error('Error:', err);
//     });
// Post.find({})
//     .exec()
//     .then(posts => {
//         console.log('Posts:', posts);
//     })
//     .catch(err => {
//         console.error('Error:', err);
//     });

//Create user and post
async function createData() {
// const testUser = await User.create({
//     authorname: "db author",
//     authorusername: "@db1stperson",
//     authorimg: "/images/profilepic1.jpg",
//     authorbio: "This is my bio",
//     postcount: 3,
//     likecount: 69
// })

// const testPost = await Post.create({
//     id: 5,
//     authorid: testUser._id,
//     title: "This is my database test post!",
//     content: "If the database is working correctly, and the handlebars too, this should be visible in the post :))",
//     timestamp: "An hour ago", //consider changing to Date later
//     isEdited: true,
//     comments: [],
//     isReply: null
// })

// const testComment = await Post.create({
//     id: 6,
//     authorid: testUser._id,
//     title: "This is a test comment",
//     content: "And I hope it is visible too!",
//     timestamp: "Just now", //consider changing to Date later
//     isEdited: false,
//     comments: [],
//     isReply: false
// })

// const testPost = await Post.findOne({id: 5})
// const testComment = await Post.findOne({id: 6})

// await Post.findOneAndUpdate(
//     { _id: testPost._id }, // Filter for the document to update
//     { $push: { comments: testComment._id } } // Update operation using $push
// )

const thisPost = await Post.findOne({id: 5}).populate("authorid").populate("comments").populate({path: "comments", populate: {path:"authorid"}})
console.log(thisPost)
}

createData();




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

// app.get('/post/:postId', function(req, res) {
//     const postId = parseInt(req.params.postId);
//     const post = postlist.find(post => post.id === postId);
//     if (!post) {
//         res.status(404).send('Oopsie, post not found!');
//         return;
//     }
    
//     let activeuser;
//     if (post.authorusername === currentuser){
//         activeuser = true;
//     }
    
//     res.render('post', { post: post , activeuser: activeuser});
// });

app.get('/post/:postId', async function(req, res) {
    const postId = parseInt(req.params.postId);

    try{
        const post = await Post.findOne({id:postId})    //match the postId in the URL
        .populate('authorid')   //populate the author field
        .populate('comments')  //populate the comments array
        .populate({path: "comments", populate: {path:"authorid"}});

        if (!post) {
            res.status(404).send('Oopsie, post not found!');
            return;
        }

        let activeuser = false;
        if(post.authorid.authorusername === currentuser){
            activeuser = true;
        }

        const postData = post.toObject();

        res.render('post', { post: postData , activeuser: activeuser});
    } 
    
    catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error - post retrieval');
    }
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

app.get('/newreply/:postId', function(req, res){
    const postId = parseInt(req.params.postId);
    const post = postlist.find(post => post.id === postId);
    if (!post) {
        res.status(404).send('Oopsie, post not found!');
        return;
    }
    res.render('newreply', {post: post, layout: 'newreply'});
});

app.get('/search', function(req, res){
    res.sendFile(__dirname + '/' + 'Search.html')
});

app.use(express.static(__dirname)); //allows use of static files like css

var server = app.listen(3000, function(){
    console.log("Web App running at port 3000")
});

