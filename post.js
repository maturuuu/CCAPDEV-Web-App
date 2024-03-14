//Post options menu
document.addEventListener("DOMContentLoaded", function() {
    const toggleMenuButton = document.getElementById("post-options-button");
    const optionsMenu = document.getElementById("post-options-menu");

    toggleMenuButton.addEventListener("click", function() {
        optionsMenu.classList.toggle("show"); // Toggle the 'show' class on the menu
    });
});

//comment options menu
document.addEventListener("DOMContentLoaded", function() {
    const toggleMenuButtons = document.querySelectorAll(".comment-options-button");
    const optionsMenus = document.querySelectorAll(".comment-options-menu");

    toggleMenuButtons.forEach(function(toggleMenuButton, index) {
        toggleMenuButton.addEventListener("click", function() {
            optionsMenus[index].classList.toggle("show"); // Toggle the 'show' class on the menu
        });
    });
});

let postdata = [
    {
        user: "matthew",
        metadata: {
            recipeimg: "adobo.jpg",
            date: "01/01/24",
            time: "11:56pm", 
            likes: 20,
            dislikes: 4,
            isedited: false,
            comments: [
                {
                    maincomment: {
                        user: "jeff",
                        commentstring: "wow this is good!",
                        commentlikes: 14,
                        commentdislikes: 0,
                        isedited: false
                    },
                    replies: [
                        {
                            user: "juan",
                            replystring: "yes it is baby",
                            replylikes: 7,
                            replydislikes: 0,
                            isedited: false
                        }
                    ]
                }
            ]
                
        },
        recipename: "pork adobo",
        ingridients: ["leaves", "meat", "vinegar"],
        procedure: ["mix the pot", "repeat"]
    },

    {
        user: "jasmine",
        metadata: {
            recipeimg: "kawali.jpg",
            date: "01/02/24",
            time: "11:57pm", 
            likes: 10,
            dislikes: 0,
            isedited: false,
            comments: [
                {
                    maincomment: {
                        user: "juan",
                        commentstring: "wow this is godly!",
                        commentlikes: 14,
                        commentdislikes: 0,
                        isedited: false
                    },
                    replies: [
                        {
                            user: "jessica",
                            replystring: "indeed it is baby",
                            replylikes: 7,
                            replydislikes: 0,
                            isedited: false
                        }
                    ]
                },
                {
                    maincomment: {
                        user: "juan",
                        commentstring: "wow this is godly!",
                        commentlikes: 14,
                        commentdislikes: 0,
                        isedited: false
                    },
                    replies: [
                        {
                            user: "jessica",
                            replystring: "indeed it is baby",
                            replylikes: 7,
                            replydislikes: 0,
                            isedited: false
                        }
                    ]
                },
                {
                    maincomment: {
                        user: "juan",
                        commentstring: "wow this is godly!",
                        commentlikes: 14,
                        commentdislikes: 0,
                        isedited: false
                    },
                    replies: [
                        {
                            user: "jessica",
                            replystring: "indeed it is baby",
                            replylikes: 7,
                            replydislikes: 0,
                            isedited: false
                        }
                    ]
                }
            ]
                
        },
        recipename: "lechon kawali",
        ingridients: ["oil", "pork", "toyo"],
        procedure: ["mix the pot", "repeat"]
    }
];

// Compile the Handlebars template
var source = document.getElementById("post-template").innerHTML;
var template = Handlebars.compile(source);

// Loop through the data and append each post to the container
var container = document.querySelector(".forumview");
postdata.forEach(function(postData) {
    var html = template(postData);
    container.innerHTML += html;
});

