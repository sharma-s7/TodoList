const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const clearAllBtn = document.getElementById("clearAllBtn");

//  Load tasks from localStorage on page load
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    tasks.push({ text: taskText, completed: false }); //  Include completed flag
    taskInput.value = "";
    saveTasks(); // Save to localStorage
    displayTasks();
  }
}

function displayTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" id="task-${index}" ${task.completed ? "checked" : ""}>
      <label for="task-${index}">${task.text}</label>
    `;
    li.querySelector("input").addEventListener("change", () => toggleTask(index));
    taskList.appendChild(li);
  });
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks(); // Save updated state
  displayTasks();
}

function clearCompletedTasks() {
  tasks = tasks.filter(task => !task.completed);
  saveTasks(); // Save after clearing
  displayTasks();
}

function clearAllTasks() {
  tasks = [];
  saveTasks(); //  Save empty list
  displayTasks();
}

addTaskBtn.addEventListener("click", addTask);
clearCompletedBtn.addEventListener("click", clearCompletedTasks);
clearAllBtn.addEventListener("click", clearAllTasks);

// Initial render
displayTasks();

//  Ask for notification permission early
if ("Notification" in window) {
  Notification.requestPermission();
}


// Declare targetTime before using it
let targetTime = null;

// Start the clock and check for notification time
function updateTime() {
    const timeElement = document.getElementById("time");
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); // Format: "HH:MM"

    timeElement.textContent = now.toLocaleTimeString(); // Display full time

    // Trigger notification if current time matches target
    if (targetTime === currentTime) {
        showNotification();
        targetTime = null; // Reset after triggering
    }

    //  Schedule next update
    setTimeout(updateTime, 1000);
}

// Start the timer loop
updateTime();

//  Set notification time from user input
function setNotification() {
    const input = document.getElementById("notifyTime").value;
    if (input) {
        targetTime = input;
        alert(`Notification set for ${targetTime}`);
    }
}

// Show browser notification
function showNotification() {
    if (Notification.permission === "granted") {
        new Notification("⏰ Time to check your task!");
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification("⏰ Time to check your task!");
            }
        });
    }
}
