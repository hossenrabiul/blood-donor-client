
if ('token' in localStorage)
{
  window.location.href = 'index.html'
}

const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');

const demoUser = () => {
  
  document.getElementById('username').value = 'robiul';
  document.getElementById('password').value = '12345';

}


loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from reloading the page
    pushAlert('processing','wait few sec.')

    // Get form data
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;


    if ((username, password)) {
        fetch("https://datadonor-webapp.vercel.app/accounts/login/", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ username, password }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
    
              if (data.token && data.user_id) {
                //  sessionStorage.setItem('session_token', data.token);

              localStorage.setItem("token", data.token);
              localStorage.setItem("user_id", data.user_id);
              window.location.href = "index.html";
            }
          });
      }
 
}); 