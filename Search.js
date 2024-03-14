const posts = [
    { title: 'Placeholder Text', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', tags: ['tag1', 'tag2', 'tag3'] },
    { title: 'When Harry Met Sally.', body: 'I love that you get cold when its 71 degrees out. I love that it takes you an hour-and-a-half to order a sandwich. I love that you get a little crinkle above your nose when youre looking at me like Im nuts. I love that when I spend a day with you, I can still smell your perfume on my clothes; and I love that you are the last person I want to talk to before I go to sleep at night.', tags: ['tag2'] },
    { title: 'Blank Space', body: 'So its gonna be forever or its gonna go down in flames. You can tell me when its over, if the high was worth the pain. Got a long list of ex-lovers They will tell you Im insane. Cause you know I love the players And you love the game', tags: ['tag3'] },
];

function SearchPost() {

    const SearchInput = document.getElementById('searcheditem').value.toLowerCase();
    const FilterTag = document.getElementById('tagsoption').value.toLowerCase();

    const FilteredPosts = posts.filter(post => {

        const ContainsPhrase = post.title.toLowerCase().includes(SearchInput) || post.body.toLowerCase().includes(SearchInput);
        const TagFilter = FilterTag === 'all' || post.tags.includes(FilterTag);
        return ContainsPhrase && TagFilter;

    });

    displayResults(FilteredPosts);
}

function displayResults(results) {

    const ResultsContainer = document.getElementById('searchcontainer');
    ResultsContainer.innerHTML = '';

    if (results.length === 0) {

        ResultsContainer.innerHTML = '<p>No Posts Found</p>';

    } else {

        results.forEach(post => {

            const PostElement = document.createElement('div');
            PostElement.classList.add('post');
            PostElement.innerHTML = `<h3> ${post.title} </h3><p> ${post.body} </p><p> Tags: ${post.tags.join(', ')} </p>`;
            ResultsContainer.appendChild(PostElement);

        });
    }
}

function goHome() {

    window.location.href = "RegMainView.html";

}

function gotoProfile() {

    window.location.href = "ViewMyProfile.html";

}

function gotoSearch() {

    window.location.href = "Search.html";
    
}
