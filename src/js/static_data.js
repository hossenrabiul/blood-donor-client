const OutImfectSoFar = () => {
    const total_user = document.getElementById('total_user');
    const total_event = document.getElementById('total_event');
    const total_event_completed = document.getElementById('total_event_completed');

    fetch('https://datadonor-webapp.vercel.app/event/events/')
        .then(res => res.json())
        .then(data => {
            total_event.innerText = data.length;
        })

    fetch('https://datadonor-webapp.vercel.app/accounts/users/')
        .then(res => res.json())
        .then(data => {
            total_user.innerText = data.length;
        })

    fetch('https://datadonor-webapp.vercel.app/event/events/?status=Completed')
        .then(res => res.json())
        .then(data => {
            total_event_completed.innerText = data.length;
        })
}
OutImfectSoFar();
const RecentEvent = () => {
    const slider = document.getElementById('related-books-slider');

    fetch('https://datadonor-webapp.vercel.app/event/events/')
        .then(res => res.json())
        .then(data => {
            let count = 0;
            data.forEach(event => {
                if (count < 6) {
                    const div = document.createElement('div');
                    div.className = 'bg-white p-6 rounded-lg shadow-lg m-4 py-8 relative max-w-xs';
                    div.innerHTML = `
                        <!-- Title -->
                        <h3 class="text-2xl font-semibold text-red-600">${event.title}</h3>
                        <div class="flex justify-between items-center">
                            <p class="text-sm text-gray-600">Location: <span class="font-medium">${event.location}</span></p>
                            <span class="absolute top-4 right-4 text-md font-bold text-red-600 px-2 py-1 bg-red-100 rounded-full">${event.blood}</span>
                        </div>
                        <p class="text-sm text-gray-600">Date: <span class="font-medium">${event.event_date}</span></p>
                        <p class="text-sm text-gray-700 pt-4 pb-2">Your contribution can save a life!</p>
                    `;
                    slider.appendChild(div);
                    count++;
                }
            });

            // Initialize Slick Slider after dynamic content is loaded
            $('.related-books-slider').slick({
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 1000,
                arrows: true,
                prevArrow: $('.slick-prev'),
                nextArrow: $('.slick-next'),
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        });
};

RecentEvent();
