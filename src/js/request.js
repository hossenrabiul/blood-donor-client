 
    document.getElementById("create-event-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page reload

        const formData = new FormData(event.target);
        const eventData = Object.fromEntries(formData);

        console.log("Event Created:", eventData);
        pushAlert('success',"Blood donation event created successfully!");

        event.target.reset(); // Clear the form
    }); 