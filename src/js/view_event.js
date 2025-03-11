const showEventInstanceDataa = () => {
    let view_event = localStorage.getItem('view_event');
    if (!view_event)
    {
        return
    }

    fetch(`https://datadonor-webapp.vercel.app/event/events/?event_id=${view_event}`)
            .then(res => res.json())
            .then(data => {
                if (data.length === 0) return;
                const event = data[0];
                console.log('new', event);
                localStorage.setItem('view_event_blood', event.blood);

                fetch(`https://datadonor-webapp.vercel.app/accounts/users/?id=${event.user.id}`)
                    .then(res => res.json())
                    .then(userData => {
                        const created_by = userData[0].username; 

                        document.getElementById("eventBlood").textContent = event.blood || "N/A";
                        document.getElementById("view_eventTitle").textContent = event.title || "Untitled Event";
                        document.getElementById("viewLocation").value = event.location || "Unknown Location";
                        document.getElementById("viewDate").value = event.event_date || "N/A";
                        document.getElementById("viewTime").value = event.event_time || "N/A";
                        document.getElementById("viewCreatedBy").value = created_by || "N/A";
                        document.getElementById("total-donors").textContent = event.doner ? 1 : 0;
                        document.getElementById("doner_status").textContent = event.status;
                        document.getElementById("viewDescription").value = event.description;

                        // fetch(`https://datadonor-webapp.vercel.app/accounts/users/?id=${event.user.id}`)
                        //     .then(res => res.json())
                        //     .then(userData => {
                        //         if (userData.length === 0) return;
                        //         document.getElementById("viewCreatedBy").value = userData[0].username || "Anonymous";
                        //     })
                        //     .catch(error => console.error('Error fetching user data:', error));
                    
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => console.error('Error fetching event data:', error));
}

showEventInstanceDataa();


 

const acceptEventFormSubmition = (event) => {
    pushAlert('processing','Submitting your donation, wait please')
     let event_id = localStorage.getItem('view_event');
    let event_blood = localStorage.getItem('view_event_blood');
    let user_id = localStorage.getItem('user_id');

    event.preventDefault(); // Prevent the default form submission
 
    fetch(`https://datadonor-webapp.vercel.app/accounts/profiles/?user_id=${user_id}`)
    .then(r => r.json())
    .then(data => {
      const user = data[0]; 
      acceptEventFormFinalSubmition(event_id,event_blood, user_id, user.blood,user.user);
    })
    .catch(error=>console.log(error))
  
    const acceptEventFormFinalSubmition = (event_id, event_blood, user_id, user_blood,username) =>
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
                    document.getElementById('accepted_doner').textContent = username;
                    document.getElementById('accepted_blood').textContent = user_blood;
 
                    // window.location.reload(); 
                })
                .catch(error => {
                     pushAlert('alert',`Not submited the form, try again!`);

                
            })
        } 

    }


};