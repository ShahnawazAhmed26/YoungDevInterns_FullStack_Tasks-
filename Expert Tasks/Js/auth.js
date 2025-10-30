// Authentication Logic
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm")
  const signupForm = document.getElementById("signupForm")
  const adminLoginForm = document.getElementById("adminLoginForm")

  // Declare setCurrentUser function
  function setCurrentUser(user) {
    localStorage.setItem("currentUser", JSON.stringify(user))
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value

      // Demo credentials
      if (email === "intern@example.com" && password === "password123") {
        const user = {
          id: 1,
          name: "Ahmed Hassan",
          email: email,
          role: "intern",
        }
        setCurrentUser(user)
        window.location.href = "intern-dashboard.html"
      } else {
        alert("Invalid credentials. Use demo credentials: intern@example.com / password123")
      }
    })
  }

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value
      const confirmPassword = document.getElementById("confirmPassword").value

      if (password !== confirmPassword) {
        alert("Passwords do not match!")
        return
      }

      const user = {
        id: Math.random(),
        name: name,
        email: email,
        role: "intern",
      }
      setCurrentUser(user)
      window.location.href = "intern-dashboard.html"
    })
  }

  if (adminLoginForm) {
    adminLoginForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value

      // Demo admin credentials
      if (email === "admin@internee.com" && password === "admin123") {
        const user = {
          id: "admin-1",
          name: "Admin",
          email: email,
          role: "admin",
        }
        setCurrentUser(user)
        window.location.href = "admin-dashboard.html"
      } else {
        alert("Invalid credentials. Use demo credentials: admin@internee.com / admin123")
      }
    })
  }
})
