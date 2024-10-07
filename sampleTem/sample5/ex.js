document.addEventListener('DOMContentLoaded', () => {
    const bookingTimesList = document.getElementById('booking-times-list');
    const navButtons = document.querySelectorAll('.bottom-nav button');

    // Sample data for available court times
    const availableTimes = [
        { court: 'Court A', time: '2:00 PM', duration: '2 hr(s)', price: '56 Baht' },
        { court: 'Court A', time: '4:00 PM', duration: '2 hr(s)', price: '56 Baht' },
        { court: 'Court A', time: '4:00 PM', duration: '2 hr(s)', price: '56 Baht' },
        { court: 'Court A', time: '4:00 PM', duration: '2 hr(s)', price: '56 Baht' },
        { court: 'Court A', time: '4:00 PM', duration: '2 hr(s)', price: '56 Baht' },
        { court: 'Court A', time: '4:00 PM', duration: '2 hr(s)', price: '56 Baht' },
        { court: 'Court A', time: '4:00 PM', duration: '2 hr(s)', price: '56 Baht' },
        { court: 'Court A', time: '9:00 PM', duration: '1 hr(s)', price: '56 Baht' },
    ];

    // Populate available times
    function populateAvailableTimes() {
        bookingTimesList.innerHTML = '';
        availableTimes.forEach(time => {
            const courtItem = document.createElement('button');
            courtItem.className = 'court-item';
            courtItem.innerHTML = `
                <p class="item-title">${time.court}</p>
                <p class="item-time">Time: ${time.time}</p>
                <p class="item-duration">Duration: ${time.duration}</p>
                <p class="item-price">Price: ${time.price}</p>
            `;
            courtItem.addEventListener('click', () => bookCourt(time));
            bookingTimesList.appendChild(courtItem);
        });
    }

    // Book a court
    function bookCourt(time) {
        alert(`You've booked ${time.court} at ${time.time} for ${time.duration}`);
        // Here you would typically send this data to your server
    }

    // Handle navigation
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            // Here you would typically change the view based on the clicked button
        });
    });

    // Initialize
    populateAvailableTimes();

    // Calendar functionality would go here
    // For example, you might use a library like FullCalendar or implement your own

    // Search functionality
    const searchBar = document.querySelector('.search-bar');
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredTimes = availableTimes.filter(time => 
            time.court.toLowerCase().includes(searchTerm) ||
            time.time.toLowerCase().includes(searchTerm)
        );
        bookingTimesList.innerHTML = '';
        filteredTimes.forEach(time => {
            const courtItem = document.createElement('button');
            courtItem.className = 'court-item';
            courtItem.innerHTML = `
                <p class="item-title">${time.court}</p>
                <p class="item-time">Time: ${time.time}</p>
                <p class="item-duration">Duration: ${time.duration}</p>
                <p class="item-price">Price: ${time.price}</p>
            `;
            courtItem.addEventListener('click', () => bookCourt(time));
            bookingTimesList.appendChild(courtItem);
        });
    });
});