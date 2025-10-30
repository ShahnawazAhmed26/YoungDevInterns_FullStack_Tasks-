// Intern Submissions Logic
document.addEventListener("DOMContentLoaded", () => {
  const user = getCurrentUser()
  if (!user || user.role !== "intern") {
    window.location.href = "login.html"
    return
  }

  loadSubmissionsStats()
  loadSubmissionsList("all")
})

function getCurrentUser() {
  // Placeholder for the actual implementation
  return { id: 1, role: "intern" }
}

function getInternSubmissions(userId) {
  // Placeholder for the actual implementation
  return [
    {
      id: 1,
      taskTitle: "Task 1",
      description: "Description 1",
      status: "approved",
      links: [{ url: "http://example.com", label: "Link 1" }],
      feedback: "Good job!",
    },
    { id: 2, taskTitle: "Task 2", description: "Description 2", status: "pending", links: [], feedback: "" },
    {
      id: 3,
      taskTitle: "Task 3",
      description: "Description 3",
      status: "rejected",
      links: [{ url: "http://example.com", label: "Link 3" }],
      feedback: "Needs improvement.",
    },
  ]
}

function getSubmissionById(submissionId) {
  // Placeholder for the actual implementation
  const submissions = getInternSubmissions(getCurrentUser().id)
  return submissions.find((s) => s.id === submissionId)
}

function loadSubmissionsStats() {
  const user = getCurrentUser()
  const submissions = getInternSubmissions(user.id)
  const approved = submissions.filter((s) => s.status === "approved").length
  const pending = submissions.filter((s) => s.status === "pending").length
  const rejected = submissions.filter((s) => s.status === "rejected").length

  document.getElementById("totalSubmissions").textContent = submissions.length
  document.getElementById("approvedSubmissions").textContent = approved
  document.getElementById("pendingSubmissions").textContent = pending
  document.getElementById("rejectedSubmissions").textContent = rejected
}

function loadSubmissionsList(filter = "all") {
  const user = getCurrentUser()
  const submissions = getInternSubmissions(user.id)
  const list = document.getElementById("submissionsList")
  list.innerHTML = ""

  let filtered = submissions
  if (filter !== "all") {
    filtered = submissions.filter((s) => s.status === filter)
  }

  filtered.forEach((submission) => {
    const item = createSubmissionItem(submission)
    list.appendChild(item)
  })
}

function createSubmissionItem(submission) {
  const item = document.createElement("div")
  item.className = "submission-item"

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
            <h3 class="submission-title">${submission.taskTitle}</h3>
            <span class="task-status ${statusClass}">${submission.status}</span>
        </div>
        <p class="submission-description">${submission.description}</p>
        ${linksHTML}
        ${feedbackHTML}
        <button class="btn btn-outline" onclick="viewSubmissionDetails(${submission.id})">View Details</button>
    `

  return item
}

function filterSubmissions(filter) {
  document.querySelectorAll(".filter-btn").forEach((btn) => btn.classList.remove("active"))
  event.target.classList.add("active")
  loadSubmissionsList(filter)
}

function viewSubmissionDetails(submissionId) {
  const submission = getSubmissionById(submissionId)

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

  const content = `
        <h3>${submission.taskTitle}</h3>
        <p><strong>Status:</strong> <span class="task-status ${submission.status.toLowerCase()}">${submission.status}</span></p>
        <p><strong>Submitted:</strong> ${new Date(submission.submittedDate).toLocaleDateString()}</p>
        <p><strong>Description:</strong></p>
        <p>${submission.description}</p>
        ${linksHTML}
        ${feedbackHTML}
    `

  document.getElementById("submissionDetailsContent").innerHTML = content
  document.getElementById("submissionDetailsModal").classList.add("active")
}

function closeSubmissionDetailsModal() {
  document.getElementById("submissionDetailsModal").classList.remove("active")
}
