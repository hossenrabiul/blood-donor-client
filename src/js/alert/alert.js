const pushAlert = (title, description) => {
    // Create the alert box container
    const alertBox = document.createElement('div');
    alertBox.className = 'fixed bottom-5 right-5 z-50 animate-slide-in-right';

    // Define the inner HTML of the alert box based on the title
    alertBox.innerHTML += `
        <div id="customAlert" class="relative w-80 bg-white p-6 rounded-lg shadow-lg border-l-4 ${
            title === "success" ? "border-green-500" :
            title === "alert" ? "border-red-500" :
            "border-yellow-500"
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
                    ` : `
                        <i class="fas fa-exclamation-circle text-yellow-500 text-2xl"></i>
                        <h2 class="text-xl font-semibold text-gray-800">Warning</h2>`
                }
            </div>

            <p class="mt-3 text-gray-700 text-sm">${description}</p>
        </div>
    `;

    // Append the alert box to the body
    document.body.appendChild(alertBox);

    // Auto-close the alert after 5 seconds
    setTimeout(() => {
        closeAlert(alertBox);
    }, 5000);
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
 
// Example usage of the function
// pushAlert('success', 'You have successfully completed the action.');
// Or for error
// pushAlert('alert', 'An error occurred, please try again.');
// Or for warning
// pushAlert('warning', 'This is a warning message.');

// <script src="/alert/alert.js"> </script>
