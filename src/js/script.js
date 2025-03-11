


function toggleDropdown(menuId) {
    const menu = document.getElementById(menuId);
    menu.classList.toggle('hidden');
}

window.addEventListener('click', function (e) { 
    const profileMenu = document.getElementById('profile-menu'); 
    const profileDropdown = document.getElementById('profile-dropdown');

    // Check if the click is outside of the elements you want to remain visible
    if (
        !e.target.closest("#profile-menu") && 
        !e.target.closest("#profile-dropdown") &&
        !e.target.closest("button") // You can add more conditions here as needed
    ) {
        profileMenu.classList.add("hidden");
        newsMenu.classList.add("hidden");
    }
});

function toggleNotificationBox() {
    const box = document.getElementById("notification-box");
    box.classList.toggle("hidden");
    box.classList.toggle("scale-100");
    box.classList.toggle("opacity-100");
    box.classList.toggle("scale-95");
    box.classList.toggle("opacity-0");
}

// Close dropdown when clicking outside
window.addEventListener("click", (e) => {
    const notificationBox = document.getElementById("notification-box");
    if (!e.target.closest("#notification-box") && !e.target.closest("button")) {
        notificationBox.classList.add("hidden");
        notificationBox.classList.remove("scale-100", "opacity-100");
        notificationBox.classList.add("scale-95", "opacity-0");
    }
});




// //  Notificaion box 
// const hamburgerMenu = document.getElementById('hamburger-menu');
// const mobileNav = document.getElementById('mobile-nav');
// const closeMenu = document.getElementById('close-menu');

// // Toggle mobile menu on hamburger click
// hamburgerMenu.addEventListener('click', () => {
//     mobileNav.classList.toggle('hidden');
// });

// // Close the mobile menu when close button is clicked
// closeMenu.addEventListener('click', () => {
//     mobileNav.classList.add('hidden');
// });

// // Close the menu when any item is clicked (optional)
// const menuItems = mobileNav.querySelectorAll('a');
// menuItems.forEach(item => {
//     item.addEventListener('click', () => {
//         mobileNav.classList.add('hidden');
//     });
// });







