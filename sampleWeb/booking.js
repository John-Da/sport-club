document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.getElementById('calendar');
    const availableTimes = document.getElementById('availableTimes');
    const bookingForm = document.getElementById('bookingForm');
    const bookingDetails = document.getElementById('bookingDetails');
    const cancelButton = document.getElementById('cancelButton');

    let currentDate = new Date();

    function renderCalendar() {
        calendar.innerHTML = '';
        
        const monthYear = document.createElement('div');
        monthYear.className = 'calendar-header';
        monthYear.innerHTML = `
            <button id="prevMonth">&lt;</button>
            <h2>${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}</h2>
            <button id="nextMonth">&gt;</button>
        `;
        calendar.appendChild(monthYear);

        const daysGrid = document.createElement('div');
        daysGrid.className = 'calendar-grid';

        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        for (let i = 0; i < firstDay.getDay(); i++) {
            daysGrid.appendChild(document.createElement('div'));
        }

        for (let i = 1; i <= lastDay.getDate(); i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = i;
            dayElement.addEventListener('click', () => selectDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), i)));
            daysGrid.appendChild(dayElement);
        }

        calendar.appendChild(daysGrid);

        document.getElementById('prevMonth').addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });

        document.getElementById('nextMonth').addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
    }

    function selectDate(date) {
        document.querySelectorAll('.calendar-day').forEach(day => day.classList.remove('active'));
        event.target.classList.add('active');
        showAvailableTimes(date);
    }

    function showAvailableTimes(date) {
        // Simulated available times
        const times = ['10:00', '11:00', '14:00', '15:00', '16:00'];
        availableTimes.innerHTML = '';
        times.forEach(time => {
            const timeSlot = document.createElement('div');
            timeSlot.className = 'time-slot';
            timeSlot.textContent = time;
            timeSlot.addEventListener('click', () => showBookingForm(date, time));
            availableTimes.appendChild(timeSlot);
        });
    }

    function showBookingForm(date, time) {
        bookingForm.classList.remove('hidden');
        document.getElementById('courtName').value = 'Court 1';
        document.getElementById('bookingDate').value = date.toDateString();
        document.getElementById('bookingTime').value = time;
        document.getElementById('price').value = '$20.00';
    }

    cancelButton.addEventListener('click', () => {
        bookingForm.classList.add('hidden');
    });

    bookingDetails.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Booking confirmed!');
        bookingForm.classList.add('hidden');
    });

    renderCalendar();
});