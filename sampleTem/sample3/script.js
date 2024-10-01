document.addEventListener('DOMContentLoaded', () => {
    const mainPage = document.getElementById('mainPage');
    const bookingsPage = document.getElementById('bookingsPage');
    const myBookingsPage = document.getElementById('myBookingsPage');
    const courts = document.querySelectorAll('.court');
    const rulesList = document.getElementById('rulesList');
    const homeBtn = document.getElementById('homeBtn');
    const bookingsBtn = document.getElementById('bookingsBtn');
    const myBookingsBtn = document.getElementById('myBookingsBtn');
    const backButtons = document.querySelectorAll('.back-button');
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthEl = document.getElementById('currentMonth');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const timeSlotsContainer = document.getElementById('timeSlots');
    const timeSlotsGrid = document.getElementById('timeSlotsGrid');
    const courtSelector = document.getElementById('courtSelector');
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modalText');
    const confirmBookingBtn = document.getElementById('confirmBooking');
    const cancelBookingBtn = document.getElementById('cancelBooking');
    const bookingsList = document.getElementById('bookingsList');

    let currentDate = new Date();
    let selectedCourt = '';
    let selectedDate = null;
    let selectedTime = '';
    let myBookings = [];

    const rules = [
        "Bookings are limited to 1 hour per session.",
        "Please arrive 5 minutes before your booking time.",
        "Cancellations must be made at least 2 hours in advance.",
        "Proper petanque equipment is required.",
        "Please be respectful of other players and staff.",
        "Please be respectful of other players and staff.",
        "Please be respectful of other players and staff.",
        "Please be respectful of other players and staff.",
        "Please be respectful of other players and staff.",
        "Please be respectful of other players and staff."
    ];

    rules.forEach(rule => {
        const li = document.createElement('li');
        li.textContent = rule;
        rulesList.appendChild(li);
    });

    ['A', 'B', 'C', 'D', 'E'].forEach(court => {
        const button = document.createElement('button');
        button.textContent = `Court ${court}`;
        button.addEventListener('click', () => selectCourt(court));
        courtSelector.appendChild(button);
    });

    courts.forEach(court => {
        court.addEventListener('click', () => {
            selectCourt(court.dataset.court);
            showBookingsPage();
        });
    });

    function selectCourt(court) {
        selectedCourt = court;
        document.querySelectorAll('#courtSelector button').forEach(btn => {
            btn.classList.toggle('active', btn.textContent === `Court ${court}`);
        });
    }
    // Continue from selectCourt function
    function showBookingsPage() {
        mainPage.style.display = 'none';
        bookingsPage.style.display = 'block';
        loadTimeSlots(selectedCourt, currentDate);
    }

    function loadTimeSlots(court, date) {
        // Placeholder logic for loading time slots for the selected court and date
        timeSlotsGrid.innerHTML = ''; // Clear any existing slots
        const timeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM'];
        
        timeSlots.forEach(time => {
            const timeSlot = document.createElement('button');
            timeSlot.textContent = time;
            timeSlot.addEventListener('click', () => selectTimeSlot(time));
            timeSlotsGrid.appendChild(timeSlot);
        });
    }

    function selectTimeSlot(time) {
        selectedTime = time;
        timeSlotsGrid.querySelectorAll('button').forEach(btn => {
            btn.classList.toggle('selected', btn.textContent === time);
        });
        showModal(`Confirm booking for Court ${selectedCourt} at ${selectedTime}?`);
    }

    function showModal(message) {
        modalText.textContent = message;
        modal.style.display = 'block'; // Show the modal
    }

    confirmBookingBtn.addEventListener('click', () => {
        addBooking(selectedCourt, selectedDate, selectedTime);
        modal.style.display = 'none'; // Hide the modal
    });

    cancelBookingBtn.addEventListener('click', () => {
        modal.style.display = 'none'; // Hide the modal
    });

    function addBooking(court, date, time) {
        myBookings.push({ court, date, time });
        updateMyBookingsPage();
        alert(`Booking confirmed for Court ${court} at ${time}`);
    }

    function updateMyBookingsPage() {
        bookingsList.innerHTML = ''; // Clear previous bookings
        myBookings.forEach((booking, index) => {
            const li = document.createElement('li');
            li.textContent = `Court ${booking.court} - ${booking.date.toDateString()} at ${booking.time}`;
            const cancelBtn = document.createElement('button');
            cancelBtn.textContent = 'Cancel';
            cancelBtn.addEventListener('click', () => cancelBooking(index));
            li.appendChild(cancelBtn);
            bookingsList.appendChild(li);
        });
    }

    function cancelBooking(index) {
        myBookings.splice(index, 1);
        updateMyBookingsPage();
    }

    // Calendar Navigation Logic
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    });

    function updateCalendar() {
        currentMonthEl.textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
        // Here you can load available dates or refresh the calendar grid based on the currentDate
    }

    // Initialize the page
    updateCalendar();

    homeBtn.addEventListener('click', () => {
        mainPage.style.display = 'block';
        bookingsPage.style.display = 'none';
        myBookingsPage.style.display = 'none';
    });

    bookingsBtn.addEventListener('click', () => {
        mainPage.style.display = 'none';
        bookingsPage.style.display = 'block';
        myBookingsPage.style.display = 'none';
    });

    myBookingsBtn.addEventListener('click', () => {
        mainPage.style.display = 'none';
        bookingsPage.style.display = 'none';
        myBookingsPage.style.display = 'block';
        updateMyBookingsPage();
    });

    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            mainPage.style.display = 'block';
            bookingsPage.style.display = 'none';
            myBookingsPage.style.display = 'none';
        });
    });
});
    