let postlist = [
    {
        id: 1,
        authorid: 1,
        title: "This is my user-generated post",
        content: "User generated content! Hooray!",
        timestamp: "Placeholder",
        isedited: "edited",
        comments: [
            {
                id: 11,
                authorid: 2,
                content: "This is my user-generated reply to the post :))",
                isedited: "edited",
                isreply: false
            },
            {
                id: 12,
                authorid: 1,
                content: "this is a reply to THAT reply MUWAHAHAHA",
                isedited: "",
                isreply: true
            },
        ]
    }
];
//add likes later, make it so if current user id matches author id, you can edit.

module.exports = postlist;