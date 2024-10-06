import { availableTimes } from './courtData.js';

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
    const filterBtn = document.getElementById('filterBtn');
    const courtFilter = document.getElementById('courtFilter');
    const durationFilter = document.getElementById('durationFilter');
    const bookingSection = document.querySelector('.booking-avialable-times');
    const navButtons = document.querySelectorAll('.bottom-nav button');
    const calendarDays = document.getElementById('calendarDays');
    const currentMonthElement = document.getElementById('currentMonth');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const availableTimesTitle = document.querySelector('.available-times-title');

    let currentDate = new Date();
    let selectedDate = null;


    if (window.location.pathname.includes('bookings.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const selectedCourt = urlParams.get('court');

        if (selectedCourt) {
            courtFilter.value = selectedCourt;
            bookingSection.style.display = 'block';
            filterTimes();
        } else {
            filterTimes();
        }
    }

    function populateAvailableTimes(filteredTimes) {
        bookingTimesList.innerHTML = '';
        if (filteredTimes.length === 0) {
            bookingTimesList.innerHTML = '<p>No available times match your selection.</p>';
            return;
        }
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

    function bookCourt(time) {
        // Check if selectedDate is set or if booking for today
        if (selectedDate || isToday(currentDate)) {
            const formattedDate = (selectedDate || new Date()).toLocaleDateString();
            alert(`You've booked ${time.court} on ${formattedDate} at ${time.time} for ${time.duration}`);
        } else {
            alert('Please select a date before booking.');
        }
    }
    
    // Helper function to check if a date is today
    function isToday(date) {
        const today = new Date();
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
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

    // Sticky header behavior
    function handleScroll() {
        const rect = availableTimesTitle.getBoundingClientRect();
        if (rect.top <= 0) {
            availableTimesTitle.classList.add('sticky');
        } else {
            availableTimesTitle.classList.remove('sticky');
        }
    }

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

    filterBtn.addEventListener('click', filterTimes);

    courtFilter.addEventListener('change', filterTimes);
    durationFilter.addEventListener('change', filterTimes);

    // Add scroll event listener for sticky header
    window.addEventListener('scroll', handleScroll);

    // Initialize calendar and available times
    updateCalendar();

    if (courtFilter.value !== 'all') {
        filterTimes();
    }
});

