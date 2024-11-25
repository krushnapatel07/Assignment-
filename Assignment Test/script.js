/*Login Instructions
To log in to the application, users will need to enter their credentials (username and password) in the login form. The application supports two types of users:
For Manager :
Username: manager , Password : manager 

For Employee:
Username :employee , Password : password
*/

let tasks = [];
let currentUser   = null;

// User data (for demo purposes)
const users = {
    manager: { username: "manager", password: "manager", role: "Manager" },
    employee: { username: "employee", password: "password", role: "Employee" }
};

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple authentication simulation
    if (users[username] && users[username].password === password) {
        currentUser   = users[username];
        document.getElementById('user-role').innerText = currentUser  .role;
        document.getElementById('login').style.display = 'none';
        document.getElementById('content').style.display = 'block';
        document.getElementById('error-message').style.display = 'none';
        renderTasks(); // Render tasks when logging in
    } else {
        document.getElementById('error-message').innerText = "Invalid username or password.";
        document.getElementById('error-message').style.display = 'block';
    }
}

function logout() {
    currentUser   = null;
    document.getElementById('login').style.display = 'block';
    document.getElementById('content').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

function addTask() {
    const taskInput = document.getElementById('new-task').value;
    const priority = document.getElementById('task-priority').value;

    if (taskInput) {
        const task = { text: taskInput, priority: priority, completed: false };
        tasks.push(task);
        document.getElementById('new-task').value = '';
        renderTasks();
    }
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text} (${task.priority})</span>
            ${currentUser .role === "Manager" ? `<button onclick="deleteTask(${index})">Delete</button>` : ''}
        `;
        taskList.appendChild(li);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}