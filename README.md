# Todo_list_without_DB

# Overview
"My To-Do List Application" is a simple and visually appealing task management app. Users can:

1. Add tasks.
2. Mark tasks as completed or unmark them.
3. Edit tasks.
4. Delete tasks. The app uses localStorage to persist tasks, ensuring data remains available even after refreshing the page. The UI is responsive and includes a modal for task editing.
   
# Features
1. **Add Tasks**
Users can type tasks into the input field and click "Add" to create a new task.

2. **Edit Tasks**
Edit existing tasks using the modal pop-up interface.

3. **Mark/Unmark Tasks**
Tasks can be marked as complete or reverted back to pending.

4. **Delete Tasks**
Tasks can be removed with a single click.

5. **Persistent Storage**
All tasks are saved in the browser's localStorage and reloaded automatically when the app is reopened.

6. **Responsive Design**
Optimized for mobile, tablet, and desktop views.

# How to Run

1. Clone or download the repository.
2. Open the index.html file in any modern web browser.
3. The app runs entirely in the browser; no backend or server setup is needed.

# Setup Instructions
**Add Resources:**

1. Ensure logo.png and bg.jpg are in the root directory.
2. Replace bg.jpg and logo.png with your own images if desired.

**Run Locally:**

Double-click the index.html file to open it in your browser.

**Test Functionality:**

Add, edit, complete, and delete tasks to test the app.

# How It Works
**1. Adding a Task**
Users input text in the #myInput field and click the "Add" button or press Enter.

A new task is added to the tasks array, which is saved to localStorage.

**2. Editing a Task**

Click the "Edit" button next to a task.
The modal appears, allowing the user to modify the task text.
Clicking "Save" updates the task and saves changes to localStorage.
**3. Marking/Unmarking Tasks**

Click the "Mark Complete" button to toggle the task's completion status.
Completed tasks are visually distinct (strikethrough text and background change).
**4. Deleting a Task**

Click the close icon (×) to remove a task.
The task is deleted from the tasks array and localStorage.

# Customization 

**Styling**
Modify style.css to change the app's appearance, such as colors, fonts, or layout.

**Functionality**
Extend functionality in script.js (e.g., adding task priorities, due dates, or categories).

**Technologies Used**
HTML5: Structure of the app.
CSS3: Styling and responsive design.
JavaScript: Functionality, DOM manipulation, and localStorage integration.
