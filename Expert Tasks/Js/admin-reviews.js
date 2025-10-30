// Admin Reviews Logic
let currentReviewSubmissionId = null

// Declare necessary variables or import them here
const getCurrentUser = () => {
  // Dummy implementation for demonstration
  return { role: "admin" }
}

const mockSubmissions = [
  // Dummy submissions data for demonstration
  {
    id: 1,
    internId: 101,
    taskTitle: "Task 1",
    description: "Description of Task 1",
    status: "pending",
    links: [{ url: "http://example.com", label: "Link 1" }],
  },
  {
    id: 2,
    internId: 102,
    taskTitle: "Task 2",
    description: "Description of Task 2",
    status: "approved",
    links: [{ url: "http://example.com", label: "Link 2" }],
  },
  {
    id: 3,
    internId: 103,
    taskTitle: "Task 3",
    description: "Description of Task 3",
    status: "rejected",
    links: [{ url: "http://example.com", label: "Link 3" }],
  },
]

const getInternById = (id) => {
  // Dummy implementation for demonstration
  return { id: id, name: "Intern Name", email: "intern@example.com" }
}

const getSubmissionById = (id) => {
  // Dummy implementation for demonstration
  return mockSubmissions.find((s) => s.id === id)
}

document.addEventListener("DOMContentLoaded", () => {
  const user = getCurrentUser()
  if (!user || user.role !== "admin") {
    window.location.href = "admin-login.html"
    return
  }

  loadReviewStats()
  loadSubmissions("pending")
})

function loadReviewStats() {
  const pending = mockSubmissions.filter((s) => s.status === "pending").length
  const approved = mockSubmissions.filter((s) => s.status === "approved").length
  const rejected = mockSubmissions.filter((s) => s.status === "rejected").length

  document.getElementById("pendingReviews").textContent = pending
  document.getElementById("approvedCount").textContent = approved
  document.getElementById("rejectedCount").textContent = rejected
}

function loadSubmissions(filter = "pending") {
  const list = document.getElementById("submissionsList")
  list.innerHTML = ""

  let filtered = mockSubmissions
  if (filter !== "all") {
    filtered = mockSubmissions.filter((s) => s.status === filter)
  }

  filtered.forEach((submission) => {
    const item = createSubmissionItem(submission)
    list.appendChild(item)
  })
}

function createSubmissionItem(submission) {
  const item = document.createElement("div")
  item.className = "submission-item"

  const intern = getInternById(submission.internId)
  const statusClass = submission.status.toLowerCase()

  let linksHTML = ""
  if (submission.links && submission.links.length > 0) {
    linksHTML =
      '<div class="submission-links">' +
      submission.links
        .map((link) => `<a href="${link.url}" target="_blank" class="submission-link">${link.label}</a>`)
        .join("") +
      "</div>"
  }

  let feedbackHTML = ""
  if (submission.feedback) {
    feedbackHTML = `
            <div class="submission-feedback">
                <div class="feedback-label">Feedback:</div>
                <div class="feedback-text">${submission.feedback}</div>
            </div>
        `
  }

  item.innerHTML = `
        <div class="submission-header">
            <div>
                <h3 class="submission-title">${submission.taskTitle}</h3>
                <div class="submission-meta">
                    <span><strong>Intern:</strong> ${intern.name}</span>
                    <span><strong>Submitted:</strong> ${new Date(submission.submittedDate).toLocaleDateString()}</span>
                </div>
            </div>
            <span class="task-status ${statusClass}">${submission.status}</span>
        </div>
        <p class="submission-description">${submission.description}</p>
        ${linksHTML}
        ${feedbackHTML}
        <button class="btn btn-primary" onclick="openReviewModal(${submission.id})">Review</button>
    `

  return item
}

function filterReviews(filter) {
  document.querySelectorAll(".filter-btn").forEach((btn) => btn.classList.remove("active"))
  event.target.classList.add("active")
  loadSubmissions(filter)
}

function openReviewModal(submissionId) {
  currentReviewSubmissionId = submissionId
  const submission = getSubmissionById(submissionId)
  const intern = getInternById(submission.internId)

  let linksHTML = ""
  if (submission.links && submission.links.length > 0) {
    linksHTML =
      '<div class="submission-links">' +
      submission.links
        .map((link) => `<a href="${link.url}" target="_blank" class="submission-link">${link.label}</a>`)
        .join("") +
      "</div>"
  }

  const content = `
        <h3>${submission.taskTitle}</h3>
        <p><strong>Intern:</strong> ${intern.name} (${intern.email})</p>
        <p><strong>Submitted:</strong> ${new Date(submission.submittedDate).toLocaleDateString()}</p>
        <p><strong>Description:</strong></p>
        <p>${submission.description}</p>
        ${linksHTML}
    `

  document.getElementById("reviewContent").innerHTML = content
  document.getElementById("reviewModal").classList.add("active")
}

function closeReviewModal() {
  document.getElementById("reviewModal").classList.remove("active")
}

function approveSubmission() {
  const submission = getSubmissionById(currentReviewSubmissionId)
  submission.status = "approved"
  closeReviewModal()
  loadReviewStats()
  loadSubmissions("pending")
  alert("Submission approved!")
}

function rejectSubmission() {
  const submission = getSubmissionById(currentReviewSubmissionId)
  submission.status = "rejected"
  closeReviewModal()
  loadReviewStats()
  loadSubmissions("pending")
  alert("Submission rejected!")
}

function closeFeedbackModal() {
  document.getElementById("feedbackModal").classList.remove("active")
}
