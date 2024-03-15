let postlist = [
    {
        id: 1,
        authorid: 1,
        authorname: "KingOfKibble",
        authorusername: "@kibbleking",
        authorimg: "/images/profilepic1.jpg",
        title: "This is my user-generated post HOORAY YAYAYAYYAYA",
        content: "User generated content! Hooray!",
        timestamp: "Just now",
        isedited: "edited",
        comments: [
            {
                id: 11,
                authorid: 2,
                authorname: "TotallyTurkey",
                authorusername: "@carnivroar",
                authorimg: "/images/profilepic2.jpg",
                content: "This is my user-generated reply to the post :))",
                isedited: "edited",
                isreply: false
            },
            {
                id: 12,
                authorid: 1,
                authorname: "KingOfKibble",
                authorusername: "@kibbleking",
                authorimg: "/images/profilepic1.jpg",
                content: "this is a reply to THAT reply MUWAHAHAHA",
                isedited: "",
                isreply: true
            },
            {
                id: 13,
                authorid: 3,
                authorname: "SquirrelThe3RD",
                authorusername: "@thegreatthirdwoof",
                authorimg: "/images/profilepic3.jpg",
                content: "This should be at the very bottom yay",
                isedited: "",
                isreply: false
            }
        ]
    },
    {
        id: 2,
        authorid: 2,
        authorname: "TotallyTurkey",
        authorusername: "@carnivroar",
        authorimg: "/images/profilepic2.jpg",
        title: "I am the second author, and this is MY user-generated post",
        content: "DAMN SON WHERE'D YOU FIND THIS?",
        timestamp: "1 hour ago",
        isedited: "",
        comments: [
            {
                id: 21,
                authorid: 2,
                authorname: "TotallyTurkey",
                authorusername: "@carnivroar",
                authorimg: "/images/profilepic2.jpg",
                content: "LEMAO",
                isedited: "edited",
                isreply: false
            },
            {
                id: 22,
                authorid: 1,
                authorname: "KingOfKibble",
                authorusername: "@kibbleking",
                authorimg: "/images/profilepic1.jpg",
                content: "BORK BORK BORKEM",
                isedited: "",
                isreply: true
            },
        ]
    },
    {
        id: 3,
        authorid: 1,
        authorname: "KingOfKibble",
        authorusername: "@kibbleking",
        authorimg: "/images/profilepic1.jpg",
        title: "I am kibbleking and i have made a NEW POST!",
        content: "I like squirrels do you like squirrels hehe",
        timestamp: "Yesterday",
        isedited: "",
        comments: [
            {
                id: 31,
                authorid: 2,
                authorname: "TotallyTurkey",
                authorusername: "@carnivroar",
                authorimg: "/images/profilepic2.jpg",
                content: "interesting post my guy",
                isedited: "edited",
                isreply: false
            },
            {
                id: 32,
                authorid: 1,
                authorname: "KingOfKibble",
                authorusername: "@kibbleking",
                authorimg: "/images/profilepic1.jpg",
                content: "ACORN.",
                isedited: "",
                isreply: true
            },
            {
                id: 33,
                authorid: 3,
                authorname: "SquirrelThe3RD",
                authorusername: "@thegreatthirdwoof",
                authorimg: "/images/profilepic3.jpg",
                content: "dude ur crazy for acorns huh",
                isedited: "",
                isreply: true
            },
            {
                id: 34,
                authorid: 1,
                authorname: "KingOfKibble",
                authorusername: "@kibbleking",
                authorimg: "/images/profilepic1.jpg",
                content: "Why yes my good sir I am.",
                isedited: "edited",
                isreply: true
            }
        ]
    },
    {
        id: 4,
        authorid: 3,
        authorname: "SquirrelThe3RD",
        authorusername: "@thegreatthirdwoof",
        authorimg: "/images/profilepic3.jpg",
        title: "Ateneo bulok pare",
        content: "SHEEESH ANIMO GREEN I LOVE YOU",
        timestamp: "1 hour ago",
        isedited: "edited",
        comments: [
            {
                id: 41,
                authorid: 1,
                authorname: "KingOfKibble",
                authorusername: "@kibbleking",
                authorimg: "/images/profilepic1.jpg",
                content: "No dlsu bulok pare",
                isedited: "",
                isreply: false
            },
            {
                id: 42,
                authorid: 1,
                authorname: "KingOfKibble",
                authorusername: "@kibbleking",
                authorimg: "/images/profilepic1.jpg",
                content: "lol",
                isedited: "",
                isreply: false
            },
            {
                id: 43,
                authorid: 2,
                authorname: "TotallyTurkey",
                authorusername: "@carnivroar",
                authorimg: "/images/profilepic2.jpg",
                content: "I think i like peanuts",
                isedited: "",
                isreply: true
            }
        ]
    }
];
//add likes later, make it so if current user id matches author id, you can edit.

module.exports = postlist;