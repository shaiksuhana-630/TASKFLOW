const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
});

addTaskBtn.addEventListener("click", async () => {
    const title = taskInput.value.trim();

    if (title === " ") {
        alert("Please enter a task.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/tasks", {
            method: "POST",
            headers: {

                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title})
        });

        const data = await response.json();

        alert(data.message);

        if (data.success) {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${title}</td>
                <td>Medium</td>
                <td>${today}</td>
                <td><span class="status-badge pending">Pending</span></td>
                <td><button class="deleteBtn">Delete</button></td>
            `;

            taskList.appendChild(row);

            const deleteBtn = row.querySelector(".deleteBtn");
            taskInput.value = "";
        }
    } catch (error) {
        console.error(error);
        alert("Failed to connect to the server.");
    }
});
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", (event) => {
    event.preventDefault();

    alert("Logged Out Successfully");

    window.location.href = "Login.html";
});
async function loadTasks() {
    row.dataset.id = task._id;
    try {
        const response = await fetch("http://localhost:3000/api/tasks");
        const tasks = await response.json();

        taskList.innerHTML = " ";

        tasks.forEach(task => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${task.title}</td>
                <td>Medium</td>
                <td>${new Date(task.createdAt).toLocaleDateString("en-GB")}</td>
                <td>
                    <span class="status-badge ${task.completed ? "done" : "pending"}">
                        ${task.completed ? "Done" : "Pending"}
                    </span>
                </td>
                <td>
                    <button class="deleteBtn">Delete</button>
                </td>
            `;

            taskList.appendChild(row);
        });

    } catch (error) {
        console.error(error);
    }
}
loadTasks();