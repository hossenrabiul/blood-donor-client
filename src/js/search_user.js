const setDistrict = () => {
  const districtSelect = document.getElementById('district');

  // Fetch the district data from the API
  fetch('https://bdapi.vercel.app/api/v.1/district')
    .then(res => res.json())
    .then(data => {
      districts = data['data']
      console.log(districts);



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

setDistrict();


document.getElementById('search-form').addEventListener('keydown', function (event) {

  if (event.key === 'Enter') {
    event.preventDefault();  // Prevent form submission on Enter key press
    document.getElementById("search-button").click();  // Simulate click on the search button
  }
});

// Load all profiles on page load
document.addEventListener("DOMContentLoaded", function () {
  allUserProfile({}); // Fetch and display all profiles without filters
});

// Handle Search Button Click
document.getElementById("search-button").addEventListener("click", function () {

  is_authticated();
  const form = document.getElementById("search-form");
  const formData = new FormData(form);

  // Collect all form data as a key-value pair
  const data = {};
  formData.forEach((value, key) => {
    if (value) data[key] = value; // Add only non-empty fields
  });

  // Call API with search filters
  allUserProfile(data);

  // Display the form data in the console for debugging
  console.log("Form Data:", data);
});

// Reset filters
document.getElementById("reset-filters").addEventListener("click", function () {
  document.getElementById("search-form").reset();
  document.getElementById("user-list").innerHTML = ""; // Clear results
  document.getElementById("results").innerHTML = ""; // Clear debug results

  // Reload all profiles after resetting
  allUserProfile({});
});

// Fetch all user profiles and filter them based on search criteria
const allUserProfile = (search) => {
  const ul = document.getElementById("user-list");



  // Build query string from the search object
  const queryString = new URLSearchParams(search).toString();

  fetch(`https://datadonor-webapp.vercel.app/accounts/profiles/?${queryString}`)
    .then((res) => res.json())
    .then((data) => searchResult(data, search))
    .catch((error) => {
      ul.innerHTML = '<li class="text-center text-red-500">Failed to fetch profiles.</li>';
      console.error("Error fetching profiles:", error);
    });
};

// Filter profiles and update the UI
const searchResult = (data, search) => {


  const ul = document.getElementById("user-list");
  ul.innerHTML = ''; // Clear previous results

  if (data.length === 0) {
    ul.innerHTML = '<li class="text-center text-gray-500">No profiles found matching your criteria.</li>';
    return;
  }

  let allUser = '';

  for (const profile of data) {

    if (
      ("search" in search &&
        !(
          profile.first_name.toLowerCase().includes(search.search.toLowerCase()) ||
          profile.last_name.toLowerCase().includes(search.search.toLowerCase()) ||
          profile.email.toLowerCase().includes(search.search.toLowerCase())
        )) ||
      ("blood_group" in search && search.blood_group !== profile.blood) ||
      ("district" in search && search.district !== profile.divition) ||
      ("gender" in search && search.gender !== profile.gender)
    ) {
      continue; // Skip profiles that don't match
    };


    allUser += `
            <li class="flex items-center p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"  data-aos="fade-up">
              <div class="flex items-center space-x-4">
              <a href="./guest_profile.html"   onclick="guestProfile('${profile.user_id}')">
                <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  <img src="${profile.image ? profile.image : 'https://via.placeholder.com/150'}" alt="User Avatar" class="object-cover w-full h-full">
                </div>
              </a> 
              <a href="./guest_profile.html"   onclick="guestProfile('${profile.user_id}')"> 
                <div>
                  <span class="relative inline-block">
                    <span class="text-lg font-semibold text-gray-800">${profile.first_name} ${profile.last_name}</span>
                    <span class="tracking-[1px] font-medium absolute -top-1 -left-12 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-2 py-1 rounded-full shadow-lg border border-white">
                      ${profile.blood}
                    </span>
                  </span>
                  <p class="text-sm">@ ${profile.user}</p>
                  <p class="text-sm text-gray-500"> 
                    <span class="font-medium">District:</span> ${profile.divition}, ${profile.country},
                    <span class="font-medium">Gender:</span> ${profile.gender}
                  </p>
                </div>
              </div>
                </a> 
              <div class="ml-auto">
              <a  href="./guest_profile.html"  onclick="guestProfile('${profile.user_id}')">
                <button class="px-5 py-2 bg-gray-300 text-gray-800  rounded-lg shadow focus:outline-none focus:ring focus:ring-blue-300 group">
                  <span class="inline-block transition-transform duration-200 group-hover:scale-105" >
                    Contact </span> 
                  </button>
              </a>
              </div>
            </li>
        `;
  }
  ul.innerHTML = allUser;
};

allUserProfile({});


const userInfoModel = (user_id) => {
  localStorage.setItem('guest_id', user_id);
  console.log(user_id);
};



