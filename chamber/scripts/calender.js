document.addEventListener('DOMContentLoaded', function() {
  const calendarContainer = document.getElementById('calendar-container');

  function renderCalendar(month, year) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let calendarHTML = `
      <div class="calendar-header">
        <button id="prev-month">Prev</button>
        <span>${new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
        <button id="next-month">Next</button>
      </div>
      <div class="calendar-grid">
        <div class="day-header">Sun</div>
        <div class="day-header">Mon</div>
        <div class="day-header">Tue</div>
        <div class="day-header">Wed</div>
        <div class="day-header">Thu</div>
        <div class="day-header">Fri</div>
        <div class="day-header">Sat</div>
    `;

    let day = 1;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          calendarHTML += '<div></div>';
        } else if (day > daysInMonth) {
          break;
        } else {
          const date = new Date(year, month, day);
          const isCurrentDate = date.toDateString() === new Date().toDateString();
          calendarHTML += `<div class="${isCurrentDate ? 'current-date' : ''}">${day}</div>`;
          day++;
        }
      }
    }

    calendarHTML += '</div>';
    calendarContainer.innerHTML = calendarHTML;

    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');

    prevMonthButton.addEventListener('click', () => {
      month--;
      if (month < 0) {
        month = 11;
        year--;
      }
      renderCalendar(month, year);
    });

    nextMonthButton.addEventListener('click', () => {
      month++;
      if (month > 11) {
        month = 0;
        year++;
      }
      renderCalendar(month, year);
    });
  }


  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  renderCalendar(currentMonth, currentYear);
});


const visitsDisplay = document.querySelector(".visits");
const lastVisitDate = window.localStorage.getItem("lastVisitDate");
const currentDate = new Date().getTime();
let message;

if (!lastVisitDate) {
    message = "Welcome! Let us know if you have any questions.";
} else {
    const daysSinceLastVisit = Math.floor((currentDate - new Date(lastVisitDate).getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSinceLastVisit < 1) {
        message = "Back so soon! Awesome!";
    } else {
        message = `You last visited ${daysSinceLastVisit} ${daysSinceLastVisit === 1 ? 'day' : 'days'} ago.`;
    }
}

visitsDisplay.textContent = message;
window.localStorage.setItem("lastVisitDate", new Date().toString());

