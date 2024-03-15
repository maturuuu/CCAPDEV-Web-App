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

