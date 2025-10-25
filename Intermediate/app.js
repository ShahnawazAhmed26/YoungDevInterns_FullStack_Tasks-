// ===== SCHOOL LOGIN SYSTEM =====
// Multi-tenant school management system with admin dashboards

// Demo data - In production, this would come from a backend
const demoSchools = {
  "Central High": {
    username: "admin",
    password: "admin123",
    email: "admin@centralhigh.com",
    phone: "+1 (555) 123-4567",
    address: "123 Education Street, Learning City, LC 12345",
  },
  "Riverside Academy": {
    username: "admin",
    password: "admin123",
    email: "admin@riverside.com",
    phone: "+1 (555) 234-5678",
    address: "456 River Road, Academic Town, AT 67890",
  },
  "Greenfield School": {
    username: "admin",
    password: "admin123",
    email: "admin@greenfield.com",
    phone: "+1 (555) 345-6789",
    address: "789 Green Lane, Scholar Valley, SV 13579",
  },
}

// Current logged-in user
let currentUser = null

// ===== DOM ELEMENTS =====
const loginPage = document.getElementById("loginPage")
const dashboardPage = document.getElementById("dashboardPage")
const loginForm = document.getElementById("loginForm")
const logoutBtn = document.getElementById("logoutBtn")
const loginError = document.getElementById("loginError")

// ===== LOGIN FUNCTIONALITY =====
loginForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const schoolName = document.getElementById("schoolName").value.trim()
  const username = document.getElementById("adminUsername").value.trim()
  const password = document.getElementById("adminPassword").value

  // Clear previous error
  loginError.classList.remove("show")
  loginError.textContent = ""

  // Validate school exists
  if (!demoSchools[schoolName]) {
    showLoginError("School not found. Please check the school name.")
    return
  }

  // Validate credentials
  const school = demoSchools[schoolName]
  if (school.username !== username || school.password !== password) {
    showLoginError("Invalid username or password.")
    return
  }

  // Login successful
  currentUser = {
    schoolName: schoolName,
    username: username,
    email: school.email,
    phone: school.phone,
    address: school.address,
  }

  // Save to localStorage for session persistence
  localStorage.setItem("currentUser", JSON.stringify(currentUser))

  // Switch to dashboard
  showDashboard()
})

function showLoginError(message) {
  loginError.textContent = message
  loginError.classList.add("show")
}

// ===== DASHBOARD FUNCTIONALITY =====
function showDashboard() {
  loginPage.classList.remove("active")
  dashboardPage.classList.add("active")

  // Update dashboard with user info
  updateDashboardInfo()

  // Initialize dashboard
  initializeDashboard()
}

function updateDashboardInfo() {
  document.getElementById("schoolTitle").textContent = `${currentUser.schoolName} Dashboard`
  document.getElementById("adminInfo").textContent = `Admin: ${currentUser.username}`
  document.getElementById("userNameDisplay").textContent = currentUser.username

  // Update settings form
  document.getElementById("settingsSchoolName").value = currentUser.schoolName
  document.getElementById("settingsSchoolEmail").value = currentUser.email
  document.getElementById("settingsSchoolPhone").value = currentUser.phone
  document.getElementById("settingsSchoolAddress").value = currentUser.address
}

function initializeDashboard() {
  // Update stats
  updateStats()

  // Setup navigation
  setupNavigation()
}

function updateStats() {
  // Calculate stats based on demo data
  document.getElementById("totalStudents").textContent = "145"
  document.getElementById("totalTeachers").textContent = "28"
  document.getElementById("totalClasses").textContent = "12"
}

function setupNavigation() {
  const navItems = document.querySelectorAll(".nav-item")

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Remove active class from all items
      navItems.forEach((nav) => nav.classList.remove("active"))

      // Add active class to clicked item
      item.classList.add("active")

      // Get section name
      const section = item.getAttribute("data-section")

      // Hide all sections
      const sections = document.querySelectorAll(".content-section")
      sections.forEach((sec) => sec.classList.remove("active"))

      // Show selected section
      const selectedSection = document.getElementById(`${section}Section`)
      if (selectedSection) {
        selectedSection.classList.add("active")
      }
    })
  })
}

// ===== LOGOUT FUNCTIONALITY =====
logoutBtn.addEventListener("click", () => {
  // Clear user data
  currentUser = null
  localStorage.removeItem("currentUser")

  // Reset form
  loginForm.reset()
  loginError.classList.remove("show")

  // Switch back to login
  dashboardPage.classList.remove("active")
  loginPage.classList.add("active")
})

// ===== ADD BUTTONS FUNCTIONALITY =====
document.getElementById("addStudentBtn").addEventListener("click", () => {
  alert("Add Student feature - In production, this would open a form modal")
})

document.getElementById("addTeacherBtn").addEventListener("click", () => {
  alert("Add Teacher feature - In production, this would open a form modal")
})

document.getElementById("addClassBtn").addEventListener("click", () => {
  alert("Add Class feature - In production, this would open a form modal")
})

// ===== SETTINGS SAVE =====
const settingsBtns = document.querySelectorAll(".settings-group .btn-primary")
if (settingsBtns.length > 0) {
  settingsBtns[settingsBtns.length - 1].addEventListener("click", () => {
    alert("Settings saved successfully!")
  })
}

// ===== SESSION PERSISTENCE =====
window.addEventListener("load", () => {
  const savedUser = localStorage.getItem("currentUser")

  if (savedUser) {
    try {
      currentUser = JSON.parse(savedUser)
      showDashboard()
    } catch (e) {
      console.error("Error loading saved session:", e)
      localStorage.removeItem("currentUser")
    }
  }
})

// ===== EDIT AND DELETE HANDLERS =====
document.addEventListener("click", (e) => {
  if (e.target.textContent === "✏️") {
    alert("Edit feature - In production, this would open an edit form")
  } else if (e.target.textContent === "🗑️") {
    if (confirm("Are you sure you want to delete this item?")) {
      alert("Item deleted successfully!")
    }
  }
})

console.log("[v0] School Login System initialized")
console.log("[v0] Demo credentials - School: Central High, Username: admin, Password: admin123")
