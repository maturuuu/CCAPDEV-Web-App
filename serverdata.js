let postlist = [
    {
        id: 1,
        authorid: 1,
        authorname: "User-generated Author",
        authorimg: "/images/profilepic1.jpg",
        title: "This is my user-generated post HOORAY YAYAYAYYAYA",
        content: "User generated content! Hooray!",
        timestamp: "Placeholder",
        isedited: "edited",
        comments: [
            {
                id: 11,
                authorid: 2,
                authorname: "User-generated 2nd Author",
                authorimg: "/images/profilepic2.jpg",
                content: "This is my user-generated reply to the post :))",
                isedited: "edited",
                isreply: false
            },
            {
                id: 12,
                authorid: 1,
                authorname: "User-generated Author",
                authorimg: "/images/profilepic1.jpg",
                content: "this is a reply to THAT reply MUWAHAHAHA",
                isedited: "",
                isreply: true
            },
        ]
    },
    {
        id: 2,
        authorid: 2,
        authorname: "User-generated 2nd Author",
        authorimg: "/images/profilepic2.jpg",
        title: "I am the second author, and this is MY user-generated post",
        content: "DAMN SON WHERE'D YOU FIND THIS?",
        timestamp: "Placeholder",
        isedited: "",
        comments: [
            {
                id: 11,
                authorid: 2,
                authorname: "User-generated 2nd Author",
                authorimg: "/images/profilepic2.jpg",
                content: "This is my user-generated reply to the post :))",
                isedited: "edited",
                isreply: false
            },
            {
                id: 12,
                authorid: 1,
                authorname: "User-generated Author",
                authorimg: "/images/profilepic1.jpg",
                content: "this is a reply to THAT reply MUWAHAHAHA",
                isedited: "",
                isreply: true
            },
        ]
    }
];
//add likes later, make it so if current user id matches author id, you can edit.

module.exports = postlist;