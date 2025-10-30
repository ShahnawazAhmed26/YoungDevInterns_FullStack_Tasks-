// Admin Interns Management Logic
let editingInternId = null

// Declare mockInterns and mockTasks variables
const mockInterns = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    company: "ABC Corp",
    startDate: "2023-01-01",
    progress: 50,
    status: "active",
    tasks: 8,
    completed: 4,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    company: "XYZ Inc",
    startDate: "2023-02-15",
    progress: 75,
    status: "active",
    tasks: 10,
    completed: 7,
  },
]

const mockTasks = [
  { id: 1, internId: 1, description: "Task 1 for John" },
  { id: 2, internId: 1, description: "Task 2 for John" },
  { id: 3, internId: 2, description: "Task 1 for Jane" },
  { id: 4, internId: 2, description: "Task 2 for Jane" },
]

// Declare getCurrentUser function
function getCurrentUser() {
  return { role: "admin" } // Example implementation
}

function getInternById(internId) {
  return mockInterns.find((intern) => intern.id === internId)
}

document.addEventListener("DOMContentLoaded", () => {
  const user = getCurrentUser()
  if (!user || user.role !== "admin") {
    window.location.href = "admin-login.html"
    return
  }

  loadInternsList()
})

function loadInternsList() {
  const tbody = document.getElementById("internsListBody")
  tbody.innerHTML = ""

  mockInterns.forEach((intern) => {
    const row = document.createElement("tr")
    row.innerHTML = `
            <td>${intern.name}</td>
            <td>${intern.email}</td>
            <td>${intern.company}</td>
            <td>${new Date(intern.startDate).toLocaleDateString()}</td>
            <td>
                <div class="progress-bar" style="width: 100px;">
                    <div class="progress-fill" style="width: ${intern.progress}%"></div>
                </div>
                ${intern.progress}%
            </td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view" onclick="viewInternDetails(${intern.id})">View</button>
                    <button class="action-btn edit" onclick="editInternModal(${intern.id})">Edit</button>
                    <button class="action-btn delete" onclick="deleteIntern(${intern.id})">Delete</button>
                </div>
            </td>
        `
    tbody.appendChild(row)
  })
}

function openAddInternModal() {
  editingInternId = null
  document.getElementById("internModalTitle").textContent = "Add Intern"
  document.getElementById("internForm").reset()
  document.getElementById("internModal").classList.add("active")
}

function closeInternModal() {
  document.getElementById("internModal").classList.remove("active")
}

function editInternModal(internId) {
  editingInternId = internId
  const intern = getInternById(internId)

  document.getElementById("internModalTitle").textContent = "Edit Intern"
  document.getElementById("internName").value = intern.name
  document.getElementById("internEmail").value = intern.email
  document.getElementById("internCompany").value = intern.company
  document.getElementById("internStartDate").value = intern.startDate

  document.getElementById("internModal").classList.add("active")
}

function saveIntern() {
  const name = document.getElementById("internName").value
  const email = document.getElementById("internEmail").value
  const company = document.getElementById("internCompany").value
  const startDate = document.getElementById("internStartDate").value

  if (!name || !email || !company || !startDate) {
    alert("Please fill all fields")
    return
  }

  if (editingInternId) {
    const intern = getInternById(editingInternId)
    intern.name = name
    intern.email = email
    intern.company = company
    intern.startDate = startDate
  } else {
    const newIntern = {
      id: mockInterns.length + 1,
      name: name,
      email: email,
      company: company,
      startDate: startDate,
      progress: 0,
      status: "active",
      tasks: 8,
      completed: 0,
    }
    mockInterns.push(newIntern)
  }

  closeInternModal()
  loadInternsList()
  alert("Intern saved successfully!")
}

function viewInternDetails(internId) {
  const intern = getInternById(internId)
  const tasks = mockTasks.filter((t) => t.internId === internId)

  const content = `
        <h3>${intern.name}</h3>
        <p><strong>Email:</strong> ${intern.email}</p>
        <p><strong>Company:</strong> ${intern.company}</p>
        <p><strong>Start Date:</strong> ${new Date(intern.startDate).toLocaleDateString()}</p>
        <p><strong>Progress:</strong> ${intern.progress}%</p>
        <p><strong>Status:</strong> ${intern.status}</p>
        <p><strong>Tasks Completed:</strong> ${intern.completed}/${intern.tasks}</p>
    `

  document.getElementById("internDetailsContent").innerHTML = content
  document.getElementById("internDetailsModal").classList.add("active")
}

function closeInternDetailsModal() {
  document.getElementById("internDetailsModal").classList.remove("active")
}

function deleteIntern(internId) {
  if (confirm("Are you sure you want to delete this intern?")) {
    const index = mockInterns.findIndex((i) => i.id === internId)
    if (index > -1) {
      mockInterns.splice(index, 1)
      loadInternsList()
      alert("Intern deleted successfully!")
    }
  }
}

// Search functionality
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInterns")
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase()
      const rows = document.querySelectorAll("#internsListBody tr")

      rows.forEach((row) => {
        const text = row.textContent.toLowerCase()
        row.style.display = text.includes(searchTerm) ? "" : "none"
      })
    })
  }
})
