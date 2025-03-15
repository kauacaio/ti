document.addEventListener('DOMContentLoaded', () => {
    const boasVindas = document.getElementById('boasVindas');
    setTimeout(() => {
        boasVindas.style.display = 'none';
    }, 5000);

});
const workTimeInput = document.getElementById('workTime');
const breakTimeInput = document.getElementById('breakTime');
const timerDisplay = document.querySelector('.time');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const editButton = document.getElementById('edit');
const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;
const darkModeToggle = document.getElementById('darkModeToggle');

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

let workTime = parseInt(workTimeInput.value) * 60;
let breakTime = parseInt(breakTimeInput.value) * 60;
let timeLeft = workTime;
let isWork = true;
let isPaused = true;
let timerInterval;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    document.title = `${timerDisplay.textContent} - ${isWork ? 'Trabalho' : 'Descanso'}`;
    setCircleDasharray();
}

function setCircleDasharray() {
    const time = isWork ? workTime : breakTime;
    const offset = circumference - timeLeft / time * circumference;
    circle.style.strokeDashoffset = offset;
    circle.style.stroke = isWork ? '#007AFF' : '#00D1FF';
}

function startTimer() {
    isPaused = false;
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timerInterval);
            isWork = !isWork;
            timeLeft = isWork ? workTime : breakTime;
            notify(isWork ? 'Hora de trabalhar!' : 'Hora de descansar!');
            startTimer();
        }
    }, 1000);
}

function pauseTimer() {
    isPaused = true;
    clearInterval(timerInterval);
}

function resetTimer() {
    isPaused = true;
    clearInterval(timerInterval);
    isWork = true;
    workTime = parseInt(workTimeInput.value) * 60;
    breakTime = parseInt(breakTimeInput.value) * 60;
    timeLeft = workTime;
    updateDisplay();
}

function editTimes() {
    pauseTimer();
    workTime = parseInt(workTimeInput.value) * 60;
    breakTime = parseInt(breakTimeInput.value) * 60;
    timeLeft = isWork ? workTime : breakTime;
    updateDisplay();
}

function notify(message) {
    if (Notification.permission === 'granted') {
        new Notification(message);
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification(message);
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");

    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        darkModeToggle.textContent = document.body.classList.contains("dark-mode")
            ? "Modo Claro"
            : "Modo Escuro";
    });
});

startButton.addEventListener('click', () => {
    if (isPaused) {
        startTimer();
    }
});

pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
editButton.addEventListener('click', editTimes);

updateDisplay();

