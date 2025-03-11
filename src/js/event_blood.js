const eventGenderator = (filter = {}) => {    
  document.getElementById('event_loading').classList.remove('hidden')
  fetch('https://datadonor-webapp.vercel.app/event/events/?status=Ongoing')
    .then(res => res.json())
    .then(data => showAllEvent(data, filter))
    .catch(error => console.log(error));
}
 

const showAllEvent = (data, filter = {}) => {
  const user_id = localStorage.getItem('user_id');
  const eventCards = document.getElementById('event-cards');
  
  let allEvents = ''; // Initialize allEvents
  for (const event of data) {

    let self = (event.user.id == Number(user_id)); 

    if ('blood' in filter && event.blood != filter['blood']) {
      continue;
    }
    if ('event_date' in filter && event.event_date != filter['event_date']) {
      continue;
    }
    
    allEvents += `  
      <div class="bg-white rounded-lg shadow-lg p-6" data-aos="fade-up">
        <!-- Title -->
        <a href="./view_event.html" onclick="localStorage.setItem('view_event', ${event.id})"> 
          <h3 class="text-2xl font-semibold hover:text-red-500 text-gray-800">${event.title}</h3>
        </a>

        <div class="flex justify-between items-center">
          <p class="text-sm text-gray-600">Location: <span class="font-medium">${event.location}</span></p>
          <span class="text-xs font-bold text-red-600 px-2 py-1 bg-red-100 rounded-full">${event.blood}</span>
        </div>

        <p class="text-sm text-gray-600">Date: <span class="font-medium">${event.event_date}</span></p>
        <p class="text-sm text-gray-700 pt-4 pb-2">Your contribution can save a life!</p>

        <div class="flex justify-between items-center pt-2 border-t border-gray-200">
          <a onclick="guestProfile(${event.user.id}); event.stopPropagation()" class="cursor-pointer"> 
            <span class="text-sm text-gray-500">Created by: <b>${event.user.username}</b></span>
          </a>

          ${self ? `
            <button onclick="event.stopPropagation()" class="px-4 py-1 bg-gray-100 text-gray-800 text-sm font-semibold rounded-lg shadow-md transition">
              Self
            </button>
          ` : `
            <button onclick="acceptEvent('${event.id}', '${user_id}', '${event.blood}'); event.stopPropagation()" class="px-4 relative py-2 bg-green-500 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-green-600 transition group">
              <span class="absolute inset-0 w-full h-full transition-all duration-300 overflow-hidden ease-out transform translate-x-full bg-white opacity-20 group-hover:translate-x-0"></span>
              <span class="relative">Accept</span>
            </button> 
          `}
        </div>
      </div>`;   
    
  }; 
  document.getElementById('event_loading').classList.add('hidden')
  eventCards.innerHTML = allEvents;
}


eventGenderator();



function analysisEvent(blood) {
  console.log(`Analyzing events for blood group: ${blood}`);
  filter = {
    'blood': blood,
  }
  eventGenderator(filter);

}

const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
document.getElementById('event-date').value = today;

// Add click event listener for the search button
document.getElementById('search-button').addEventListener('click', function () {
  const dateInput = document.getElementById('event-date').value; // Get the selected date
  filter = {
    'event_date': today,
  }
  eventGenderator(filter);


  if (dateInput) {
    filter.event_date = dateInput;
  } else {
    pushAlert('alert', 'Please select a date before searching.');
  }
});

const acceptEvent = (event_id, user_id, event_blood) => {
  pushAlert('processing', 'wait few second');

  fetch(`https://datadonor-webapp.vercel.app/accounts/profiles/?user_id=${user_id}`)
    .then(r => r.json())
    .then(data => {
      const user = data[0];
      acceptEventSumbit(event_id, event_blood, user_id, user.blood);
    })
    .catch(error => console.log(error))



  const acceptEventSumbit = (event_id, event_blood, user_id, user_blood) => {
    if (event_blood != user_blood) {
      pushAlert('alert', `The event for ${event_blood}, but your Blood is ${user_blood}`);

      // alert(`The event for ${event_blood}, but your Blood is ${user_blood}`);
      return;
    }

    const data = {
      'doner_id': user_id,
      'doner_message': '',
    }
    pushAlert('processing', 'wait few second');

    fetch(`https://datadonor-webapp.vercel.app/event/events/${event_id}/accepted/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // Ensure the request is sent as JSON
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => {
        pushAlert('success', `Accepted The ${event_blood} event! The event added you profile History`);

        console.log('succesfully event accepted! without discription')
        eventGenderator();
      })
      .catch(error => console.log(error))

    console.log(event_id, " -> ", user_id);
  }

}







box = document.getElementById("doner-list")
box.classList.remove("translate-y-10", "opacity-0");
box.classList.add("translate-y-0", "opacity-100");

