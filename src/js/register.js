 
if ('token' in localStorage)
  {
    window.location.href = 'index.html'
  }


  // Handle form submission
  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from submitting the traditional way
    pushAlert('processing','Please wait few sec,stay in the page!')
    // Collect form data
    const username = document.getElementById("username").value;
    const firstName = document.getElementById("first_name").value;
    const lastName = document.getElementById("last_name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const blood = document.getElementById("blood_group").value;

    // Validate password confirmation
    if (password !== confirmPassword) {
      pushAlert('alert',"Passwords do not match.");
      return;
    }

    // Create the user data object
    const userData = {
      username: username,
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      confirm_password : confirmPassword,
      blood: blood
    };

    // Send the user data to the API using fetch
    fetch("https://datadonor-webapp.vercel.app/accounts/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData) // Convert the object to a JSON string
    })
      .then(response => response.json())
      .then(data => {
        console.log("Responcee", data);
        if (data == 'Done') {
          
          pushAlert('success', "Registration successful! Plase go to you email and varify account !"); 
          window.location.href = "/feedback/mail_varification_page.html";
          pushAlert('success', "Registration successful! Plase go to you email and varify account !");
        }
        if ('auth' in data || 'username' in data)
        { 
          let errorMessage = 'auth' in data ? data['auth'] : data['username'][0];
          pushAlert('alert', errorMessage); 
          return;
        } 
        
      }) 
      .catch(error => {
        console.log('Registraion Error : ', error);
    })
  }); 