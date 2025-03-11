
const setDistrict = () => {
    const districtSelect = document.getElementById('id_district');
        
    // Fetch the district data from the API
    fetch('https://bdapi.vercel.app/api/v.1/district')
        .then(res => res.json())
        .then(data => {
            districts = data['data']
 
             

            const defaultOption = document.createElement('option');
            defaultOption.textContent = "Select Division";
            districtSelect.appendChild(defaultOption);

            districts.forEach(district => {
                const option = document.createElement('option');
                option.value = district.name;
                option.textContent = district.name;
                districtSelect.appendChild(option);
            });
        
        }) 
        .catch(error => console.log(error));
} 
 
const setDivition = () => {
    const divitionSelect = document.getElementById('id_divition');
        
    // Fetch the district data from the API
    fetch('https://bdapi.vercel.app/api/v.1/division')
        .then(res => res.json())
        .then(data => {
            divitions = data['data']
  

            const defaultOption = document.createElement('option');
            defaultOption.textContent = "Select Division";
            divitionSelect.appendChild(defaultOption);

            divitions.forEach(divition => {
                const option = document.createElement('option');
                option.value = divition.name;
                option.textContent = divition.name;
                divitionSelect.appendChild(option);
            });
        
        }) 
        .catch(error => console.log(error));
} 

 


const InstanceData = () => {
    const form = document.getElementById('profile-update-form'); // Ensure the form has the correct ID
    const user_id = localStorage.getItem('user_id');

    // Fetch user profile data from the API
    fetch(`https://datadonor-webapp.vercel.app/accounts/profiles/?user_id=${user_id}`)
        .then((res) =>  res.json() )
        .then((data) =>  setFormValues(form, data[0]) )
        .catch((error) => console.log(error));

        const setFormValues = (form, user) => {
            console.log(user);
            if (!form) {
                console.error("Form not found");
                return;
            }
        
            // Set placeholders for text input fields
            form.elements["username"].value = user.user || "";
            form.elements["first_name"].value = user.first_name || "";
            form.elements["last_name"].value = user.last_name || "";
            form.elements["email"].value = user.email || "";
            form.elements["phone"].value = user.phone || "";
            form.elements["age"].value = user.age || "";  

            document.getElementById('preview_image').src = user.image 
            
            const blood = document.getElementById('id_blood');
            const firstblood = blood.options[0];   
            firstblood.value = user.blood ; 
            firstblood.textContent = user.blood; 
            firstblood.classList.add('bg-teal-600', 'text-white', 'font-semibold', 'p-2');  // Example Tailwind classes
             
            const gender = document.getElementById('id_gender');
            const firstGender = gender.options[0];   
            firstGender.value = user.gender ; 
            firstGender.textContent = user.gender; 
            firstGender.classList.add('bg-teal-600', 'text-white', 'font-semibold', 'p-2');  // Example Tailwind classes
             

            const district = document.getElementById('id_district');
            const firstdistrict = district.options[0];   
            firstdistrict.value = user.divition ; 
            firstdistrict.textContent = user.divition; 
            firstdistrict.classList.add('bg-teal-600', 'text-white', 'font-semibold', 'p-2');  // Example Tailwind classes

                
            const divition = document.getElementById('id_divition');
            const firstdivition= divition.options[0];   
            firstdivition.value = user.country ; 
            firstdivition.textContent = user.country; 
            firstdivition.classList.add('bg-teal-600', 'text-white', 'font-semibold', 'p-2');  // Example Tailwind classes


            form.elements["linkedin"].value = user.linkedin || "";
            form.elements["facebook"].value = user.facebook || "";
            form.elements["twitter"].value = user.twitter || "";
        
            // Set placeholder for image input
            const imageField = form.elements["image"];
            if (imageField) {
                imageField.value = "Upload a new image";
            }
        
            // Set the selected value for gender dropdown
            const genderField = form.elements["gender"];
            if (genderField) {
                genderField.value = user.gender || "";
            }
        
             
        };
        
};

setDistrict();
setDivition();
InstanceData();




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
  
      if (resData.success){ 
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
    // Wait for the DOM to be ready
    document.addEventListener("DOMContentLoaded", function() {
        const form = document.getElementById("profile-update-form");
        const user_id = localStorage.getItem('user_id') 
        console.log(user_id)


        form.addEventListener("submit", function (event)
        {
            
            event.preventDefault(); // Prevent the form from submitting normally

            // Get the form data
            const formData = new FormData(form);
            
            const formValues = {};
            formData.forEach((value, key) => {
                formValues[key] = value;
            });
 
            
            const data = {
                user: {
                    first_name: formData.get('first_name'),
                    last_name: formData.get('last_name'),
                    email: formData.get('email'),
                },
                profile: {
                    phone: formData.get('phone'),
                    age: formData.get('age'), 

                    gender: formData.get('gender'),
                    blood: formData.get('blood'),
                    divition: formData.get('district'),
                    country: formData.get('divition'),
                }
            };
 
          
 
            pushAlert('processing',"Wait few second!") 
            // Send PUT request to the API
            fetch(`https://datadonor-webapp.vercel.app/accounts/profiles/${user_id}/update-profile/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', // Ensure the request is sent as JSON
                    // 'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value // CSRF Token
                },
                body: JSON.stringify(data), // Send the data as JSON
            })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    pushAlert('success','Profile updated successfully');
                    console.log(data);
                    window.location.href = '/profile.html'
                    // Optionally, you can redirect or update the page here.
                }
            })
            .catch(error => {
                console.error('Error updating profile:', error);
                pushAlert('alert','Error updating profile. Please try again.');
            });
        });
    }); 