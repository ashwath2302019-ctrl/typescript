interface Task {
    id: number;
    name: string;
    priority: "Low" | "Medium" | "High";
    dueDate: string;
    done: boolean;
}

let tasks: Task[] = [];

function addTask(
    name: string,
    priority: "Low" | "Medium" | "High",
    dueDate: string
): Task {
    const task: Task = {
        id: Date.now(),
        name: name,
        priority: priority,
        dueDate: dueDate,
        done: false
    };

    tasks.push(task);
    return task;
}

function toggleDone(id: number): void {
    const task = tasks.find(function (task) {
        return task.id === id;
    });

    if (task) {
        task.done = !task.done;
    }
}

function getAllTasks(): Task[] {
    return tasks;
}

function filterTasks(status: "all" | "done" | "pending"): Task[] {
    if (status === "done") {
        return tasks.filter(function (task) {
            return task.done === true;
        });
    }

    if (status === "pending") {
        return tasks.filter(function (task) {
            return task.done === false;
        });
    }

    return tasks;
}

function sortTasksByPriority(): Task[] {
    const order = {
        High: 1,
        Medium: 2,
        Low: 3
    };

    return [...tasks].sort(function (a, b) {
        return order[a.priority] - order[b.priority];
    });
}

function sortTasksByDueDate(): Task[] {
    return [...tasks].sort(function (a, b) {
        return a.dueDate.localeCompare(b.dueDate);
    });
}

function saveTasks(): void {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(): void {
    const data = localStorage.getItem("tasks");

    if (data) {
        tasks = JSON.parse(data);
    }
}