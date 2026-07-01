const form = document.querySelector("#f");
const list = document.querySelector("#task-list");
const clearAll = document.querySelector("#clear-all");

const nameInput = document.querySelector("#int");
const priorityInput = document.querySelector("#priority");
const dueDateInput = document.querySelector("#dt");

const filterAllBtn = document.querySelector("#filter-all");
const filterPendingBtn = document.querySelector("#filter-pending");
const filterDoneBtn = document.querySelector("#filter-done");

const sortBy = document.querySelector("#sort-by");
const counter = document.querySelector("#counter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

form.addEventListener("submit", addTask);
clearAll.addEventListener("click", clearTasks);

filterAllBtn.addEventListener("click", function () {
    currentFilter = "all";
    renderTasks();
});

filterPendingBtn.addEventListener("click", function () {
    currentFilter = "pending";
    renderTasks();
});

filterDoneBtn.addEventListener("click", function () {
    currentFilter = "done";
    renderTasks();
});

sortBy.addEventListener("change", function () {
    renderTasks();
});

function addTask(event) {
    event.preventDefault();

    const task = {
        id: Date.now(),
        name: nameInput.value,
        priority: priorityInput.value,
        dueDate: dueDateInput.value,
        done: false
    };

    tasks.push(task);

    saveTasks();
    renderTasks();

    form.reset();
}

function renderTasks() {
    let filteredTasks = tasks;

    if (currentFilter === "pending") {
        filteredTasks = tasks.filter(function (task) {
            return task.done === false;
        });
    }

    if (currentFilter === "done") {
        filteredTasks = tasks.filter(function (task) {
            return task.done === true;
        });
    }

    const sortedTasks = [...filteredTasks];

    if (sortBy.value === "priority") {
        const priorityOrder = {
            High: 1,
            Medium: 2,
            Low: 3
        };

        sortedTasks.sort(function (a, b) {
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    }

    if (sortBy.value === "dueDate") {
        sortedTasks.sort(function (a, b) {
            return a.dueDate.localeCompare(b.dueDate);
        });
    }

    list.innerHTML = sortedTasks.map(function (task) {
        const today = new Date().toISOString().split("T")[0];

        const doneClass = task.done ? "done" : "";
        const overdueClass = task.dueDate <= today ? "overdue" : "";

        return `
            <li class="${doneClass} ${overdueClass}">
                ${task.name} | ${task.priority} | ${task.dueDate}
                <button type="button" onclick="toggleDone(${task.id})">Done</button>
                <button type="button" onclick="deleteTask(${task.id})">Delete</button>
            </li>
        `;
    }).join("");

    counter.textContent = `Showing ${sortedTasks.length} of ${tasks.length} tasks`;
}

function toggleDone(id) {
    tasks = tasks.map(function (task) {
        if (task.id === id) {
            return {
                ...task,
                done: !task.done
            };
        }

        return task;
    });

    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(function (task) {
        return task.id !== id;
    });

    saveTasks();
    renderTasks();
}

function clearTasks() {
    tasks = [];
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

renderTasks();