 
const handlelogOut = () => {  
  pushAlert('processing','wait few sec.')
  
    const token = localStorage.getItem("token"); 

    console.log("logout working")
    fetch("https://datadonor-webapp.vercel.app/accounts/logout/", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => { 
        localStorage.removeItem("token");
        localStorage.removeItem("user_id"); 
        window.location.href = 'index.html'
      });
  };
  