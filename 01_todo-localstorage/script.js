document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById('taskInput')
    const addTaskButton = document.getElementById('add-task-btn')
    const todoList = document.getElementById('taskList')
    const deleteTaskButton = document.getElementById('delete-task-btn')
    const taskList = document.getElementById('task-list')

    // Function to add a new task


    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderAllTasks() {
        todoList.innerHTML = '';
        tasks.forEach((task) => renderTasks(task));
    }

    renderAllTasks();

addTaskButton.addEventListener('click', () => {
    const taskText = todoInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    tasks.push(newTask);
    saveTasks();
    renderAllTasks();
    todoInput.value = '';
    console.log(tasks);
});

function renderTasks(task) {
    const li = document.createElement('li');
    li.setAttribute('task', task.id);
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
        <span class="task-text">${task.text}</span>
        <button id="delete-task-btn">Delete</button>
    `;
    li.addEventListener('click', (e) => {
        if (e.target.tagName === "BUTTON") return;
        task.completed = !task.completed;
        saveTasks();
        renderAllTasks();
    });

    li.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the click event from bubbling up to the li
        tasks = tasks.filter(t => t.id !== task.id);
        saveTasks();
        renderAllTasks();
    });
    todoList.appendChild(li);
}

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
})