const toggleButton = () => {
    const themeToggleButton = document.getElementById("theme-toggle");

    // Add event listener to toggle button
    themeToggleButton.addEventListener("click", () => {
        const body = document.body;

        // Toggle the dark theme on the body
        const isDarkTheme = body.classList.toggle("dark-theme");

        // Optionally toggle the hamburger menu style
        document.getElementById('hamburger')?.classList.toggle('text-gray-700');

        // Update the button's text and icon appearance
        themeToggleButton.classList.toggle('text-gray-700');
        const icon = themeToggleButton.querySelector("i");
        if (icon) {
            icon.classList.toggle("fa-sun", !isDarkTheme);
            icon.classList.toggle("fa-moon", isDarkTheme);
        }
    });
}; 



const header = document.querySelector('header');
const upperHeader = document.getElementById('upper-header');
header.className = "bg-blue-600 text-white pb-4  shadow-lg fixed w-full top-0 z-10 transition-all duration-500 ease-in-out"
header.innerHTML = ` 
    <!-- Upper Header -->
    <div class="container mx-auto  pr-16 sm:pr-10 md:pr-6">
 
    <!-- Lower Header -->
    <div id="lower-header" class=" flex justify-between items-center px-6 pt-3 " >
        <a href="/index.html" id="logo-container" class="flex items-center gap-2">
        
            <img id="logo" src="src/images/data.doner_icon.png" alt="Logo" class="w-10 h-10 bg-white rounded-full p-2">
            <span id="site-title" class="text-2xl font-bold tracking-wide hidden lg:block">DD</span>
        </a>

        <nav id="main-nav" class="hidden md:flex space-x-6 text-lg">
            <a href="/index.html" id="nav-home" class="hover:text-gray-300">Home</a>
            <a href="/event_blood.html" id="nav-recipient" class="hover:text-gray-300">Recipient Requests</a>
            <a href="/search_user.html" id="nav-donors" class="hover:text-gray-300">Find Donors</a>
        </nav>

        <div id="header-actions" class="flex items-center gap-6">
            <div id="notification-section" class="relative " >
                <button id="notification-button" onclick="toggleNotificationBox()" class="relative hidden ">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405C18.21 15.21 18 14.703 18 14.17V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 5.936 6 7.828 6 10v4.17c0 .533-.21 1.041-.595 1.425L4 17h5m4 0a2.5 2.5 0 01-5 0h5z" />
                    </svg>
                    <span id="notification-badge" class="absolute -top-3 -right-3 text-xs bg-white text-gray-800 rounded-full px-2 py-1">3</span>
                </button>
            </div>

            <div id="profile-section" class="relative">
                <button id="profile-button" onclick="toggleDropdown('profile-menu')" class="flex items-center space-x-2 hover:text-gray-300">
                    <span>Profile</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5.23 7.21a1 1 0 011.32-.083L10 9.584l3.45-2.457a1 1 0 011.1 1.664l-4 2.857a1 1 0 01-1.1 0l-4-2.857a1 1 0 01-.22-1.38z" clip-rule="evenodd" />
                    </svg>
                </button>
                <ul id="profile-menu" class="absolute right-0 mt-2 hidden bg-white text-black shadow-lg rounded-lg py-2 w-48">
                    <ul  class="flex-col md:hidden "> 
                        <li> <a href="/index.html"  class="block px-4 py-2 hover:bg-gray-100">Home</a></li> 
                        <li><a href="/event_blood.html" id="nav-recipient" class="block px-4 py-2 hover:bg-gray-100">Recipient Requests</a></li> 
                       <li> <a href="/search_user.html" id="nav-donors" class="block px-4 py-2 hover:bg-gray-100">Find Donors</a></li> 
                    </ul>
                    <ul id="profile-deep-menu">
                    <ul>
                    <li class="relative">
                        <button id="more-options-button" class="flex items-center w-full px-4 py-2 hover:bg-gray-100 transition duration-300" onclick="toggleDropdown('nested-menu')">
                            More Options
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-auto" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M5.23 7.21a1 1 0 011.32-.083L10 9.584l3.45-2.457a1 1 0 011.1 1.664l-4 2.857a1 1 0 01-1.1 0l-4-2.857a1 1 0 01-.22-1.38z" clip-rule="evenodd" />
                            </svg>
                        </button>
                        
                        <ul id="nested-menu" class="absolute sm:top-0 sm:-left-48 shadow-lg mt-0 hidden bg-gray-100 text-black shadow-lg rounded-lg py-2 w-48">

                            <li><a href="/feedback/FAQ.html" id="faq-link" class="block px-4 py-2 hover:bg-gray-100">FAQ</a></li>
                            <li><a href="/feedback/term_conditions.html" id="terms-link" class="block px-4 py-2 hover:bg-gray-100">Terms & Conditions</a></li>
                            <li><a href="/feedback/about_us.html" id="about-link" class="block px-4 py-2 hover:bg-gray-100">About Us</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    </div>
`;
document.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    const body = document.body;
    
    if (scrollPosition >= 10) {
        body.classList.add("scrolled");
    } else {
        body.classList.remove("scrolled");
    }
});



