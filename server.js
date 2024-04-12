const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/LetThemCook')

var express = require('express');
var app = express()
const exphbs = require('express-handlebars');

const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const session = require('express-session');
const router = express.Router();

//database
const User = require("./models/User") //this is userlist
const Post = require("./models/Post") //this is postlist

app.use(session({
    secret: 'sec',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1814400000,
        secure: false,
        httpOnly: true 
    }
}));

global.currentuser = "@burkturk"; // stores current user's username
// kibbleking / burkturk

app.engine('hbs', exphbs.engine()); //without helpers
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json()); //added after



//mongoDB
app.get('/', async function(req, res){ //default route to homepage
    const posts = await Post.find({title: {$ne: null}})
    .populate('authorid')
    .populate('comments');  //populate the comments array

    posts.forEach(post => {
        post.likespositive = (post.likecount >= 0);
        post.timestamp = moment(post.timecreated).fromNow();
    });

    //get comment count including nested
    const postsWithCommentCount = posts.map(post => {
        return {
            ...post.toObject(),
            commentcount: 0
        };
    });
    postsWithCommentCount.forEach(post => {
        post.commentcount += post.comments.length;
        post.comments.forEach(nestedPost => {
            post.commentcount += nestedPost.comments.length;
        });
    });

    // const postsData = postsWithCommentCount.map(post => post.toObject());

    res.render('nonRegMainView', {post: postsWithCommentCount});
});

//mongoDB
app.get('/home/:username', async function(req, res) {
    const username = req.params.username;

    const user = await User.findOne({authorusername: username});
    if (!user) {
        res.status(404).send('Oopsie, ' + username + ' does not exist!');
        return;
    }

    const posts = await Post.find({title: {$ne: null}})
    .populate('authorid')
    .populate('comments');  //populate the comments array

    const userposts = posts.filter(post => post.authorid.authorusername === user.authorusername)

    posts.forEach(post => {
        post.likespositive = (post.likecount >= 0);
        post.timestamp = moment(post.timecreated).fromNow();
    });

    let userLikes = 0;
    userposts.forEach(post => {userLikes += post.likecount})
    
    //get comment count including nested
    const postsWithCommentCount = posts.map(post => {
        return {
            ...post.toObject(),
            commentcount: 0
        };
    });
    postsWithCommentCount.forEach(post => {
        post.commentcount += post.comments.length;
        post.comments.forEach(nestedPost => {
            post.commentcount += nestedPost.comments.length;
        });
    });

    const userData = user.toObject();
    // const postsData = posts.map(post => post.toObject());

    res.render('regMainView', {user: userData, post: postsWithCommentCount, activeuser: currentuser, userposts: userposts, likes: userLikes});
});

//html only
app.get('/register', function(req, res){
    console.log(req.sessionID);
    res.sendFile(__dirname + '/' + 'RegisterView.html')
});

// app.post('/submit-data', async function(req,res){
//     var usern = req.body.username;
//     var firstn = req.body.firstname;
//     var lastn = req.body.lastname;
//     var emai = req.body.email;
//     var passw = req.body.password;

//     try {
//         const hash = await bcrypt.hash(passw, 10);

//         User.create({
//             authorname: firstn + ' ' + lastn,
//             authorusername: usern,
//             authoremail: emai, 
//             authorpassword: hash, 
//             authorimg: "../images/blank.png",
//             authorbio: "",
//         });

//         //currentuser = usern;
//         req.session.currentuser = usern;
//         res.redirect('/home/:username');

//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Error registering user");
//     }
// });

//html only
app.get('/login', function(req, res){
    console.log(req.sessionID);
    res.sendFile(__dirname + '/' + 'LoginView.html')
});


// app.post('/loggingin', async function(req, res) {
//     try {
//         var usern = req.body.username;
//         var passw = req.body.password;

//         const user = await User.findOne({ authorusername: usern });

//         if (user) {
//             const passwordMatch = await bcrypt.compare(passw, user.authorpassword);

//             if (passwordMatch) { 
//                 //currentuser = usern;
//                 req.session.currentuser = usern;
//                 console.log(req.session.currentuser);
//                 res.redirect('/home/:username');
//             } else {
//                 res.redirect('/login');
//             }
//         } else {
//             res.redirect('/login');
//         }
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// // checkers for data in login/register
// app.post('/check-username', async function(req, res) {
//     const username = req.body.username;

//     const user = await User.findOne({ authorusername: username });
//     if (user) {
//         res.json({ taken: true });
//     } else {
//         res.json({ taken: false });
//     }
// });

// app.post('/check-email', async function(req, res) {

//     const email = req.body.email;
//     const user = await User.findOne({ authoremail: email });
//     if (user) {
//         res.json({ taken: true });
//     } else {
//         res.json({ taken: false });
//     }
// });

// app.post('/check-password', async function(req, res) {
//     const usern = req.body.username;
//     const passw = req.body.password;

