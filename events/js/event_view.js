let user_id = localStorage.getItem('user_id');

function showViewModal(event_id,user_id) {
    // Show the modal by removing the 'hidden' class
    const view_model = document.getElementById('view_event_modal').classList.remove('hidden');
    showEventInstanceData(event_id);
    
    document.getElementById('testing').classList.remove('hidden');
    // showEventInstanceData(event_id);
}

// Function to hide the modal
function hideViewModal() {
    // Hide the modal by adding the 'hidden' class back
    document.getElementById('view_event_modal').classList.add('hidden');
    document.getElementById('testing').classList.add('hidden');
    eventGenderator();
}

const showEventInstanceData = (event_id) => {
    console.log(event_id); 
    const viewModeljs = document.getElementById('view_event_modal');
    console.log('paici')
    
    
    fetch(`https://datadonor-webapp.vercel.app/event/events/?event_id=${event_id}`)
        .then(res => res.json())
        .then(data => {
            const event = data[0];    

            fetch(`https://datadonor-webapp.vercel.app/accounts/users/?id=${event.user.id}`)
                .then(res => res.json())
                .then(userData => {

                    const created_by = userData[0].username; 
                
            
            viewModeljs.innerHTML =
                ` 
                <!-- Modal (Full-screen fixed overlay) -->
                <div class="fixed z-30 inset-0 bg-gray-800 bg-opacity-60 flex justify-center items-center   ">
                  <div class="bg-teal-50 px-12 py-0 container max-w-5xl mx-auto rounded-lg">
                      <!-- Close button inside the modal -->
                      <button type="button" onclick="hideViewModal()" class="absolute top-4 right-4 px-3 py-1 bg-gray-200 rounded-lg text-2xl">
                        <i class="fas fa-times text-gray-600"></i>
                      </button>
                
                      <!-- Main Container -->
                      <div class="lg:grid grid-cols-12 py-10 gap-4 m-auto space-y-6 lg:space-y-0">
                        <!-- Form Section -->
                        <div class="w-full col-span-7 bg-white shadow-md rounded-lg p-8">
                            <!-- Header -->
                            <div class="flex items-center justify-between py-4 border-b">
                                <div class="flex gap-4 items-center">
                                    <button type="button" id="blood" class="px-4 py-2 bg-red-600 text-white text-xl rounded-full " disabled>${event.blood}</button>

                                    <a onclick="guestProfile('${userData[0].id}')" class="cursor-pointer"> 
                                    <h1 class="text-2xl font-semibold text-gray-800">${event.title}</h1>
                                    </a>
                                </div>
                            </div>
                
                            <!-- Form -->
                            <form id="view-event-Modelform" class="mt-6 space-y-6 pointer-events-none pb-12">
                                <!-- Event Title -->
                
                                <!-- Organizer and Location -->
                                <div class="lg:grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                        <label for="view_location" class="block text-sm font-medium text-gray-600 mb-1">Event v Location</label>
                                        <input type="text" id="view_location" name="view_location" value="${event.location}"
                                            class="w-full px-3 py-2 rounded-lg focus:outline-none" disabled>
                                    </div>
                
                                    <!-- Date and Time -->
                                    <div>
                                        <label for="view_date" class="block text-sm font-medium text-gray-600 mb-1">Event Date</label>
                                        <input type="date" id="view_ldate" name="view_ldate" value="${event.event_date}"
                                            class="w-full px-3 py-2 rounded-lg focus:outline-none" disabled>
                                    </div>
                     
                                    <div> 
                                        <label for="view_created_by" class="block text-sm font-medium text-gray-600 mb-1">Event Created By</label>
                                        <input type="text" id="view_created_by" name="view_created_by" value="${created_by}"
                                            class="w-full px-3 py-2 rounded-lg focus:outline-none" disabled>
                                    </div> 
                                    <div>
                                        <label for="view_time" class="block text-sm font-medium text-gray-600 mb-1">Event Time</label>
                                        <input type="view_time" id="view_time" name="view_time" value="${event.event_time}"
                                            class="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" disabled>
                                    </div>
                                </div>
                
                                   <!-- Description -->
                                   <div>
                                    <label for="view_description"
                                        class="block text-sm font-medium text-gray-600 mb-1">Description</label>
                                    <textarea id="view_description" name="view_description" rows="6"
                                        class="w-full border text-gray-800 border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        disabled>${event.description}!</textarea>
                                </div>
                              
                
                            </form>
                        </div>
                
                        <div class="w-full col-span-5 bg-white shadow-md rounded-lg p-6">
                
                          <form action="" id="accept_event_form" class="relative" onsubmit="acceptEventFormSubmition(event,'${event.id}','${event.blood}','${user_id}')">
                            <!-- Donors Section -->
                            <!-- Donor Count -->
                            <div class="mb-4 flex justify-between items-center">
                                <div>
                                    <h2 class="text-xl font-semibold text-gray-800">Accepted Donors</h2>
                                    <p class="text-sm text-gray-600">Total Donors: <span id="total-donors" class="font-medium text-gray-800">${event.doner?1:0}</span></p>
                                    <p class="text-sm text-gray-600">Status: <span id="total-donors" class="font-medium text-red-600">${event.status}</span></p>
                                </div>
                        
                                <!-- Positioned Button in Top Right -->
                                <div class="absolute -top-4 -right-4 mt-4 mr-4">
                                    <button type="submit"  class="px-4 py-2 bg-green-500 text-white text-md rounded hover:bg-teal-600">
                                        Accept
                                    </button>
                                </div>
                            </div>
                         
                            <!-- Description -->
                            <div>
                              <label for="description" class="block text-lg font-medium text-gray-700 mb-1">Donors Description</label>
                              <textarea id="description" name="description" rows="6"
                                class="w-full border border-[1px] border-gray-300 px-4 py-2 mt-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500"
                                placeholder="Write your thinking and accept for donate blood" required></textarea>
                            </div>
                        </form>

                        ${event.doner ? `
                                <!-- Donor List --> 
                              <div class="overflow-y-auto max-h-52 mt-6">
                                <ul class="space-y-4">
                                    <!-- First Donor -->
                                    <li class="flex items-center gap-4">
                                        <div class="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                                            ${event.doner}
                                        </div>
                                        <div>
                                            <p class="text-gray-800 font-medium">@ ${event.doner}</p>
                                            <p class="text-gray-500 text-sm">Blood Group: ${event.blood}</p>
                                        </div>
                                    </li> 
                                </ul> 
                              </div>

                            `: `
                             <div class="overflow-y-auto max-h-52 mt-6">
                                <ul class="space-y-4">
                                    <!-- First Donor -->
                                    <li class="flex items-center gap-4">
                                        <div class="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                                            Null
                                        </div>
                                        <div>
                                            <p class="text-gray-800 font-medium">@Null</p>
                                            <p class="text-gray-500 text-sm">Blood Group: empty</p>
                                        </div>
                                    </li> 
                                </ul> 
                              </div>
                        `} 
                            </div>
                        </div>
                      </div>
                  </div>

                `;
            }); 
        })
        .catch(error => {
            console.error('Error fetching event data:', error);
        });
}



