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

function updateTime() {
    const timeElement = document.getElementById("time");
    const now = new Date().toLocaleTimeString();
    timeElement.textContent = now;
}

updateTime();
setInterval(updateTime, 1000);