//     try {
//         const user = await User.findOne({ authorusername: usern });

//         if (user) {
//             const passwordMatch = await bcrypt.compare(passw, user.authorpassword);

//             if (passwordMatch) {
//                 res.json({ valid: true });
//             } else {
//                 res.json({ valid: false }); 
//             }
//         } else {
//             res.json({ valid: false });
//         }
//     } catch (error) {
//         console.error('Error checking password:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });


//mongoDB
app.get('/profile', async function(req, res){
    const username = currentuser;

    const user = await User.findOne({authorusername: username});
    if (!user) {
        res.status(404).send('Oopsie, you need to log in as ' + username + ' first!');
        return;
    }

    const userposts = await Post.find({title: {$ne: null}})
    .populate('authorid')
    .populate('comments');
    const thisuserposts = userposts.filter(post => post.authorid.authorusername === user.authorusername);

    let userLikes = 0;
    thisuserposts.forEach(post => {
        userLikes += post.likecount
        post.timestamp = moment(post.timecreated).fromNow();
    })

    thisuserposts.forEach(post => {
        post.likespositive = (post.likecount >= 0);
    });

    //get comment count including nested
    const postsWithCommentCount = thisuserposts.map(post => {
        return {
            ...post.toObject(),
            commentcount: 0
        };
    });
    postsWithCommentCount.forEach(post => {
        post.commentcount += post.comments.length;
        post.comments.forEach(nestedPost => {
            post.commentcount += nestedPost.comments.length;
        });
    });

    const userData = user.toObject();
    // const userpostsData = thisuserposts.map(post => post.toObject());

    res.render('viewMyProfile', {user: userData, post: postsWithCommentCount, likes: userLikes});
})

//mongoDB
app.get('/userprofile/:username', async function(req, res){
    const username = req.params.username;
    const activeusername = currentuser;

    const user = await User.findOne({authorusername: username});
    if (!user) {
        res.status(404).send('Oopsie, ' + username + ' does not exist!');
        return;
    }

    const activeuser = await User.findOne({authorusername: activeusername});

    const userposts = await Post.find({title: {$ne: null}})
    .populate('authorid')
    .populate('comments');
    const thisuserposts = userposts.filter(post => post.authorid.authorusername === user.authorusername);
    const activeuserposts = userposts.filter(post => post.authorid.authorusername === activeuser.authorusername);

    thisuserposts.forEach(post => {
        post.likespositive = (post.likecount >= 0);
        post.timestamp = moment(post.timecreated).fromNow();
    });

    let thisuserLikes = 0;
    thisuserposts.forEach(post => {
        thisuserLikes += post.likecount
    })

    let activeuserLikes = 0;
    activeuserposts.forEach(post => {activeuserLikes += post.likecount})

    //get comment count including nested
    const postsWithCommentCount = thisuserposts.map(post => {
        return {
            ...post.toObject(),
            commentcount: 0
        };
    });
    postsWithCommentCount.forEach(post => {
        post.commentcount += post.comments.length;
        post.comments.forEach(nestedPost => {
            post.commentcount += nestedPost.comments.length;
        });
    });

    const userData = user.toObject();
    const activeuserData = activeuser.toObject();
    // const userpostsData = thisuserposts.map(post => post.toObject());
    const activeuserpostsData = activeuserposts.map(post => post.toObject());

    res.render('regViewUserProfile', {user: userData, post: postsWithCommentCount, activeuser: activeuserData, activeuserposts: activeuserpostsData, 
                                      thisuserlikes: thisuserLikes, activeuserlikes: activeuserLikes});
});

//mongoDB
app.get('/editprofile', async function(req, res){
    const username = currentuser;

    const user = await User.findOne({authorusername: username});
    if (!user) {
        res.status(404).send('User does not exist!');
        return;
    }

    const userData = user.toObject();

    res.render('editprofile', {user: userData, layout: 'editprofile'});
});

//mongoDB
app.get('/post/:postId', async function(req, res) {
    const postId = parseInt(req.params.postId);
    const activeuser = currentuser

    try{
        const post = await Post.findOne({id:postId})    //match the postId in the URL
        .populate('authorid')   //populate the author field
        .populate('comments')  //populate the comments array
        .populate({path: "comments", populate: {path:"authorid"}}) //populate the author field of each comment
        .populate({path: "comments", populate: {path:"comments", populate: {path:"authorid"}}}) //populate the comments of each comment and their authors

        if (!post) {
            res.status(404).send('Oopsie, post not found!');
            return;
        }

        let isActiveuser = false;
        if(post.authorid.authorusername === currentuser){
            isActiveuser = true;
        }

        post.comments.forEach(comment => {
            comment.isAuthor = (comment.authorid.authorusername === currentuser);
            comment.likespositive = (comment.likecount >= 0);
            comment.isReply = false;

            comment.comments.forEach(nestedComment => {
                    nestedComment.isReply = true;
                    nestedComment.isAuthor = (nestedComment.authorid.authorusername === currentuser);
            }); 
        });

        post.likespositive = (post.likecount >= 0);

        post.timestamp = moment(post.timecreated).fromNow();

        const postData = post.toObject();

        res.render('post', { post: postData, isActiveuser: isActiveuser, activeuser: activeuser});
    } 
    
    catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error - post retrieval');
    }
});

