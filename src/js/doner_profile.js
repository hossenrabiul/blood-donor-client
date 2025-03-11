 

    document.addEventListener('DOMContentLoaded', async () => {
     
        const user_id = localStorage.getItem('guest_id');
       
  
        // Fetch the user profile data
        try {
            const response = await fetch(`https://datadonor-webapp.vercel.app/accounts/profiles/?user_id=${user_id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user profile');
            }
            const data = await response.json();
      
            // Ensure the response contains at least one profile
            if (data && data.length > 0) {
                profileAdd(data[0]); // Assuming the first profile is the one we need
            } else {
                pushAlert('alert','No profile data found.');
            }
        } catch (error) {
            console.error(error); 
        }
    });
  
    // Function to populate profile data in the HTML
    const profileAdd = (profile) => {
        // Log profile data for debugging
        console.log(profile);
  
        // Assuming profile is an object containing user data
        document.getElementById('username').textContent = profile.user || 'N/A';
        document.getElementById('profile-image').src = profile.image || 'default-image.png';
        document.getElementById('blood-group').textContent = `Blood Group: ${profile.blood || 'N/A'}`;
        // Assuming profile doesn't have a 'created_on' field; update according to the actual response structure
        document.getElementById('join-date').textContent = `Joined: ${new Date(profile.created_on).toLocaleDateString() || 'N/A'}`;
        document.getElementById('full-name').textContent = `${profile.first_name} ${profile.last_name}`;
        document.getElementById('user-email').textContent = profile.email || 'N/A';
        document.getElementById('user-phone').textContent = profile.phone || 'N/A';
        document.getElementById('user-location').textContent = `${profile.divition || 'Unknown'}, ${profile.country || 'Unknown'}`;
        document.getElementById('age-gender').textContent = `${profile.age || 'N/A'}, ${profile.gender || 'N/A'}`;
        document.getElementById('total-donations').textContent = profile.donations || '0';
        document.getElementById('fulfilled-requests').textContent = profile.fulfilled_requests || '0';
        document.getElementById('last-donation-date').textContent = profile.last_donation_date || 'N/A';
    };
  


 
 

// const userInfoModel = (user_id) => {
    
//     console.log("Fetching user ID:", user_id);

//     // Get references to modal elements
//     const modal = document.getElementById("user-modal");
//     const closeModal = document.getElementById("close-modal");

//     // Fetch the user data
//     const find_user = (user_id) => {
//         fetch(`https://datadonor-webapp.vercel.app/accounts/profiles/?user_id=${user_id}`)
//             .then((res) => {
//                 if (!res.ok) {
//                     throw new Error("Failed to fetch user data");
//                 }
//                 return res.json(); // Call .json() to parse the response
//             })
//             .then((data) => {
//                 console.log("User Data:", data);

//                 // Update modal content with user data
//                 if (data && data.length > 0) {
//                     const user = data[0]; // Assuming the response is a list and you want the first user
//                     document.getElementById("modal-user-image").src = user.image || "https://via.placeholder.com/150";
//                     document.getElementById("modal-user-name").textContent = `${user.first_name} ${user.last_name}`;
//                     document.getElementById("modal-user-username").textContent = `@${user.user}`;
//                     document.getElementById("modal-user-email").textContent = user.email || "N/A";
//                     document.getElementById("modal-user-phone").textContent = user.phone || "N/A";
//                     document.getElementById("modal-user-blood").textContent = user.blood || "N/A";
//                     document.getElementById("modal-user-division").textContent = user.divition || "N/A";
//                     document.getElementById("modal-user-gender").textContent = user.gender || "N/A";

//                     // Show the modal
//                     modal.classList.remove("hidden");
//                 } else {
//                     console.error("No user found with this ID.");
//                 }
//             })
//             .catch((error) => {
//                 console.error("Error fetching user:", error);
//             });
//     };

//     find_user(user_id);

//     // Close modal when the close button is clicked
//     closeModal.addEventListener("click", () => {
//         modal.classList.add("hidden");
//     });

//     // Optional: Close modal when clicking outside of it
//     modal.addEventListener("click", (event) => {
//         if (event.target === modal) {
//             modal.classList.add("hidden");
//         }
//     });
// };
