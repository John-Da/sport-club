document.addEventListener('DOMContentLoaded', () => {
    const mainPage = document.getElementById('mainPage');
    const courtAPage = document.getElementById('courtAPage');
    const courts = document.querySelectorAll('.court');
    const rulesList = document.getElementById('rulesList');
    const homeBtn = document.getElementById('homeBtn');
    const bookingsBtn = document.getElementById('bookingsBtn');
    const profileBtn = document.getElementById('profileBtn');
    const backButton = document.getElementById('backButton');
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthEl = document.getElementById('currentMonth');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const timeSlotsContainer = document.getElementById('timeSlots');
    const timeSlotsGrid = document.getElementById('timeSlotsGrid');

    let currentDate = new Date();

    const rules = [
        "Bookings are limited to 1 hour per session.",
        "Please arrive 5 minutes before your booking time.",
        "Cancellations must be made at least 2 hours in advance.",
        "Proper petanque equipment is required.",
        "Please be respectful of other players and staff."
    ];

    rules.forEach(rule => {
        const li = document.createElement('li');
        li.textContent = rule;
        rulesList.appendChild(li);
    });

    courts.forEach(court => {
        court.addEventListener('click', () => {
            if (court.dataset.court === 'A') {
                mainPage.style.display = 'none';
                courtAPage.style.display = 'block';
                renderCalendar();
            } else {
                alert(`You've selected ${court.textContent}. Booking functionality to be implemented.`);
            }
        });
    });

    function setActiveNav(button) {
        [homeBtn, bookingsBtn, profileBtn].forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    }

    homeBtn.addEventListener('click', () => setActiveNav(homeBtn));
    bookingsBtn.addEventListener('click', () => {
        setActiveNav(bookingsBtn);
        alert('Bookings page to be implemented');
    });
    profileBtn.addEventListener('click', () => {
        setActiveNav(profileBtn);
        alert('Profile page to be implemented');
    });

    backButton.addEventListener('click', () => {
        courtAPage.style.display = 'none';
        mainPage.style.display = 'block';
    });

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();

        currentMonthEl.textContent = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentDate);

        calendarGrid.innerHTML = '';
        for (let i = 0; i < firstDay.getDay(); i++) {
            calendarGrid.appendChild(document.createElement('div'));
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayEl = document.createElement('div');
            dayEl.classList.add('calendar-day');
            dayEl.textContent = day;
            dayEl.addEventListener('click', () => showTimeSlots(new Date(year, month, day)));
            calendarGrid.appendChild(dayEl);
        }
    }

    function showTimeSlots(date) {
        timeSlotsContainer.style.display = 'block';
        timeSlotsGrid.innerHTML = '';
        const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
        timeSlots.forEach(slot => {
            const button = document.createElement('button');
            button.classList.add('time-slot');
            button.textContent = slot;
            button.addEventListener('click', () => bookSlot(date, slot));
            timeSlotsGrid.appendChild(button);
        });
    }

    function bookSlot(date, time) {
        alert(`You've booked Court A on ${date.toDateString()} at ${time}. Booking confirmed!`);
        courtAPage.style.display = 'none';
        mainPage.style.display = 'block';
    }

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
});