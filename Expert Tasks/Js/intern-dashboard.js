// Intern Dashboard Logic
let currentTaskId = null
const mockSubmissions = []

function getCurrentUser() {
  // Placeholder function to simulate getting the current user
  return { id: 1, name: "John Doe", role: "intern" }
}

function calculateStats(userId) {
  // Placeholder function to simulate calculating stats
  return { total: 10, completed: 5, pending: 5, progress: 50 }
}

function getInternTasks(userId) {
  // Placeholder function to simulate getting intern tasks
  return [
    {
      id: 1,
      title: "Task 1",
      description: "Description 1",
      priority: "High",
      dueDate: "2023-10-01",
      status: "pending",
      progress: 20,
    },
    {
      id: 2,
      title: "Task 2",
      description: "Description 2",
      priority: "Medium",
      dueDate: "2023-10-15",
      status: "completed",
      progress: 100,
    },
    // Add more tasks as needed
  ]
}

function getTaskById(taskId) {
  // Placeholder function to simulate getting a task by ID
  return getInternTasks(getCurrentUser().id).find((task) => task.id === taskId)
}

document.addEventListener("DOMContentLoaded", () => {
  const user = getCurrentUser()
  if (!user || user.role !== "intern") {
    window.location.href = "login.html"
    return
  }

  document.getElementById("userName").textContent = user.name
  loadDashboardStats()
  loadTasks("all")
})

function loadDashboardStats() {
  const user = getCurrentUser()
  const stats = calculateStats(user.id)

  document.getElementById("totalTasks").textContent = stats.total
  document.getElementById("completedTasks").textContent = stats.completed
  document.getElementById("pendingTasks").textContent = stats.pending
  document.getElementById("progressPercent").textContent = stats.progress + "%"
}

function loadTasks(filter = "all") {
  const user = getCurrentUser()
  const tasks = getInternTasks(user.id)
  const tasksList = document.getElementById("tasksList")
  tasksList.innerHTML = ""

  let filteredTasks = tasks
  if (filter === "pending") {
    filteredTasks = tasks.filter((t) => t.status === "pending")
  } else if (filter === "completed") {
    filteredTasks = tasks.filter((t) => t.status === "completed" || t.status === "submitted")
  }

  filteredTasks.forEach((task) => {
    const taskCard = createTaskCard(task)
    tasksList.appendChild(taskCard)
  })
}

function createTaskCard(task) {
  const card = document.createElement("div")
  card.className = "task-card"
  card.onclick = () => openTaskModal(task)

  const statusClass = task.status.toLowerCase()
  const priorityClass = task.priority.toLowerCase()

  card.innerHTML = `
        <div class="task-header">
            <h3 class="task-title">${task.title}</h3>
            <span class="task-status ${statusClass}">${task.status}</span>
        </div>
        <p class="task-description">${task.description}</p>
        <div class="task-meta">
            <span class="task-priority ${priorityClass}">${task.priority} Priority</span>
            <span>Due: ${new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
        <div class="task-progress">
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${task.progress}%"></div>
            </div>
            <small>${task.progress}% Complete</small>
        </div>
    `

  return card
}

function filterTasks(filter) {
  document.querySelectorAll(".filter-btn").forEach((btn) => btn.classList.remove("active"))
  event.target.classList.add("active")
  loadTasks(filter)
}

function openTaskModal(task) {
  currentTaskId = task.id
  document.getElementById("modalTaskTitle").textContent = task.title

  const content = `
        <h3>${task.title}</h3>
        <p><strong>Description:</strong> ${task.description}</p>
        <p><strong>Priority:</strong> ${task.priority}</p>
        <p><strong>Due Date:</strong> ${new Date(task.dueDate).toLocaleDateString()}</p>
        <p><strong>Status:</strong> ${task.status}</p>
        <p><strong>Progress:</strong> ${task.progress}%</p>
    `

  document.getElementById("modalTaskContent").innerHTML = content
  document.getElementById("taskModal").classList.add("active")
}

function closeTaskModal() {
  document.getElementById("taskModal").classList.remove("active")
}

function openSubmissionModal() {
  document.getElementById("taskModal").classList.remove("active")
  document.getElementById("submissionModal").classList.add("active")
}

function closeSubmissionModal() {
  document.getElementById("submissionModal").classList.remove("active")
}

function submitTask() {
  const description = document.getElementById("submissionDesc").value
  const link = document.getElementById("submissionLink").value

  if (!description) {
    alert("Please enter a description")
    return
  }

  const task = getTaskById(currentTaskId)
  const submission = {
    id: mockSubmissions.length + 1,
    taskId: currentTaskId,
    internId: getCurrentUser().id,
    taskTitle: task.title,
    description: description,
    links: link ? [{ label: "Submission Link", url: link }] : [],
    status: "pending",
    submittedDate: new Date().toISOString().split("T")[0],
    feedback: null,
  }

  mockSubmissions.push(submission)
  closeSubmissionModal()
  document.getElementById("submissionForm").reset()
  alert("Task submitted successfully!")
  loadDashboardStats()
}
