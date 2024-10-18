document.addEventListener('DOMContentLoaded', () => {
    const bookingTimesList = document.getElementById('booking-times-list');
    const filterBtn = document.getElementById('filterBtn');
    const courtFilter = document.getElementById('courtFilter');
    const durationFilter = document.getElementById('durationFilter');
    const calendarDays = document.getElementById('calendarDays');
    const currentMonthElement = document.getElementById('currentMonth');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const availableTimesTitle = document.querySelector('.available-times-title');

    
    let currentDate = new Date();
    let selectedDate = null;


    function selectDate(date) {
        selectedDate = date;
        updateCalendar();
        fetchAvailableTimes(); 
    }

    function updateCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        currentMonthElement.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        calendarDays.innerHTML = '';

        // Fill empty days at the start of the month
        for (let i = 0; i < firstDay.getDay(); i++) {
            calendarDays.appendChild(document.createElement('div'));
        }

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

    // Filter times based on user selections
    function filterTimes() {
        fetchAvailableTimes();
    }

    function handleScroll() {
        const rect = availableTimesTitle.getBoundingClientRect();
        if (rect.top <= 0) {
            availableTimesTitle.classList.add('sticky');
        } else {
            availableTimesTitle.classList.remove('sticky');
        }
    }

    // Event listeners for filtering
    filterBtn.addEventListener('click', filterTimes);
    courtFilter.addEventListener('change', filterTimes);
    durationFilter.addEventListener('change', filterTimes);

    window.addEventListener('scroll', handleScroll);


    // Event listeners for month navigation
    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    });

    // Initialize calendar on page load

    updateCalendar();
});