const acceptEventFormSubmition = (event, event_id, event_blood, user_id) => {
    event.preventDefault(); // Prevent the default form submission
 
    fetch(`https://datadonor-webapp.vercel.app/accounts/profiles/?user_id=${user_id}`)
    .then(r => r.json())
    .then(data => {
      const user = data[0]; 
      acceptEventFormFinalSubmition(event_id,event_blood, user_id, user.blood);
    })
    .catch(error=>console.log(error))
  
    const acceptEventFormFinalSubmition = (event_id, event_blood, user_id, user_blood) =>
    {
        if (event_blood != user_blood)
        {
              pushAlert('alert',`The event for ${event_blood}, but your Blood is ${user_blood}`);
              return;
        }

        const form = document.getElementById('accept_event_form');
        const formData = new FormData(form);
        const description = formData.get('description');
        doner_id = localStorage.getItem('user_id');
        if (event_id && doner_id) {
            console.log('accept Form', event_id, ' ', doner_id);
            data = {
                'doner_id':doner_id,
                'doner_message':description,
            }
            console.log(data);
    
            fetch(`https://datadonor-webapp.vercel.app/event/events/${event_id}/accepted/`, {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json', // Ensure the request is sent as JSON
                },
                body:JSON.stringify(data),
            })
                .then(res => res.json())
                .then(data => {
                    pushAlert('success',`Succeccfyll Accepted you the ${event_blood} event, Plase fullfil to done Blood`);
                    window.location.reload();
            })
        } 

    }


};