// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Elements
const taskInput = document.getElementById('task-input');
const prioritySelect = document.getElementById('priority-select');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const filterAllBtn = document.getElementById('filter-all');
const filterPendingBtn = document.getElementById('filter-pending');
const filterCompletedBtn = document.getElementById('filter-completed');

// Add task
addTaskBtn.addEventListener('click', addTask);

// Filter tasks
filterAllBtn.addEventListener('click', () => displayTasks('all'));
filterPendingBtn.addEventListener('click', () => displayTasks('pending'));
filterCompletedBtn.addEventListener('click', () => displayTasks('completed'));

// Function to add task
function addTask() {
    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        priority: priority,
        completed: false
    };

    tasks.push(task);
    updateLocalStorage();
    displayTasks('all');
    taskInput.value = ''; // Clear input
}

// Function to display tasks
function displayTasks(filter = 'all') {
    taskList.innerHTML = ''; // Clear previous tasks

    let filteredTasks = tasks;
    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === 'pending') {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''} ${task.priority}`;
        li.innerHTML = `
            <span>${task.text} - ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
            <div>
                <button onclick="toggleTaskStatus(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Function to toggle task completion
function toggleTaskStatus(id) {
    tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    updateLocalStorage();
    displayTasks('all');
}

// Function to delete task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    updateLocalStorage();
    displayTasks('all');
}

// Function to update local storage
function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Initial display of tasks
displayTasks('all');
