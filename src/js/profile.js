document.addEventListener('DOMContentLoaded', async () => {
  
  const user_id = localStorage.getItem('user_id');

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
  // console.log(profile);

  // Assuming profile is an object containing user data
  document.getElementById('username').textContent = profile.user || 'N/A';
  document.getElementById('profile-image').src = profile.image || 'default-image.png';
  document.getElementById('blood-group').textContent = `${profile.blood || 'N/A'}`;
  // Assuming profile doesn't have a 'created_on' field; update according to the actual response structure
  document.getElementById('join-date').textContent = `Joined: ${new Date(profile.created_on).toLocaleDateString() || 'N/A'}`;
  document.getElementById('full-name').textContent = `${profile.first_name} ${profile.last_name}`;
  document.getElementById('user-email').textContent = profile.email || 'N/A';
  document.getElementById('user-phone').textContent = profile.phone || 'N/A';
  document.getElementById('user-location').textContent = `${profile.divition || 'Unknown'}, ${profile.country || 'Unknown'}`;
  document.getElementById('age-gender').textContent = `${profile.age || 'N/A'}, ${profile.gender || 'N/A'}`; 

  fetch(`https://datadonor-webapp.vercel.app/event/events/?last_donate=${localStorage.getItem('user_id')}`)
    .then(res => res.json())
    .then(data => {

      if (data.length < 1) {
        return;
      }
      const last_donation_event = data[0];  
      document.getElementById('last-donation-date').textContent =  last_donation_event.event_date
    })  
  
    let x = 0;

    fetch(`https://datadonor-webapp.vercel.app/event/events/?user=${localStorage.getItem('user_id')}&status=Completed`)
    .then(res => res.json())
      .then(data => {
        let currentValue = parseInt(document.getElementById('total-donations').textContent, 10);
        let requirenmentFullfill = parseInt(document.getElementById('fulfilled-requests').textContent, 10);

        currentValue += data.length; 
        
        document.getElementById('total-donations').textContent = currentValue;
        document.getElementById('fulfilled-requests').textContent = currentValue;

      })
  
      fetch(`https://datadonor-webapp.vercel.app/event/events/?user=${localStorage.getItem('user_id')}&status=Pending`)
      .then(res => res.json())
        .then(data => {
          let currentValue = parseInt(document.getElementById('total-donations').textContent, 10);
   
          currentValue += data.length;
          console.log(data.length);
          
        document.getElementById('total-donations').textContent = currentValue;
  
      })
  
    
    
  
  
};





//  Image cng form

const editImageButton = document.getElementById('editImageButton');
const imageModal = document.getElementById('imageModal');
const closeModal = document.getElementById('closeModal');

// Open modal on button click
editImageButton.addEventListener('click', () => {
  imageModal.classList.remove('hidden');
});

// Close modal when clicking outside the modal
window.addEventListener('click', (event) => {
  if (event.target === imageModal) {
    imageModal.classList.add('hidden');
  }
});

// Close modal on close button click
closeModal.addEventListener('click', () => {
  imageModal.classList.add('hidden');
});




const getImage = async (form) => {
  // const formData = new FormData(form);

  const formData = new FormData(); 
  const imageFile = form.elements["image"].files[0];
  if (imageFile) {
    formData.append("image", imageFile);
  }

  try {
    const response = await fetch(
      'https://api.imgbb.com/1/upload?key=99af3bf39b56183ca39470aa2ea81b31',
      {
        method: 'POST',
        body: formData,
      }
    );
    const resData = await response.json();

    if (resData.success) { 
      console.log('Imaged uploaded immage.com a')
      return resData.data.display_url;   
    } else {
      console.error('Error in upload:', resData);
      throw new Error('Upload failed');
    }
  }
  
  catch (error)
  {
    console.error('Fetch error:', error);
    throw error;
  }
};
const uploadImage = () => {
  const form = document.getElementById('update-image');

  if (!form) {
    console.error('Form element not found!');
    return;
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    try {
      const user_id = localStorage.getItem('user_id');

      if (!user_id) {
        throw new Error('User ID not found in localStorage.');
      }

      // Ensure getImage is a valid async function
      const imageURL = await getImage(form); 

      const data = {
        image: imageURL,
      };

      fetch( `https://datadonor-webapp.vercel.app/accounts/profiles/${user_id}/update-image/`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )
        .then(data => {
          pushAlert('success', "Image uploaded");
          window.location.reload();
        })
        .catch(error => {
          pushAlert('alert','Image not uploaded !')
        });
      
 
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  });
};

// Initialize the form submission listener
uploadImage();
















document.addEventListener('DOMContentLoaded', () => {
  const HistoryHeaderNavControl = () => {
    const donerRequestHeader = document.getElementById('doner_request_header');
    const donateBtn = document.getElementById('donate-btn');
    const requestBtn = document.getElementById('request-btn'); 

    const donateDropdown = document.getElementById('donate-dropdown');
    const requestDropdown = document.getElementById('request-dropdown');
    const donateSection = document.getElementById('donate_section');
    const requestSection = document.getElementById('request_section');

    const acceptedEventsItem = document.querySelector('[data-target="accepted_events"]');

    const acceptedEventsSection = document.getElementById('accepted_events');
    

    donateBtn.addEventListener('click', () => {
      document.getElementById('donated_blood').classList.remove('hidden');
      document.getElementById('received_blood').classList.add('hidden');
    });
    
    requestBtn.addEventListener('click', () => {
      document.getElementById('request_completed').classList.remove('hidden');
      document.getElementById('request_ongoing').classList.add('hidden');
      document.getElementById('request_pending').classList.add('hidden');
      document.getElementById('accepted_events').classList.add('hidden');
      acceptedEventsSection.classList.add('hidden'); // Ensure accepted events stay hidden

    });


    // Handle accepted events click behavior
    acceptedEventsItem.addEventListener('click', () => {
      acceptedEventsSection.classList.remove('hidden'); 
    });
 
    // Toggle dropdowns and sections
    const toggleDropdown = (btn, dropdown, sectionToShow, otherDropdown, otherSection) => {
      dropdown.classList.toggle('hidden');
      otherDropdown.classList.add('hidden'); // Always hide the other dropdown
      sectionToShow.classList.remove('hidden'); // Show the selected section
      otherSection.classList.add('hidden'); // Hide the other section

    };
 

    donateBtn.addEventListener('click', () => {
      
      toggleDropdown(donateBtn, donateDropdown, donateSection, requestDropdown, requestSection);
    });

    requestBtn.addEventListener('click', () => {
      toggleDropdown(requestBtn, requestDropdown, requestSection, donateDropdown, donateSection);
 
    });

    // Hide dropdowns when hovering outside
    document.addEventListener('mouseover', (e) => {
      if (
        !donerRequestHeader.contains(e.target) &&
        !donateBtn.contains(e.target) &&
        !donateDropdown.contains(e.target) &&
        !requestBtn.contains(e.target) &&
        !requestDropdown.contains(e.target)
      ) {
        donateDropdown.classList.add('hidden');
        requestDropdown.classList.add('hidden');
      }
    });
  };

  const History = () => {
    const sections = document.querySelectorAll('#donated_blood, #received_blood,#accepted_events, #request_ongoing, #request_pending, #request_completed');

    const toggleVisibility = (targetId) => {
      sections.forEach((section) => {
        section.classList.toggle('hidden', section.id !== targetId); // Show the matching section, hide others

        
      });
    };

    document.querySelectorAll('[data-target]').forEach((item) => {
      item.addEventListener('click', (e) => {
        const targetId = e.target.getAttribute('data-target');
        toggleVisibility(targetId);
        
      });
    });
  };

  HistoryHeaderNavControl();
  History();
});


// const donated_blood_ul = document.querySelector('#donate_completed.ul');
// donated_blood_ul.classList.add('bg-red-600');


















const loadBloodHistory = (fieldSelector, userId, type) => {
  const field = document.querySelector(fieldSelector);
  const queryKey = type === "donor" ? "doner" : "user";
  const statusFilter = type === "receiver" ? "&status=Completed" : "";

  fetch(`https://datadonor-webapp.vercel.app/event/events/?${queryKey}=${userId}${statusFilter}`)
    .then(res => res.json())
    .then(data => {
      data.forEach(event => {
        const li = document.createElement("li");
        li.className = "flex items-center gap-4";

        const profileKey = type === "donor" ? event.user.id : event.doner;

        fetch(`https://datadonor-webapp.vercel.app/accounts/profiles/?user_id=${profileKey}`)
          .then(res => res.json())
          .then(profileData => {
            const user = profileData[0]; 
            li.innerHTML = `
            <a onclick="guestProfile(${user.user_id}); event.stopPropagation()" class="cursor-pointer"> 
               <div class="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
                <img 
                  src="${user.image || 'default-image.jpg'}" 
                  alt="${user.name || 'User'}" 
                  class="w-full h-full object-cover"
                />
              </div>
             </a>
              <div class='w-full lg:flex justify-between gap-8'>
              <a onclick="guestProfile(${data[0].id}); event.stopPropagation()" class="cursor-pointer"> 
                <div>  
                  <p class="text-gray-800 font-medium">${user.user || "Anonymous"}</p>
                  <p class="text-gray-500 text-sm">Blood Group: ${user.blood || "Unknown"}</p>
                </div>
                </a>
                <div>
                  <p class="text-gray-500 text-sm">Event was: ${event.event_date || "None"}</p>
                </div>
              </div>
            `;
            field.appendChild(li);
          });
      });
    });
};

const userId = localStorage.getItem("user_id");

loadBloodHistory("#donated_blood ul", userId, "donor"); // Load donated blood history
loadBloodHistory("#received_blood ul", userId, "receiver"); // Load received blood history



const loadEventHistory = (fieldSelector, userId, status) => {
  const field = document.querySelector(`${fieldSelector} ul`); 



  fetch(`https://datadonor-webapp.vercel.app/event/events/?user=${userId}&status=${status}`)
    .then(res => res.json())
    .then(data => {

      data.forEach(event => {
        const li = document.createElement("li");
        li.className = "items-center gap-4  z-0 " 
        li.innerHTML = `
                    <div class="bg-white  h-full rounded-lg border-[1px] border-gray-300 shadow-lg p-6 relative"   >
                      <!-- Title -->
                      <h3 class="text-lg font-semibold text-gray-800">${event.title} </h3>
                      <div class="flex justify-between items-center">
                        <p class="text-xs text-gray-600">Location: <span class="font-medium">${event.location}</span></p>
                        <span class="text-xs font-bold text-red-600 px-2 py-1 bg-red-100 rounded-full  absolute top-2 right-2 ">${event.blood}</span>
                      </div>
                      <p class="text-xs text-gray-600">Date: <span class="font-medium">${event.event_date}</span></p>
                      <div class="flex  justify-between items-center gap-4 pt-6 sm:pt-4 mt-6 sm:mt-4 border-t border-gray-200">
                        ${status == 'Pending' ? `
                          <button  onclick="receivedBloodSubmition('${event.id}','${event.blood}','${event.doner}')" class="px-4 py-2 bg-green-500 text-white text-xs sm:text-sm absolute bottom-2 sm:bottom-4 right-4  rounded-lg shadow-md hover:bg-green-600 transition">
                              Received?
                          </button>
                          `: `
                        <span class="text-sm text-gray-500">Created by: <b> Self </b></span>

                          `}
                      </div>
                    </div>
        `;
        field.appendChild(li);
      })
      
    })
    .catch(error => console.log(error));
  
}

const receivedBloodSubmition = (event_id, event_blood, doner_id) => {
  pushAlert('processing', 'wait few second! will received blood!');
  
  fetch(`https://datadonor-webapp.vercel.app/event/events/${event_id}/received/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json', 
    },  
    })
    .then(res => res.json())
    .then(data => {
      pushAlert('success',`Accepted Blood ${event_blood} form Doner id: ${doner_id}`)
    })
    .catch(error => {
      pushAlert('alert', error);
  })
}


loadEventHistory('#request_ongoing',userId,'Ongoing');
loadEventHistory('#request_pending',userId,'Pending');
loadEventHistory('#request_completed', userId, 'Completed');



const loadALLAcceptedEvents = (userId) => {
   
  const field = document.querySelector(`#accepted_events ul`); 
  
  fetch(`https://datadonor-webapp.vercel.app/event/events/?doner=${userId}`)
    .then(res => res.json())
    .then(data => {

      data.forEach(event => {
 
        fetch(`https://datadonor-webapp.vercel.app/accounts/users/?id=${event.user.id}`)
          .then(res => res.json())
          .then(data => { 

            const created_by = data[0].username;
            
            const li = document.createElement("li");
            li.className = " ";
            li.innerHTML = `
                        <div class="bg-white col-span-1 rounded-lg border-[1px] border-gray-300 shadow-lg p-6 relative"   >
                          <!-- Title -->
                          <h3 class="text-lg font-semibold text-gray-800">${event.title}</h3>
                          <div class="flex justify-between items-center">
                            <p class="text-xs text-gray-600">Location: <span class="font-medium">${event.location}</span></p>
                            <span class="text-xs font-bold text-red-600 px-2 py-1 bg-red-100 rounded-full  absolute top-2 right-2 ">${event.blood}</span>
                          </div>
                          <p class="text-xs text-gray-600">Date: <span class="font-medium">${event.event_date}</span></p>
                          <div class="flex flex-col sm:justify-between sm:items-center gap-4 pt-2 mt-2 border-t border-gray-200">
                            <a onclick="guestProfile(${data[0].id}); event.stopPropagation()" class="cursor-pointer"> 
                            <span class="text-sm text-gray-500">Created by: <b>${created_by}</b></span>
                            </a>
                            
                            <button  class="px-4 py-2  bg-gray-200 text-gray-800 text-xs sm:text-sm font-semibold rounded-lg shadow-md  transition">
                            ${event.status} </button>
                          </div>
                        </div>
            `;
            field.appendChild(li);
        
        })
        
       
      })
      
    })
    .catch(error => console.log(error));
  
};

loadALLAcceptedEvents(userId);