document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");
    let tasks = [];

    taskForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const taskTitle = document.getElementById("taskTitle").value;
        const taskPriority = document.getElementById("taskPriority").value;
        const taskStatus = document.querySelector("input[name='taskStatus']:checked").value;

        const task = { title: taskTitle, priority: taskPriority, status: taskStatus };
        tasks.push(task);
        renderTasks();
        taskForm.reset();
    });

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const taskItem = document.createElement("li");
            taskItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
            if (task.status === "completed") {
                taskItem.classList.add("completed");
            }

            taskItem.innerHTML = `
                ${task.title} - <span class="badge bg-${task.priority === "high" ? "danger" : task.priority === "medium" ? "warning" : "success"}">${task.priority}</span>
                <div>
                    <button class="btn btn-success btn-sm complete-task" data-index="${index}">Complete</button>
                    <button class="btn btn-danger btn-sm remove-task" data-index="${index}">Remove</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    }

    taskList.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-task")) {
            const index = event.target.getAttribute("data-index");
            tasks.splice(index, 1);
            renderTasks();
        } else if (event.target.classList.contains("complete-task")) {
            const index = event.target.getAttribute("data-index");
            tasks[index].status = "completed";
            renderTasks();
        }
    });

    window.viewTasks = function() {
        console.log(tasks);
    };
});
