document.addEventListener('DOMContentLoaded', () => {
    const courts = document.querySelectorAll('.court');
    const rulesList = document.getElementById('rulesList');
    const homeBtn = document.getElementById('homeBtn');
    const bookingsBtn = document.getElementById('bookingsBtn');
    const profileBtn = document.getElementById('profileBtn');
    const currentDateEl = document.getElementById('currentDate');
    const prevDateBtn = document.getElementById('prevDate');
    const nextDateBtn = document.getElementById('nextDate');

    let currentDate = new Date();

    const rules = [
        "Bookings are limited to 1 hour per session.",
        "Please arrive 5 minutes before your booking time.",
        "Cancellations must be made at least 2 hours in advance.",
        "Proper petanque equipment is required.",
        "Please be respectful of other players and staff."
    ];

    function updateDateDisplay() {
        currentDateEl.textContent = currentDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }

    function changeDate(days) {
        currentDate.setDate(currentDate.getDate() + days);
        updateDateDisplay();
    }

    updateDateDisplay();

    prevDateBtn.addEventListener('click', () => changeDate(-1));
    nextDateBtn.addEventListener('click', () => changeDate(1));

    rules.forEach(rule => {
        const li = document.createElement('li');
        li.textContent = rule;
        rulesList.appendChild(li);
    });

    courts.forEach(court => {
        court.addEventListener('click', () => {
            const courtName = court.textContent;
            const bookingDate = currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            alert(`You've selected ${courtName} for ${bookingDate}. Booking functionality to be implemented.`);
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
});