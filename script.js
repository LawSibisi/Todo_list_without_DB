let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Load tasks from localStorage
let currentTask = null;
let currentTaskIndex = null;

// Render tasks on page load
document.addEventListener("DOMContentLoaded", renderTasks);

function renderTasks() {
    const taskList = document.getElementById("myUL");
    taskList.innerHTML = ""; // Clear existing tasks

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.text;
        if (task.isCompleted) li.classList.add("checked");

        addCloseButton(li, index);
        addEditButton(li, index);
        addMarkCompleteButton(li, index);

        taskList.appendChild(li);
    });
}

function newElement() {
    const inputValue = document.getElementById("myInput").value;
    if (inputValue === "") {
        alert("You must write something!");
        return;
    }

    const newTask = { text: inputValue, isCompleted: false };
    tasks.push(newTask); // Add to local tasks
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Save to localStorage

    document.getElementById("myInput").value = ""; // Clear input
    renderTasks();
}

function addCloseButton(li, index) {
    const span = document.createElement("SPAN");
    span.textContent = "\u00D7"; // Close icon
    span.className = "close";

    span.onclick = function () {
        tasks.splice(index, 1); // Remove task
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    };

    li.appendChild(span);
}

function addEditButton(li, index) {
    const editBtn = document.createElement("SPAN");
    editBtn.textContent = "Edit";
    editBtn.className = "editBtn";

    editBtn.onclick = function () {
        currentTask = li;
        currentTaskIndex = index;
        document.getElementById("modalInput").value = tasks[index].text;
        document.getElementById("editModal").style.display = "block";
    };

    li.appendChild(editBtn);
}

function saveEdit() {
    const updatedText = document.getElementById("modalInput").value;
    if (updatedText.trim() === "") {
        alert("Text cannot be empty!");
        return;
    }

    tasks[currentTaskIndex].text = updatedText;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    closeModal();
    renderTasks();
}

function closeModal() {
    document.getElementById("editModal").style.display = "none";
}

function addMarkCompleteButton(li, index) {
    const markCompleteBtn = document.createElement("SPAN");
    markCompleteBtn.textContent = tasks[index].isCompleted ? "Unmark" : "Mark Complete";
    markCompleteBtn.className = "markCompleteBtn";

    markCompleteBtn.onclick = function () {
        tasks[index].isCompleted = !tasks[index].isCompleted;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    };

    li.appendChild(markCompleteBtn);
}
