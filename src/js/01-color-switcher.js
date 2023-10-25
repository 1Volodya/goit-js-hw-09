function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.body;


let intervalId = null;
stopButton.disabled = true;

startButton.addEventListener('click', onStartClick);
stopButton.addEventListener('click', onStopClick);

function onStartClick() {
  if (intervalId) {
    return;
  }
    intervalId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    startButton.disabled = true;
    stopButton.disabled = false;
};

function onStopClick() {
    clearInterval(intervalId);
    intervalId = null;
    startButton.disabled = false;
    stopButton.disabled = true;
}



