// Mock Data
const mockInterns = [
  {
    id: 1,
    name: "Ahmed Hassan",
    email: "ahmed@example.com",
    company: "Tech Corp",
    startDate: "2025-01-15",
    progress: 65,
    status: "active",
    tasks: 8,
    completed: 5,
  },
  {
    id: 2,
    name: "Fatima Khan",
    email: "fatima@example.com",
    company: "Digital Solutions",
    startDate: "2025-02-01",
    progress: 45,
    status: "active",
    tasks: 8,
    completed: 3,
  },
  {
    id: 3,
    name: "Ali Raza",
    email: "ali@example.com",
    company: "Innovation Labs",
    startDate: "2024-12-01",
    progress: 100,
    status: "completed",
    tasks: 8,
    completed: 8,
  },
  {
    id: 4,
    name: "Zainab Ahmed",
    email: "zainab@example.com",
    company: "Tech Corp",
    startDate: "2025-01-20",
    progress: 30,
    status: "active",
    tasks: 8,
    completed: 2,
  },
]

const mockTasks = [
  {
    id: 1,
    title: "Setup Development Environment",
    description: "Install and configure all necessary development tools and dependencies",
    priority: "high",
    dueDate: "2025-02-15",
    status: "completed",
    progress: 100,
    internId: 1,
  },
  {
    id: 2,
    title: "Learn React Basics",
    description: "Complete React fundamentals course and build a simple component",
    priority: "high",
    dueDate: "2025-02-20",
    status: "completed",
    progress: 100,
    internId: 1,
  },
  {
    id: 3,
    title: "Build Todo App",
    description: "Create a fully functional todo application with React",
    priority: "medium",
    dueDate: "2025-03-01",
    status: "submitted",
    progress: 100,
    internId: 1,
  },
  {
    id: 4,
    title: "API Integration",
    description: "Integrate REST API with your React application",
    priority: "medium",
    dueDate: "2025-03-10",
    status: "pending",
    progress: 50,
    internId: 1,
  },
  {
    id: 5,
    title: "Database Design",
    description: "Design and implement database schema for the project",
    priority: "high",
    dueDate: "2025-03-15",
    status: "pending",
    progress: 0,
    internId: 1,
  },
  {
    id: 6,
    title: "Authentication System",
    description: "Implement user authentication and authorization",
    priority: "high",
    dueDate: "2025-03-20",
    status: "pending",
    progress: 0,
    internId: 1,
  },
  {
    id: 7,
    title: "Testing & QA",
    description: "Write unit tests and perform quality assurance",
    priority: "medium",
    dueDate: "2025-03-25",
    status: "pending",
    progress: 0,
    internId: 1,
  },
  {
    id: 8,
    title: "Documentation",
    description: "Create comprehensive project documentation",
    priority: "low",
    dueDate: "2025-03-30",
    status: "pending",
    progress: 0,
    internId: 1,
  },
]

const mockSubmissions = [
  {
    id: 1,
    taskId: 3,
    internId: 1,
    taskTitle: "Build Todo App",
    description: "Created a fully functional todo app with add, delete, and mark complete features",
    links: [
      { label: "GitHub Repository", url: "https://github.com/example/todo-app" },
      { label: "Live Demo", url: "https://todo-app-demo.vercel.app" },
    ],
    status: "approved",
    submittedDate: "2025-03-02",
    feedback: "Great work! The app is well-structured and the UI is clean. Good use of React hooks.",
  },
  {
    id: 2,
    taskId: 4,
    internId: 1,
    taskTitle: "API Integration",
    description: "Successfully integrated REST API with the React application",
    links: [{ label: "GitHub Repository", url: "https://github.com/example/api-integration" }],
    status: "pending",
    submittedDate: "2025-03-08",
    feedback: null,
  },
  {
    id: 3,
    taskId: 2,
    internId: 2,
    taskTitle: "Learn React Basics",
    description: "Completed React fundamentals course and built a simple counter component",
    links: [{ label: "GitHub Repository", url: "https://github.com/example/react-basics" }],
    status: "approved",
    submittedDate: "2025-02-25",
    feedback: "Good understanding of React concepts. Keep practicing!",
  },
  {
    id: 4,
    taskId: 1,
    internId: 3,
    taskTitle: "Setup Development Environment",
    description: "Successfully set up all development tools and dependencies",
    links: [],
    status: "approved",
    submittedDate: "2024-12-05",
    feedback: "Perfect setup. Ready to move forward.",
  },
]

// Utility Functions
function getCurrentUser() {
  const user = localStorage.getItem("currentUser")
  return user ? JSON.parse(user) : null
}

function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user))
}

function logout() {
  localStorage.removeItem("currentUser")
  window.location.href = "index.html"
}

function getInternTasks(internId) {
  return mockTasks.filter((task) => task.internId === internId)
}

function getInternSubmissions(internId) {
  return mockSubmissions.filter((sub) => sub.internId === internId)
}

function getTaskById(taskId) {
  return mockTasks.find((task) => task.id === taskId)
}

function getSubmissionById(submissionId) {
  return mockSubmissions.find((sub) => sub.id === submissionId)
}

function getInternById(internId) {
  return mockInterns.find((intern) => intern.id === internId)
}

function calculateStats(internId) {
  const tasks = getInternTasks(internId)
  const completed = tasks.filter((t) => t.status === "completed").length
  const pending = tasks.filter((t) => t.status === "pending").length
  const progress = Math.round((completed / tasks.length) * 100)

  return {
    total: tasks.length,
    completed,
    pending,
    progress,
  }
}
