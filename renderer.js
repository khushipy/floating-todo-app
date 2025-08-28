const { ipcRenderer } = require('electron');

let todos = [];
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todosContainer = document.getElementById('todos');
const closeBtn = document.getElementById('close-btn');
const minimizeBtn = document.getElementById('minimize-btn');

// Load saved todos when the app starts
window.addEventListener('DOMContentLoaded', async () => {
    todos = await ipcRenderer.invoke('get-todos');
    renderTodos();
});

// Add new todo
function addTodo() {
    const text = todoInput.value.trim();
    if (text) {
        const newTodo = {
            id: Date.now(),
            text,
            completed: false
        };
        todos.unshift(newTodo);
        saveAndRender();
        todoInput.value = '';
    }
    todoInput.focus();
}

// Toggle todo completion
function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveAndRender();
}

// Delete todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveAndRender();
}

// Save todos to store and re-render the list
async function saveAndRender() {
    await ipcRenderer.invoke('save-todos', todos);
    renderTodos();
}

// Render todos to the DOM
function renderTodos() {
    todosContainer.innerHTML = '';
    
    if (todos.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-message';
        emptyMessage.textContent = 'No tasks yet. Add one above!';
        todosContainer.appendChild(emptyMessage);
        return;
    }
    
    todos.forEach(todo => {
        const todoElement = document.createElement('div');
        todoElement.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        todoElement.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''}>
            <span class="todo-text">${todo.text}</span>
            <button class="delete-btn">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        const checkbox = todoElement.querySelector('input[type="checkbox"]');
        const deleteBtn = todoElement.querySelector('.delete-btn');
        
        checkbox.addEventListener('change', () => toggleTodo(todo.id));
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTodo(todo.id);
        });
        
        todosContainer.appendChild(todoElement);
    });
}

// Event Listeners
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

addBtn.addEventListener('click', addTodo);
closeBtn.addEventListener('click', () => ipcRenderer.send('close-app'));
minimizeBtn.addEventListener('click', () => ipcRenderer.send('minimize-app'));
