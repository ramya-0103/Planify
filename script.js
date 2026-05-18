const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const darkModeBtn = document.getElementById("darkModeBtn");
const clearCompleted = document.getElementById("clearCompleted");
const searchInput = document.getElementById("searchInput");

// LOAD TASKS
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// SHOW TASKS ON LOAD
renderTasks();


// ADD TASK
addBtn.addEventListener("click", () => {

  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const task = {
    text: taskText,
    completed: false,
    date: new Date().toLocaleDateString()
  };

  tasks.push(task);

  saveTasks();
  renderTasks();

  taskInput.value = "";
});


// PRESS ENTER TO ADD TASK
taskInput.addEventListener("keypress", (e) => {

  if (e.key === "Enter") {
    addBtn.click();
  }

});


// RENDER TASKS
function renderTasks() {

  taskList.innerHTML = "";

  // EMPTY MESSAGE
  if (tasks.length === 0) {

    taskList.innerHTML = `
      <p style="text-align:center; color:gray;">
        No tasks added yet 📝
      </p>
    `;

    taskCount.innerText = 0;

    return;
  }

  // SEARCH
  const searchText =
    searchInput.value.toLowerCase();

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(searchText)
  );

  filteredTasks.forEach((task, index) => {

    const li = document.createElement("li");

    if (task.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
      <div>
        <span>${task.text}</span>
        <br>
        <small>Added: ${task.date}</small>
      </div>

      <div class="task-buttons">

        <button
          class="complete-btn"
          onclick="toggleComplete(${index})"
        >
          ✓
        </button>

        <button
          class="delete-btn"
          onclick="deleteTask(${index})"
        >
          X
        </button>

      </div>
    `;

    taskList.appendChild(li);
  });

  taskCount.innerText = tasks.length;
}


// DELETE TASK
function deleteTask(index) {

  tasks.splice(index, 1);

  saveTasks();
  renderTasks();
}


// TOGGLE COMPLETE
function toggleComplete(index) {

  tasks[index].completed =
    !tasks[index].completed;

  saveTasks();
  renderTasks();
}


// SAVE TASKS
function saveTasks() {

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );
}


// DARK MODE
darkModeBtn.addEventListener("click", () => {

  document.body.classList.toggle("dark");

  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark")
  );
});


// LOAD DARK MODE
if (localStorage.getItem("darkMode") === "true") {

  document.body.classList.add("dark");
}


// CLEAR COMPLETED
clearCompleted.addEventListener("click", () => {

  tasks = tasks.filter(
    task => !task.completed
  );

  saveTasks();
  renderTasks();
});


// SEARCH TASKS
searchInput.addEventListener("input", () => {

  renderTasks();

});