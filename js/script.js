
//  TO DO LIST LOGIC

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const tasklist = document.getElementById("taskList");
const completedCount = document.getElementById("completedCount");
const progressBar = document.getElementById("progress");

let totalTasks =0;
let completedTasks =0;

addTaskBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "\u2716";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.style.cursor = "pointer";

    // Mark as completed
    span.addEventListener("click", function() {
        if (!li.classList.contains("completed")){
            li.classList.add("completed");
            span.style.textDecoration = "line-through";
            span.style.opacity = "0.6";
            completedTasks++;
        } else {
            li.classList.remove("completed");
            span.style.textDecoration = "none";
            span.style.opacity = "1";
            completedTasks--;
        }
        updateProgress();
    });

    // Delete task
    deleteBtn.addEventListener("click", function() {
        if (li.classList.contains("completed")) {
            completedTasks--;
        }
        li.remove();
        totalTasks--;
        updateProgress();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    tasklist.appendChild(li);

    totalTasks++;
    taskInput.value = "";
    updateProgress();
}

function updateProgress() {
    completedCount.textContent = completedTasks;

    let percent = 0;
    if (totalTasks > 0) {
        percent = (completedTasks / totalTasks) * 100;
    }
    progressBar.style.width = percent + "%";
}

// POMODORO TIMER 

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const sessionsDisplay = document.getElementById("sessions");

let time = 25 * 60;
let timerInterval = null;
let sessions = 0;

function updateTimerDisplay() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

startBtn.addEventListener("click", function() {
    if (timerInterval) return;

    timerInterval = setInterval (() => {
        if (time > 0) {
            time--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            sessions++;
            sessionsDisplay.textContent = sessions;
            alert("Pomodoro session completed");
            time = 25 * 60;
            updateTimerDisplay();
        }
    }, 1000);
});

pauseBtn.addEventListener("click", function() {
    clearInterval(timerInterval);
    timerInterval = null;
});

resetBtn.addEventListener("click", function() {
    clearInterval(timerInterval);
    timerInterval = null;
    time = 25 * 60;
    updateTimerDisplay();
});

updateTimerDisplay();





// THEME TOGGLE

const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
});