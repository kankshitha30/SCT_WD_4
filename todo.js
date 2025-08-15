document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("button");
    const taskInput = document.getElementById("taskInput");
    const prioritySelect = document.getElementById("prioritySelect");
    const dueDateInput = document.getElementById("dueDate");
    const dueTimeInput = document.getElementById("dueTime");
    const taskList = document.getElementById("taskList");

    const priorityValue = {
        "High": 1,
        "Medium": 2,
        "Low": 3
    };

    const tasks = [];

    addButton.addEventListener("click", function () {
        const task = taskInput.value.trim();
        const priority = prioritySelect.value;
        const dueDate = dueDateInput.value;
        const dueTime = dueTimeInput.value;

        if (!task && !priority) {
            alert("Task & Priority cannot be empty!");
            return;
        }

        if (!task) {
            alert("Task cannot be empty!");
            return;
        }

        if (!priority) {
            alert("Priority cannot be empty!");
            return;
        }

        tasks.push({
            text: task,
            priority: priority,
            dueDate: dueDate,
            dueTime: dueTime
        });

        tasks.sort((a, b) => priorityValue[a.priority] - priorityValue[b.priority]);

        renderTasks();

        taskInput.value = "";
        prioritySelect.selectedIndex = 0;
        dueDateInput.value = "";
        dueTimeInput.value = "";
    });

    function renderTasks() {
        taskList.innerHTML = "";

        tasks.forEach((taskData, index) => {
            const taskRow = document.createElement("div");
            taskRow.className = "task-row";
            taskRow.style.display = "flex";
            taskRow.style.alignItems = "center";
            taskRow.style.marginLeft = "370px";
            taskRow.style.marginTop = "10px";

            const checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.style.marginRight = "10px";

            const taskText = document.createElement("div");
            taskText.textContent = taskData.text;
            taskText.style.width = "352px";
            taskText.style.fontSize = "20px";

            const priorityText = document.createElement("div");
            priorityText.textContent = taskData.priority;
            priorityText.style.width = "72px";
            priorityText.style.textAlign = "center";
            priorityText.style.fontSize = "20px";

            const dueText = document.createElement("div");
            dueText.textContent = `${taskData.dueDate || '-'} ${taskData.dueTime || ''}`;
            dueText.style.width = "136px";
            dueText.style.textAlign = "center";
            dueText.style.fontSize = "20px";

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "❌";
            deleteBtn.style.background = "transparent";
            deleteBtn.style.border = "none";
            deleteBtn.style.cursor = "pointer";
            deleteBtn.style.width = "40px";
            deleteBtn.style.fontSize = "20px";

            deleteBtn.addEventListener("click", function () {
                tasks.splice(index, 1); 
                renderTasks(); 
            });

            const editBtn = document.createElement("button");
            editBtn.textContent = "✏️";
            editBtn.style.background = "transparent";
            editBtn.style.border = "none";
            editBtn.style.cursor = "pointer";
            editBtn.style.width = "40px";
            editBtn.style.fontSize = "20px";
            editBtn.style.marginLeft = "5px";

            editBtn.addEventListener("click", function () {
                const input = document.createElement("input");
                input.type = "text";
                input.value = taskData.text;
                input.style.width = "352px";
                input.style.fontSize = "18px";

                taskRow.replaceChild(input, taskText);

                editBtn.onclick = function () {
                    const updatedText = input.value.trim();
                    if (updatedText) {
                        taskData.text = updatedText;
                        renderTasks(); 
                    } else {
                        alert("Task cannot be empty.");
                    }
                };

                input.addEventListener("keypress", function (e) {
                    if (e.key === "Enter") {
                        editBtn.click();
                    }
                })
            });

            checkBox.addEventListener("change", function () {
                const style = checkBox.checked ? "line-through" : "none";
                taskText.style.textDecoration = style;
                priorityText.style.textDecoration = style;
                dueText.style.textDecoration = style;
            });

            taskRow.appendChild(checkBox);
            taskRow.appendChild(taskText);
            taskRow.appendChild(priorityText);
            taskRow.appendChild(dueText);
            taskRow.appendChild(editBtn);
            taskRow.appendChild(deleteBtn);

            taskList.appendChild(taskRow);
        });
    }
});