const isAuthenticated = () => {
    const token_key = localStorage.getItem("token");
    return !!token_key;  // Converts to true if token exists
} 

// Assigning the menu based on authentication status
const menuItems = isAuthenticated() ? `
    <li><a href="/profile.html" id="profile-link" class="block px-4 py-2 hover:bg-gray-100">Profile</a></li>
    <li><a href="/setting.html" id="settings-link" class="block px-4 py-2 hover:bg-gray-100">Settings</a></li>
    <li><a href="#" id="logout-link" onclick="handlelogOut()" class="block px-4 py-2 hover:bg-gray-100">Logout</a></li>

` : `
    <li><a href="/login.html" id="profile-link" class="block px-4 py-2 hover:bg-gray-100">Login</a></li>
    <li><a href="/register.html" id="settings-link" class="block px-4 py-2 hover:bg-gray-100">Register</a></li>
`;
 
if (isAuthenticated())
{
    document.getElementById('notification-section').classList.remove('hidden');
}
else {
    document.getElementById('notification-section').classList.add('hidden');
    
}
document.getElementById("profile-deep-menu").insertAdjacentHTML('afterbegin', menuItems);

// Toggle dropdown visibility
function toggleDropdown(menuId) {
    const menu = document.getElementById(menuId);
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
    }
}

// Close dropdowns when clicking outside
document.addEventListener('click', function (e) {
    const dropdowns = document.querySelectorAll('#profile-menu, #nested-menu');
    dropdowns.forEach((dropdown) => {
        if (!dropdown.contains(e.target) && !dropdown.previousElementSibling.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });
});

function toggleDropdown(menuId) {
    const menu = document.getElementById(menuId);
    menu.classList.toggle('hidden');
}
 

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


 
const pushAlert = (title, description) => {
    // Check if an alert is already displayed and close it
    const existingAlert = document.getElementById("customAlert");
    if (existingAlert) {
        closeAlert(existingAlert); // Close the previous alert if exists
    }

    // Create the alert box container
    const alertBox = document.createElement('div');
    alertBox.className = 'fixed bottom-5 right-5 z-50 animate-slide-in-right';

    // Define the inner HTML of the alert box based on the title
    alertBox.innerHTML = `
        <div id="customAlert" class="relative w-80 bg-white p-6 rounded-lg shadow-lg border-l-4 ${
            title === "success" ? "border-green-500" :
            title === "alert" ? "border-red-500" :
            title === "warning" ? "border-yellow-500" :
            title === "processing" ? "border-blue-500" : "border-gray-500"
        }">
            <!-- Close Button -->
            <button onclick="closeAlert(this.parentElement)" class="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl">
                &times;
            </button>

            <div class="flex items-center space-x-3">
                ${
                    title === "success" ? `
                        <i class="fas fa-check-circle text-green-500 text-2xl"></i>
                        <h2 class="text-xl font-semibold text-gray-800">Success</h2>
                    ` : title === "alert" ? `
                        <i class="fas fa-times-circle text-red-500 text-2xl"></i>
                        <h2 class="text-xl font-semibold text-gray-800">Alert</h2>
                    ` : title === "warning" ? `
                        <i class="fas fa-exclamation-circle text-yellow-500 text-2xl"></i>
                        <h2 class="text-xl font-semibold text-gray-800">Warning</h2>
                    ` : title === "processing" ? `
                        <i class="fas fa-cog animate-spin text-blue-500 text-2xl"></i>
                        <h2 class="text-xl font-semibold text-gray-800">Processing...</h2>
                    ` : `
                        <i class="fas fa-info-circle text-gray-500 text-2xl"></i>
                        <h2 class="text-xl font-semibold text-gray-800">Info</h2>`
                }
            </div>

            <p class="mt-3 text-gray-700 text-sm">${description}</p>
        </div>
    `;

    // Append the alert box to the body
    document.body.appendChild(alertBox);

    // Auto-close the alert after 5 seconds, except for "processing" type
    if (title !== "processing") {
        setTimeout(() => {
            closeAlert(alertBox);
        }, 5000);
    }
}

// Function to close the alert
const closeAlert = (alertElement) => {
    if (alertElement) {
        alertElement.classList.add('animate-slide-out-right'); // Slide out animation
        setTimeout(() => {
            alertElement.remove();
        }, 500); // Wait for animation to complete before removal
    }
}; 


const guestProfile = (guest_id) => {
    localStorage.setItem('guest_id', guest_id);
    window.open('/guest_profile.html', '_blank');
  
}
  

const is_authticated = () => {
    
    if (!localStorage.getItem('user_id')) {
        window.location.href = "./login.html" 

        pushAlert('warning', 'You should first login ') 
        window.location.href = "./login.html" 
        

    }

} 
