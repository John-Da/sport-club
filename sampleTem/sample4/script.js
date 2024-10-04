

// ------------------------------------ HOME ----------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const homeBtn = document.getElementById('homeBtn');
    const bookingsBtn = document.getElementById('bookingsBtn');
    const profileBtn = document.getElementById('profileBtn');

    // Set up event listeners for each button
    homeBtn.addEventListener('click', () => {
        window.location.href = 'index.html'; // Replace with the correct path to the Home page
    });

    bookingsBtn.addEventListener('click', () => {
        window.location.href = 'bookings.html'; // Replace with the correct path to the Bookings page
    });

    profileBtn.addEventListener('click', () => {
        window.location.href = 'profile.html'; // Replace with the correct path to the Profile page
    });
});



// ------------------------------------ BOOKINGs ----------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const bookingTimesList = document.getElementById('booking-times-list');
    const navButtons = document.querySelectorAll('.bottom-nav button');
    const calendarDays = document.getElementById('calendarDays');
    const currentMonthElement = document.getElementById('currentMonth');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const availableTimesTitle = document.querySelector('.available-times-title');
    const searchBar = document.querySelector('.search-bar');

    let currentDate = new Date();
    let selectedDate = null;

    // Sample data for available court times
    const availableTimes = [
        { court: 'Court A', time: '2:00 PM', duration: '2 hr(s)', price: '56 Baht' },
        { court: 'Court A', time: '4:00 PM', duration: '2 hr(s)', price: '56 Baht' },
        { court: 'Court A', time: '4:00 PM', duration: '2 hr(s)', price: '56 Baht' },
        { court: 'Court A', time: '4:00 PM', duration: '2 hr(s)', price: '56 Baht' },
        { court: 'Court A', time: '4:00 PM', duration: '2 hr(s)', price: '56 Baht' },
        { court: 'Court A', time: '4:00 PM', duration: '2 hr(s)', price: '56 Baht' },
        { court: 'Court A', time: '4:00 PM', duration: '2 hr(s)', price: '56 Baht' },
        { court: 'Court A', time: '4:00 PM', duration: '2 hr(s)', price: '56 Baht' },
        { court: 'Court A', time: '9:00 PM', duration: '1 hr(s)', price: '56 Baht' },
    ];

    // Populate available times dynamically
    function populateAvailableTimes(filteredTimes = availableTimes) {
        bookingTimesList.innerHTML = '';
        filteredTimes.forEach(time => {
            const courtItem = document.createElement('button');
            courtItem.className = 'court-item';
            courtItem.innerHTML = `
                <p class="item-title">${time.court}</p>
                <p class="item-time info">Time: ${time.time}</p>
                <p class="item-duration info">Duration: ${time.duration}</p>
                <p class="item-price info">Price: ${time.price}</p>
            `;
            courtItem.addEventListener('click', () => bookCourt(time));
            bookingTimesList.appendChild(courtItem);
        });
    }

    // Handle booking action
    function bookCourt(time) {
        if (selectedDate) {
            const formattedDate = selectedDate.toLocaleDateString();
            alert(`You've booked ${time.court} on ${formattedDate} at ${time.time} for ${time.duration}`);
        } else {
            alert('Please select a date before booking.');
        }
    }

    // Update calendar
    function updateCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        currentMonthElement.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        calendarDays.innerHTML = '';

        // Fill calendar with empty days
        for (let i = 0; i < firstDay.getDay(); i++) {
            calendarDays.appendChild(document.createElement('div'));
        }

        // Fill calendar with active days
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            dayElement.textContent = day;

            const currentDateToCompare = new Date(year, month, day);
            if (currentDateToCompare < new Date().setHours(0, 0, 0, 0)) {
                dayElement.classList.add('disabled');
            } else {
                dayElement.addEventListener('click', () => selectDate(new Date(year, month, day)));
            }

            if (day === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
                dayElement.classList.add('today');
            }

            if (selectedDate && day === selectedDate.getDate() && year === selectedDate.getFullYear() && month === selectedDate.getMonth()) {
                dayElement.classList.add('selected');
            }

            calendarDays.appendChild(dayElement);
        }
    }

    // Handle date selection
    function selectDate(date) {
        selectedDate = date;
        updateCalendar();
        populateAvailableTimes();
    }

    // Handle month navigation
    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    });

    // Handle bottom navigation button states
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Handle search functionality
    // searchBar.addEventListener('input', (e) => {
    //     const searchTerm = e.target.value.toLowerCase();
    //     const filteredTimes = availableTimes.filter(time => 
    //         time.court.toLowerCase().includes(searchTerm) ||
    //         time.time.toLowerCase().includes(searchTerm)
    //     );
    //     populateAvailableTimes(filteredTimes);
    // });

    // Sticky header behavior
    function handleScroll() {
        const rect = availableTimesTitle.getBoundingClientRect();
        if (rect.top <= 0) {
            availableTimesTitle.classList.add('sticky');
        } else {
            availableTimesTitle.classList.remove('sticky');
        }
    }

    // Add scroll event listener for sticky header
    window.addEventListener('scroll', handleScroll);

    // Initialize calendar and available times
    updateCalendar();
    populateAvailableTimes();
});

document.addEventListener('DOMContentLoaded', () => {
    const bookingTimesList = document.getElementById('booking-times-list');
    const filterBtn = document.getElementById('filterBtn');
    const courtFilter = document.getElementById('courtFilter');
    const durationFilter = document.getElementById('durationFilter');

    const availableTimes = [
        { court: 'Court A', time: '2:00 PM', duration: '2 hr(s)', price: '56 Baht' },
        { court: 'Court B', time: '4:00 PM', duration: '2 hr(s)', price: '56 Baht' },
        { court: 'Court C', time: '6:00 PM', duration: '1 hr(s)', price: '30 Baht' },
        { court: 'Court D', time: '8:00 PM', duration: '2 hr(s)', price: '60 Baht' },
        { court: 'Court E', time: '9:00 PM', duration: '1 hr(s)', price: '50 Baht' },
    ];

    // Populate available times dynamically
    function populateAvailableTimes(filteredTimes = availableTimes) {
        bookingTimesList.innerHTML = '';
        filteredTimes.forEach(time => {
            const courtItem = document.createElement('button');
            courtItem.className = 'court-item';
            courtItem.innerHTML = `
                <p class="item-title">${time.court}</p>
                <p class="item-time info">Time: ${time.time}</p>
                <p class="item-duration info">Duration: ${time.duration}</p>
                <p class="item-price info">Price: ${time.price}</p>
            `;
            courtItem.addEventListener('click', () => bookCourt(time));
            bookingTimesList.appendChild(courtItem);
        });
    }

    // Handle booking action
    function bookCourt(time) {
        alert(`You've booked ${time.court} at ${time.time} for ${time.duration}`);
    }

    // Filter function
    function filterTimes() {
        const selectedCourt = courtFilter.value;
        const selectedDuration = durationFilter.value;

        const filteredTimes = availableTimes.filter(time => {
            const courtMatch = selectedCourt === 'all' || time.court === selectedCourt;
            const durationMatch = selectedDuration === 'all' || time.duration === selectedDuration;
            return courtMatch && durationMatch;
        });

        populateAvailableTimes(filteredTimes);
    }

    // Attach filter button event
    filterBtn.addEventListener('click', filterTimes);

    // Initialize the available times on page load
    populateAvailableTimes();
});

