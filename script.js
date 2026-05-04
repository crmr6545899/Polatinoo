let workTime = 25 * 60;
let breakTime = 5 * 60;
let timeLeft = workTime;
let isRunning = false;
let isWorkSession = true;
let sessions = 0;
let timerInterval;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const sessionLabel = document.getElementById('sessionLabel');
const sessionsDisplay = document.getElementById('sessions');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            isRunning = false;
            playSound();
            
            if (isWorkSession) {
                sessions++;
                sessionsDisplay.textContent = sessions;
                isWorkSession = false;
                timeLeft = breakTime;
                sessionLabel.textContent = 'Break Time';
            } else {
                isWorkSession = true;
                timeLeft = workTime;
                sessionLabel.textContent = 'Work Time';
            }
            updateDisplay();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    isWorkSession = true;
    timeLeft = workTime;
    sessionLabel.textContent = 'Work Time';
    updateDisplay();
}

function playSound() {
    const audio = new Audio('data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==');
    audio.play().catch(err => console.log('Sound play failed'));
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

updateDisplay();
