// let currentTask = null; // Variable to store the task being edited
// let currentTaskId = null; // Variable to store the ID of the task being edited

// // Function to add a new task to the list (and save to MongoDB)
// async function newElement() {
//     const inputValue = document.getElementById("myInput").value;
    
//     if (inputValue === '') {
//         alert("You must write something!");
//         return;
//     }

//     try {
//         // Make API call to backend to create a new task
//         const response = await fetch('http://localhost:5000/tasks', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ text: inputValue })
//         });

//         if (!response.ok) {
//             throw new Error('Error adding task');
//         }

//         const newTask = await response.json();
//         addTaskToUI(newTask); // Add the new task to the UI

//         // Clear the input after adding the item
//         document.getElementById("myInput").value = "";
//     } catch (error) {
//         console.error(error);
//     }
// }

// // Add task to the UI
// function addTaskToUI(task) {
//     var li = document.createElement("li");
//     var t = document.createTextNode(task.text);
//     li.appendChild(t);

//     // Append the new list item
//     document.getElementById("myUL").appendChild(li);

//     // Add buttons to the new item
//     addCloseButton(li, task._id);  // Add close button
//     addEditButton(li, task._id);   // Add edit button
//     addMarkCompleteButton(li, task);  // Add mark complete button
// }

// // Add Close button and functionality
// function addCloseButton(li, taskId) {
//     var span = document.createElement("SPAN");
//     var txt = document.createTextNode("\u00D7");
//     span.className = "close";
//     span.appendChild(txt);
//     li.appendChild(span);

//     span.onclick = async function () {
//         var confirmRemove = confirm("Are you sure you want to remove this item?");
//         if (confirmRemove) {
//             // Make API call to delete task from MongoDB
//             try {
//                 const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
//                     method: 'DELETE'
//                 });
//                 if (response.ok) {
//                     li.remove();  // Remove the task from the UI
//                 } else {
//                     throw new Error('Failed to delete task');
//                 }
//             } catch (error) {
//                 console.error(error);
//             }
//         }
//     };
// }

// // Add Edit button and functionality
// function addEditButton(li, taskId) {
//     var editBtn = document.createElement("SPAN");
//     editBtn.className = "editBtn";
//     editBtn.textContent = "Edit";
//     li.appendChild(editBtn);

//     editBtn.onclick = function () {
//         currentTask = li; // Store the task being edited
//         currentTaskId = taskId; // Store the ID of the task being edited
//         document.getElementById("modalInput").value = li.firstChild.textContent; // Pre-fill the modal input field with the current task text
//         document.getElementById("editModal").style.display = "block";
//     };
// }

// // Save the edit in a named function
// async function saveEdit() {
//     const updatedText = document.getElementById("modalInput").value;
//     if (updatedText.trim() === "") {
//         alert("Text cannot be empty!");
//         return;
//     }

//     try {
//         const response = await fetch(`http://localhost:5000/tasks/${currentTaskId}`, {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ text: updatedText })
//         });

//         if (response.ok) {
//             const updatedTask = await response.json();
//             currentTask.firstChild.textContent = updatedTask.text;  // Update the task text in the UI
//             closeModal();
//         } else {
//             throw new Error('Error saving task');
//         }
//     } catch (error) {
//         console.error(error);
//     }
// }

// // Function to close the modal without saving
// function closeModal() {
//     document.getElementById("editModal").style.display = "none";
// }

// // Function to mark task as complete or unmark it
// function addMarkCompleteButton(li, task) {
//     var markCompleteBtn = document.createElement("SPAN");
//     markCompleteBtn.className = "markCompleteBtn";
//     markCompleteBtn.textContent = task.isCompleted ? "Unmark" : "Mark Complete";
//     li.appendChild(markCompleteBtn);

//     markCompleteBtn.onclick = async function () {
//         try {
//             // Toggle the isCompleted state
//             const updatedTask = {
//                 isCompleted: !task.isCompleted
//             };

//             // Make the API call to update the task's completion state in the database
//             const response = await fetch(`http://localhost:5000/tasks/${task._id}`, {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(updatedTask)
//             });

//             if (response.ok) {
//                 const updatedTask = await response.json();
                
//                 // Update the task in the UI based on its completion state
//                 if (updatedTask.isCompleted) {
//                     li.classList.add('checked');
//                     markCompleteBtn.textContent = "Unmark";
//                 } else {
//                     li.classList.remove('checked');
//                     markCompleteBtn.textContent = "Mark Complete";
//                 }

//                 task.isCompleted = updatedTask.isCompleted; // Update the local task object
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     };
// }












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
