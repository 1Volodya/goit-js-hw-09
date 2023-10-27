import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      Notify.failure('Please choose a future date');
      startButton.disabled = true;
      startButton.style.pointerEvents = 'none';
    } else {
      startButton.disabled = false;
      startButton.style.pointerEvents = 'auto';
    }
  },
});

let countdownInterval;

startButton.addEventListener('click', () => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  const selectedDate = new Date(datetimePicker.value).getTime();
  const currentDate = new Date().getTime();
  let timeRemaining = selectedDate - currentDate;

  if (timeRemaining <= 0) {
    Notify.failure('Please choose a date in the future');
    return;
  }

  countdownInterval = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(timeRemaining);
    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);

    if (timeRemaining <= 1000) {
      clearInterval(countdownInterval);
      daysElement.textContent = '00';
      hoursElement.textContent = '00';
      minutesElement.textContent = '00';
      secondsElement.textContent = '00';
      Notify.success('Countdown Finished');
    }

    timeRemaining -= 1000;
  }, 1000);
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