//CRUD
app.post('/upvote/:postId', async function(req, res){
    const postId = parseInt(req.params.postId);

    const post = await Post.findOne({id: postId});

    post.likecount += 1;
    await post.save();
});

//CRUD
app.post('/downvote/:postId', async function(req, res){
    const postId = parseInt(req.params.postId);

    const post = await Post.findOne({id: postId});

    post.likecount -= 1;
    await post.save();
});

//CRUD
app.delete('/deletepost/:postId', async function(req, res) {
    const postId = parseInt(req.params.postId);

    const postToDelete = await Post.findOne({id: postId});

    await Post.deleteOne({ _id: postToDelete._id });
    console.log("post removed!");
});

//CRUD
app.delete('/deletecomment/:postId', async function(req, res) {
    const postId = parseInt(req.params.postId);

    const postToDelete = await Post.findOne({id: postId});
    const parentPost = await Post.findOne({comments: postToDelete._id});
    if (!parentPost) {
        return res.status(404).send("Parent post not found");
    }

    parentPost.comments.pull(postToDelete._id);
    await parentPost.save();

    await Post.deleteOne({ _id: postToDelete._id });
    console.log("comment removed!");
});

//mongoDB
app.get('/newpost', async function(req, res){
    const currentid = await Post.countDocuments() + 1;

    const activeuser = await User.findOne({authorusername: currentuser});
    const activeuserData = activeuser.toObject();

    res.render('newpost', {activeuser: activeuserData, newid: currentid, layout: 'editpost'})
});

//CRUD
app.post('/createpost', async function(req, res){
    Post.create(req.body);
});

//mongoDB
app.get('/editpost/:postId', async function(req, res){
    const postId = parseInt(req.params.postId);
    const activeuser = currentuser

    const post = await Post.findOne({id:postId});
    if (!post) {
        res.status(404).send('Oopsie, post not found!');
        return;
    }

    const postData = post.toObject();

    res.render('editpost', {post: postData, activeuser: activeuser, layout: 'editpost'});
});

//CRUD
app.post('/modifypost/:postId', async function(req, res){
    const postId = parseInt(req.params.postId);
    const newTitle = req.body.title;
    const newContent = req.body.content;
    const newIsEdited = req.body.isEdited;

    const post = await Post.findOne({id: postId});
    post.title = newTitle;
    post.content = newContent;
    post.isEdited = newIsEdited;

    await post.save();
    console.log("post modified!");
});

//mongoDB
app.get('/newreply/:postId', async function(req, res){
    const postId = parseInt(req.params.postId);
    const currentid = await Post.countDocuments() + 1;

    const activeuser = await User.findOne({authorusername: currentuser});

    const post = await Post.findOne({id:postId});
    if (!post) {
        res.status(404).send('Oopsie, post not found!');
        return;
    }

    const postData = post.toObject();
    const activeuserData = activeuser.toObject();

    res.render('newreply', {post: postData, activeuser: activeuserData, newid: currentid, layout: 'newreply'});
});

//CRUD
app.post('/createreply/:postId', async function(req, res){
    const newReply = await Post.create(req.body);

    const postId = parseInt(req.params.postId);
    const parentPost = await Post.findOne({id: postId});

    //add newReply to the comments field of parentPost
    parentPost.comments.push(newReply._id);
    await parentPost.save();
});

//mongoDB
app.get('/editreply/:postId', async function(req, res){
    const postId = parseInt(req.params.postId);
    const activeuser = currentuser

    const post = await Post.findOne({id:postId});
    if (!post) {
        res.status(404).send('Oopsie, post not found!');
        return;
    }

    postData = post.toObject();

    res.render('editreply', {post: postData, activeuser: activeuser, layout: 'newreply'});
});

//CRUD
app.post('/modifycomment/:postId', async function(req, res){
    const postId = parseInt(req.params.postId);
    const newContent = req.body.content;
    const newIsEdited = req.body.isEdited;

    const post = await Post.findOne({id: postId});
    post.content = newContent;
    post.isEdited = newIsEdited;

    await post.save();
    console.log("comment modified!");
});

app.get('/postnonreg', function(req, res){
    res.sendFile(__dirname + '/' + 'post-nonReg.html')
});

app.get('/search', function(req, res){
    res.sendFile(__dirname + '/' + 'Search.html')
});

app.use(express.static(__dirname)); //allows use of static files like css

var server = app.listen(3000, function(){
    console.log("Web App running at port 3000")
});

