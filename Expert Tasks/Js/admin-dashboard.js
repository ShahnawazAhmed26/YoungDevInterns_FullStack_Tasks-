// Admin Dashboard Logic
document.addEventListener("DOMContentLoaded", () => {
  const user = getCurrentUser()
  if (!user || user.role !== "admin") {
    window.location.href = "admin-login.html"
    return
  }

  loadAdminStats()
  loadInternsTable()
})

function loadAdminStats() {
  const activeInterns = mockInterns.filter((i) => i.status === "active").length
  const completedInterns = mockInterns.filter((i) => i.status === "completed").length
  const avgProgress = Math.round(mockInterns.reduce((sum, i) => sum + i.progress, 0) / mockInterns.length)

  document.getElementById("totalInterns").textContent = mockInterns.length
  document.getElementById("activeInterns").textContent = activeInterns
  document.getElementById("completedInterns").textContent = completedInterns
  document.getElementById("avgProgress").textContent = avgProgress + "%"
}

function loadInternsTable() {
  const tbody = document.getElementById("internsTableBody")
  tbody.innerHTML = ""

  mockInterns.forEach((intern) => {
    const row = document.createElement("tr")
    row.innerHTML = `
            <td>${intern.name}</td>
            <td>${intern.email}</td>
            <td>${intern.completed}/${intern.tasks}</td>
            <td>
                <div class="progress-bar" style="width: 100px;">
                    <div class="progress-fill" style="width: ${intern.progress}%"></div>
                </div>
                ${intern.progress}%
            </td>
            <td><span class="task-status ${intern.status}">${intern.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view" onclick="viewIntern(${intern.id})">View</button>
                    <button class="action-btn edit" onclick="editIntern(${intern.id})">Edit</button>
                </div>
            </td>
        `
    tbody.appendChild(row)
  })
}

function viewIntern(internId) {
  const intern = getInternById(internId)
  alert(`Intern: ${intern.name}\nEmail: ${intern.email}\nCompany: ${intern.company}\nProgress: ${intern.progress}%`)
}

function editIntern(internId) {
  alert("Edit functionality would open a modal to edit intern details")
}

// Search functionality
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInterns")
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase()
      const rows = document.querySelectorAll("#internsTableBody tr")

      rows.forEach((row) => {
        const text = row.textContent.toLowerCase()
        row.style.display = text.includes(searchTerm) ? "" : "none"
      })
    })
  }
})

// Declare variables before using them
function getCurrentUser() {
  // Mock implementation for demonstration purposes
  return { role: "admin" }
}

const mockInterns = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    company: "ABC Corp",
    progress: 75,
    status: "active",
    completed: 3,
    tasks: 4,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    company: "XYZ Inc",
    progress: 100,
    status: "completed",
    completed: 4,
    tasks: 4,
  },
  // Add more mock interns as needed
]

function getInternById(internId) {
  return mockInterns.find((intern) => intern.id === internId)
}
