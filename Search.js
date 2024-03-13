const posts = [
    { title: 'Post 1', body: 'May the Force be with you', tags: ['tag1', 'tag2', 'tag3'] },
    { title: 'Post 2', body: 'You cant sit with us', tags: ['tag2'] },
    { title: 'Post 3', body: 'Ohana means family', tags: ['tag3'] },
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
