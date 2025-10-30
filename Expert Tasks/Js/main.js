// Main JavaScript for general functionality
document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in and redirect if needed
  const currentPage = window.location.pathname.split("/").pop() || "index.html"
  const user = window.getCurrentUser() // Assuming getCurrentUser is a method on the window object

  // Protected pages
  const protectedPages = ["intern-dashboard.html", "submissions.html"]
  const adminPages = ["admin-dashboard.html", "admin-interns.html", "admin-reviews.html"]

  if (protectedPages.includes(currentPage) && (!user || user.role !== "intern")) {
    window.location.href = "login.html"
  }

  if (adminPages.includes(currentPage) && (!user || user.role !== "admin")) {
    window.location.href = "admin-login.html"
  }
})
