// University Management System - Vanilla JS

const universityData = {
  name: "Global University",
  founded: 1985,
  location: "Metropolis, USA",
  departments: [
    { name: "Computer Science", head: "Dr. Alan Turing", students: 1500 },
    { name: "Physics", head: "Dr. Marie Curie", students: 800 },
    { name: "Mathematics", head: "Dr. Euclid", students: 1200 },
    { name: "Engineering", head: "Dr. Nikola Tesla", students: 2000 },
    { name: "Business Administration", head: "Dr. Adam Smith", students: 1800 },
  ],
  students: [
    {
      id: "STU001",
      name: "Alice Wonderland",
      email: "alice@university.edu",
      dept: "Computer Science",
      gpa: 3.9,
      status: "Active",
    },
    {
      id: "STU002",
      name: "Bob The Builder",
      email: "bob@university.edu",
      dept: "Engineering",
      gpa: 3.5,
      status: "Active",
    },
    {
      id: "STU003",
      name: "Charlie Chaplin",
      email: "charlie@university.edu",
      dept: "Mathematics",
      gpa: 3.7,
      status: "Active",
    },
    { id: "STU004", name: "Diana Prince", email: "diana@university.edu", dept: "Physics", gpa: 4.0, status: "Active" },
    {
      id: "STU005",
      name: "Ethan Hunt",
      email: "ethan@university.edu",
      dept: "Computer Science",
      gpa: 3.2,
      status: "Active",
    },
  ],
  faculty: [
    {
      name: "Dr. Alan Turing",
      email: "alan.turing@university.edu",
      dept: "Computer Science",
      title: "Professor",
      courses: 4,
    },
    { name: "Dr. Marie Curie", email: "marie.curie@university.edu", dept: "Physics", title: "Professor", courses: 3 },
    { name: "Dr. Euclid", email: "euclid@university.edu", dept: "Mathematics", title: "Professor", courses: 4 },
    {
      name: "Dr. Nikola Tesla",
      email: "nikola.tesla@university.edu",
      dept: "Engineering",
      title: "Professor",
      courses: 5,
    },
    {
      name: "Dr. Adam Smith",
      email: "adam.smith@university.edu",
      dept: "Business Administration",
      title: "Professor",
      courses: 4,
    },
    {
      name: "Prof. Grace Hopper",
      email: "grace.hopper@university.edu",
      dept: "Computer Science",
      title: "Associate Professor",
      courses: 3,
    },
  ],
  courses: [
    {
      code: "CS101",
      name: "Introduction to Programming",
      instructor: "Prof. Grace Hopper",
      credits: 3,
      schedule: "Mon/Wed 10:00-11:30",
      enrolled: 120,
      capacity: 150,
    },
    {
      code: "PH201",
      name: "Classical Mechanics",
      instructor: "Dr. Marie Curie",
      credits: 4,
      schedule: "Tue/Thu 13:00-14:30",
      enrolled: 80,
      capacity: 100,
    },
    {
      code: "MA301",
      name: "Linear Algebra",
      instructor: "Dr. Euclid",
      credits: 3,
      schedule: "Mon/Wed 14:00-15:30",
      enrolled: 100,
      capacity: 120,
    },
    {
      code: "EN401",
      name: "Thermodynamics",
      instructor: "Dr. Nikola Tesla",
      credits: 4,
      schedule: "Tue/Thu 09:00-10:30",
      enrolled: 90,
      capacity: 100,
    },
    {
      code: "CS202",
      name: "Data Structures",
      instructor: "Dr. Alan Turing",
      credits: 3,
      schedule: "Mon/Wed 11:00-12:30",
      enrolled: 110,
      capacity: 150,
    },
    {
      code: "BA101",
      name: "Principles of Management",
      instructor: "Dr. Adam Smith",
      credits: 3,
      schedule: "Tue/Thu 10:00-11:30",
      enrolled: 130,
      capacity: 180,
    },
  ],
}

class UniversityApp {
  constructor() {
    this.currentPage = "home"
    this.currentUser = null
    this.userType = null // 'student' or 'admin'
    this.init()
  }

  init() {
    this.loadUserFromStorage()
    this.render()
    this.setupEventListeners()
  }

  loadUserFromStorage() {
    const student = localStorage.getItem("student")
    const admin = localStorage.getItem("admin")

    if (student) {
      this.currentUser = JSON.parse(student)
      this.userType = "student"
    } else if (admin) {
      this.currentUser = JSON.parse(admin)
      this.userType = "admin"
    }
  }

  setupEventListeners() {
    document.addEventListener("click", (e) => {
      if (e.target.matches("[data-page]")) {
        e.preventDefault()
        const page = e.target.getAttribute("data-page")
        this.navigateTo(page)
      }

      if (e.target.matches("[data-logout]")) {
        e.preventDefault()
        this.logout()
      }
    })
  }

  navigateTo(page) {
    this.currentPage = page
    this.render()
    window.scrollTo(0, 0)
  }

  logout() {
    localStorage.removeItem("student")
    localStorage.removeItem("admin")
    this.currentUser = null
    this.userType = null
    this.currentPage = "home"
    this.render()
  }

  render() {
    const app = document.getElementById("app")

    if (this.currentUser && this.userType === "student") {
      app.innerHTML = this.renderStudentApp()
    } else if (this.currentUser && this.userType === "admin") {
      app.innerHTML = this.renderAdminApp()
    } else {
      app.innerHTML = this.renderPublicApp()
    }
  }

  renderPublicApp() {
    return `
            ${this.renderNavigation()}
            ${this.renderPublicContent()}
            ${this.renderFooter()}
        `
  }

  renderStudentApp() {
    return `
            ${this.renderStudentNavigation()}
            <div class="container" style="padding: 2rem 1.5rem;">
                ${this.renderStudentContent()}
            </div>
            ${this.renderFooter()}
        `
  }

  renderAdminApp() {
    return `
            ${this.renderAdminNavigation()}
            <div class="container" style="padding: 2rem 1.5rem;">
                ${this.renderAdminContent()}
            </div>
            ${this.renderFooter()}
        `
  }

  renderNavigation() {
    return `
            <nav>
                <div class="container">
                    <div class="logo">University</div>
                    <div class="nav-links">
                        <a href="#" data-page="home">Home</a>
                        <a href="#" data-page="about">About</a>
                        <a href="#" data-page="contact">Contact</a>
                        <a href="#" data-page="student-login" class="btn btn-secondary btn-sm">Login</a>
                    </div>
                </div>
            </nav>
        `
  }

  renderStudentNavigation() {
    return `
            <nav>
                <div class="container">
                    <div class="logo">University</div>
                    <div class="nav-links">
                        <a href="#" data-page="student-dashboard">Dashboard</a>
                        <a href="#" data-page="student-courses">Courses</a>
                        <a href="#" data-page="student-grades">Grades</a>
                        <a href="#" data-page="student-attendance">Attendance</a>
                        <a href="#" data-page="student-notices">Notices</a>
                        <a href="#" data-logout class="btn btn-secondary btn-sm">Logout</a>
                    </div>
                </div>
            </nav>
        `
  }

  renderAdminNavigation() {
    return `
            <nav>
                <div class="container">
                    <div class="logo">University Admin</div>
                    <div class="nav-links">
                        <a href="#" data-page="admin-dashboard">Dashboard</a>
                        <a href="#" data-page="admin-students">Students</a>
                        <a href="#" data-page="admin-courses">Courses</a>
                        <a href="#" data-page="admin-faculty">Faculty</a>
                        <a href="#" data-page="admin-attendance">Attendance</a>
                        <a href="#" data-page="admin-grades">Grades</a>
                        <a href="#" data-page="admin-notices">Notices</a>
                        <a href="#" data-logout class="btn btn-secondary btn-sm">Logout</a>
                    </div>
                </div>
            </nav>
        `
  }

  renderPublicContent() {
    switch (this.currentPage) {
      case "home":
        return this.renderHomePage()
      case "about":
        return this.renderAboutPage()
      case "contact":
        return this.renderContactPage()
      case "student-login":
        return this.renderStudentLoginPage()
      case "admin-login":
        return this.renderAdminLoginPage()
      default:
        return this.renderHomePage()
    }
  }

  renderStudentContent() {
    switch (this.currentPage) {
      case "student-dashboard":
        return this.renderStudentDashboard()
      case "student-courses":
        return this.renderStudentCourses()
      case "student-grades":
        return this.renderStudentGrades()
      case "student-attendance":
        return this.renderStudentAttendance()
      case "student-notices":
        return this.renderStudentNotices()
      default:
        return this.renderStudentDashboard()
    }
  }

  renderAdminContent() {
    switch (this.currentPage) {
      case "admin-dashboard":
        return this.renderAdminDashboard()
      case "admin-students":
        return this.renderAdminStudents()
      case "admin-courses":
        return this.renderAdminCourses()
      case "admin-faculty":
        return this.renderAdminFaculty()
      case "admin-departments":
        return this.renderAdminDepartments()
      case "admin-attendance":
        return this.renderAdminAttendance()
      case "admin-grades":
        return this.renderAdminGrades()
      case "admin-notices":
        return this.renderAdminNotices()
      case "admin-reports":
        return this.renderAdminReports()
      case "admin-settings":
        return this.renderAdminSettings()
      default:
        return this.renderAdminDashboard()
    }
  }

  renderHomePage() {
    return `
            <section class="hero">
                <div class="content">
                    <h1>Welcome to Our University</h1>
                    <p>Empowering minds, shaping futures, and building excellence through innovative education and world-class facilities</p>
                    <div class="btn-group">
                        <button class="btn btn-secondary btn-lg">Explore Programs</button>
                        <button class="btn btn-outline btn-lg">Apply Now</button>
                    </div>
                </div>
            </section>

            <section class="section">
                <div class="container">
                    <h2 class="section-title">Why Choose Us</h2>
                    <p class="section-subtitle">We provide a comprehensive educational experience with world-class resources and support</p>
                    <div class="grid grid-3">
                        <div class="card">
                            <div style="font-size: 2.5rem; margin-bottom: 1rem;">👨‍🎓</div>
                            <h3 style="margin-bottom: 0.5rem;">World-Class Faculty</h3>
                            <p class="text-muted">Learn from industry experts and renowned scholars with decades of experience</p>
                        </div>
                        <div class="card">
                            <div style="font-size: 2.5rem; margin-bottom: 1rem;">🏛️</div>
                            <h3 style="margin-bottom: 0.5rem;">Modern Facilities</h3>
                            <p class="text-muted">State-of-the-art labs, libraries, and learning spaces equipped with latest technology</p>
                        </div>
                        <div class="card">
                            <div style="font-size: 2.5rem; margin-bottom: 1rem;">🌍</div>
                            <h3 style="margin-bottom: 0.5rem;">Global Community</h3>
                            <p class="text-muted">Connect with students and professionals from around the world</p>
                        </div>
                    </div>
                </div>
            </section>

            <section style="background-color: rgba(30, 58, 95, 0.05); padding: 2rem 1.5rem; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);">
                <div class="container">
                    <div class="grid grid-4">
                        <div class="text-center">
                            <div style="font-size: 2rem; font-weight: bold; color: var(--primary); margin-bottom: 0.5rem;">2,450+</div>
                            <p class="text-muted">Active Students</p>
                        </div>
                        <div class="text-center">
                            <div style="font-size: 2rem; font-weight: bold; color: var(--primary); margin-bottom: 0.5rem;">85+</div>
                            <p class="text-muted">Courses Offered</p>
                        </div>
                        <div class="text-center">
                            <div style="font-size: 2rem; font-weight: bold; color: var(--primary); margin-bottom: 0.5rem;">320+</div>
                            <p class="text-muted">Faculty Members</p>
                        </div>
                        <div class="text-center">
                            <div style="font-size: 2rem; font-weight: bold; color: var(--primary); margin-bottom: 0.5rem;">98%</div>
                            <p class="text-muted">Placement Rate</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section" style="background-color: var(--primary); color: white; text-align: center;">
                <div class="container">
                    <h2 style="font-size: 2rem; margin-bottom: 1rem;">Ready to Start Your Journey?</h2>
                    <p style="margin-bottom: 2rem; opacity: 0.95;">Join thousands of students pursuing their dreams and building successful careers at our institution</p>
                    <a href="#" data-page="contact" class="btn btn-secondary btn-lg">Get in Touch</a>
                </div>
            </section>
        `
  }

  renderAboutPage() {
    return `
            <section class="section">
                <div class="container">
                    <h1 class="section-title">About Our University</h1>
                    <div class="grid grid-2" style="margin-top: 3rem;">
                        <div>
                            <h2 style="margin-bottom: 1rem;">Our Mission</h2>
                            <p class="text-muted" style="line-height: 1.8;">To provide world-class education that empowers students to become leaders, innovators, and responsible global citizens. We are committed to fostering intellectual growth, critical thinking, and practical skills that prepare our students for success in an ever-changing world.</p>
                        </div>
                        <div>
                            <h2 style="margin-bottom: 1rem;">Our Vision</h2>
                            <p class="text-muted" style="line-height: 1.8;">To be a leading institution of higher learning recognized globally for academic excellence, research innovation, and social responsibility. We strive to create an inclusive community where diversity is celebrated and every student has the opportunity to reach their full potential.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section" style="background-color: var(--background);">
                <div class="container">
                    <h2 class="section-title">Our Values</h2>
                    <div class="grid grid-3" style="margin-top: 2rem;">
                        <div class="card">
                            <h3 style="margin-bottom: 1rem;">Excellence</h3>
                            <p class="text-muted">We pursue the highest standards in all our endeavors, from teaching and research to student support and campus facilities.</p>
                        </div>
                        <div class="card">
                            <h3 style="margin-bottom: 1rem;">Integrity</h3>
                            <p class="text-muted">We uphold the highest ethical standards and promote honesty, transparency, and accountability in all our actions.</p>
                        </div>
                        <div class="card">
                            <h3 style="margin-bottom: 1rem;">Inclusivity</h3>
                            <p class="text-muted">We celebrate diversity and create an inclusive environment where all students feel valued and supported.</p>
                        </div>
                    </div>
                </div>
            </section>
        `
  }

  renderContactPage() {
    return `
            <section class="section">
                <div class="container">
                    <h1 class="section-title">Contact Us</h1>
                    <div class="grid grid-2" style="margin-top: 3rem; max-width: 1000px; margin-left: auto; margin-right: auto;">
                        <div>
                            <h2 style="margin-bottom: 2rem;">Get in Touch</h2>
                            <form id="contact-form" style="display: flex; flex-direction: column; gap: 1.5rem;">
                                <div class="form-group">
                                    <label>Full Name</label>
                                    <input type="text" placeholder="Your name" required>
                                </div>
                                <div class="form-group">
                                    <label>Email Address</label>
                                    <input type="email" placeholder="your@email.com" required>
                                </div>
                                <div class="form-group">
                                    <label>Subject</label>
                                    <input type="text" placeholder="How can we help?" required>
                                </div>
                                <div class="form-group">
                                    <label>Message</label>
                                    <textarea placeholder="Your message..." rows="5" required></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary btn-lg">Send Message</button>
                            </form>
                        </div>
                        <div>
                            <h2 style="margin-bottom: 2rem;">Contact Information</h2>
                            <div style="display: flex; flex-direction: column; gap: 2rem;">
                                <div>
                                    <h3 style="margin-bottom: 0.5rem;">Email</h3>
                                    <p class="text-muted">info@university.edu</p>
                                </div>
                                <div>
                                    <h3 style="margin-bottom: 0.5rem;">Phone</h3>
                                    <p class="text-muted">+1 (555) 123-4567</p>
                                </div>
                                <div>
                                    <h3 style="margin-bottom: 0.5rem;">Address</h3>
                                    <p class="text-muted">123 University Ave<br>City, State 12345<br>United States</p>
                                </div>
                                <div>
                                    <h3 style="margin-bottom: 0.5rem;">Office Hours</h3>
                                    <p class="text-muted">Monday - Friday: 9:00 AM - 5:00 PM<br>Saturday: 10:00 AM - 2:00 PM<br>Sunday: Closed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `
  }

  renderStudentLoginPage() {
    return `
            <section style="flex: 1; display: flex; align-items: center; justify-content: center; padding: 5rem 1.5rem;">
                <div class="card" style="width: 100%; max-width: 400px;">
                    <div style="margin-bottom: 2rem;">
                        <div style="width: 50px; height: 50px; background-color: rgba(30, 58, 95, 0.1); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; font-size: 1.5rem;">🎓</div>
                        <h1 style="font-size: 1.75rem; margin-bottom: 0.5rem;">Student Login</h1>
                        <p class="text-muted">Access your student portal and academic information</p>
                    </div>

                    <form id="student-login-form" style="display: flex; flex-direction: column; gap: 1.5rem;">
                        <div class="form-group">
                            <label>Email Address</label>
                            <input type="email" id="student-email" placeholder="student@university.edu" required>
                        </div>

                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" id="student-password" placeholder="Enter your password" required>
                        </div>

                        <div id="student-login-error" class="hidden"></div>

                        <button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">Login</button>
                    </form>

                    <div style="margin-top: 2rem; padding: 1rem; background-color: rgba(212, 175, 55, 0.1); border-radius: var(--radius); border: 1px solid rgba(212, 175, 55, 0.2);">
                        <p style="font-size: 0.85rem; text-align: center; color: var(--muted-foreground);">
                            <strong>Demo Mode:</strong> Use any email and password (min 6 characters)
                        </p>
                    </div>
                </div>
            </section>
        `
  }

  renderAdminLoginPage() {
    return `
            <section style="flex: 1; display: flex; align-items: center; justify-content: center; padding: 5rem 1.5rem;">
                <div class="card" style="width: 100%; max-width: 400px;">
                    <div style="margin-bottom: 2rem;">
                        <div style="width: 50px; height: 50px; background-color: rgba(30, 58, 95, 0.1); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; font-size: 1.5rem;">🔐</div>
                        <h1 style="font-size: 1.75rem; margin-bottom: 0.5rem;">Admin Login</h1>
                        <p class="text-muted">Access the administration dashboard</p>
                    </div>

                    <form id="admin-login-form" style="display: flex; flex-direction: column; gap: 1.5rem;">
                        <div class="form-group">
                            <label>Email Address</label>
                            <input type="email" id="admin-email" placeholder="admin@university.edu" required>
                        </div>

                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" id="admin-password" placeholder="Enter your password" required>
                        </div>

                        <div id="admin-login-error" class="hidden"></div>

                        <button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">Login</button>
                    </form>

                    <div style="margin-top: 2rem; padding: 1rem; background-color: rgba(212, 175, 55, 0.1); border-radius: var(--radius); border: 1px solid rgba(212, 175, 55, 0.2);">
                        <p style="font-size: 0.85rem; text-align: center; color: var(--muted-foreground);">
                            <strong>Demo:</strong> admin@university.edu / admin123
                        </p>
                    </div>
                </div>
            </section>
        `
  }

  renderStudentDashboard() {
    const studentId = "STU-" + Math.random().toString(36).substr(2, 9).toUpperCase()
    return `
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <div style="background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%); color: white; border-radius: var(--radius); padding: 2rem; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); border: 1px solid rgba(212, 175, 55, 0.2);">
                    <h1 style="font-size: 2rem; margin-bottom: 0.5rem;">Welcome back, ${this.currentUser.name}! 👋</h1>
                    <p style="opacity: 0.95;">Here's your academic overview and upcoming tasks</p>
                </div>

                <div class="grid grid-4">
                    <div class="card">
                        <div style="font-size: 0.85rem; color: var(--muted-foreground); margin-bottom: 0.5rem; font-weight: 600;">Student ID</div>
                        <div style="font-size: 1.75rem; font-weight: bold; color: var(--primary);">${studentId}</div>
                    </div>
                    <div class="card">
                        <div style="font-size: 0.85rem; color: var(--muted-foreground); margin-bottom: 0.5rem; font-weight: 600;">Current GPA</div>
                        <div style="font-size: 1.75rem; font-weight: bold; color: var(--primary);">3.75</div>
                    </div>
                    <div class="card">
                        <div style="font-size: 0.85rem; color: var(--muted-foreground); margin-bottom: 0.5rem; font-weight: 600;">Enrolled Courses</div>
                        <div style="font-size: 1.75rem; font-weight: bold; color: var(--primary);">5</div>
                    </div>
                    <div class="card">
                        <div style="font-size: 0.85rem; color: var(--muted-foreground); margin-bottom: 0.5rem; font-weight: 600;">Completed Credits</div>
                        <div style="font-size: 1.75rem; font-weight: bold; color: var(--primary);">45</div>
                    </div>
                </div>

                <div class="grid grid-2">
                    <div class="card">
                        <h2 style="font-size: 1.25rem; margin-bottom: 1.5rem;">📖 Current Courses</h2>
                        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                            ${[
                              "Data Structures",
                              "Web Development",
                              "Database Design",
                              "Algorithms",
                              "Software Engineering",
                            ]
                              .map(
                                (course) => `
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background-color: rgba(212, 175, 55, 0.1); border-radius: var(--radius); border: 1px solid rgba(212, 175, 55, 0.2);">
                                    <span style="font-weight: 500;">${course}</span>
                                    <span style="font-size: 0.75rem; background-color: var(--secondary); color: var(--foreground); padding: 0.25rem 0.75rem; border-radius: 20px; font-weight: 600;">Active</span>
                                </div>
                            `,
                              )
                              .join("")}
                        </div>
                    </div>

                    <div class="card">
                        <h2 style="font-size: 1.25rem; margin-bottom: 1.5rem;">⏰ Upcoming Deadlines</h2>
                        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                            ${[
                              { task: "Project Submission", date: "Oct 25", icon: "📝" },
                              { task: "Midterm Exam", date: "Oct 28", icon: "📋" },
                              { task: "Assignment 3", date: "Nov 1", icon: "✏️" },
                              { task: "Lab Report", date: "Nov 5", icon: "🔬" },
                              { task: "Final Project", date: "Nov 15", icon: "🎯" },
                            ]
                              .map(
                                (item) => `
                                <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background-color: rgba(212, 175, 55, 0.1); border-radius: var(--radius); border: 1px solid rgba(212, 175, 55, 0.2);">
                                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                                        <span>${item.icon}</span>
                                        <span style="font-weight: 500;">${item.task}</span>
                                    </div>
                                    <span style="font-size: 0.85rem; color: var(--muted-foreground); font-weight: 600;">${item.date}</span>
                                </div>
                            `,
                              )
                              .join("")}
                        </div>
                    </div>
                </div>

                <div class="card">
                    <h2 style="font-size: 1.25rem; margin-bottom: 1.5rem;">⚡ Quick Actions</h2>
                    <div class="grid grid-4">
                        <a href="#" data-page="student-attendance" class="btn btn-outline" style="text-align: center;">📍 Attendance</a>
                        <a href="#" data-page="student-grades" class="btn btn-outline" style="text-align: center;">📊 Grades</a>
                        <a href="#" data-page="student-notices" class="btn btn-outline" style="text-align: center;">📢 Notices</a>
                        <button class="btn btn-outline" style="text-align: center;">💬 Advisor</button>
                    </div>
                </div>
            </div>
        `
  }

  renderStudentCourses() {
    return `
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <h1 style="font-size: 2rem;">My Courses</h1>
                <div class="grid grid-2">
                    ${[
                      { name: "Data Structures", instructor: "Dr. Smith", credits: 3, grade: "A" },
                      { name: "Web Development", instructor: "Prof. Johnson", credits: 4, grade: "A-" },
                      { name: "Database Design", instructor: "Dr. Williams", credits: 3, grade: "B+" },
                      { name: "Algorithms", instructor: "Prof. Brown", credits: 4, grade: "A" },
                      { name: "Software Engineering", instructor: "Dr. Davis", credits: 3, grade: "B+" },
                      { name: "Web Security", instructor: "Prof. Miller", credits: 3, grade: "A-" },
                    ]
                      .map(
                        (course) => `
                        <div class="card">
                            <h3 style="margin-bottom: 0.5rem;">${course.name}</h3>
                            <p class="text-muted" style="margin-bottom: 1rem;">Instructor: ${course.instructor}</p>
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span style="font-weight: 600;">Credits: ${course.credits}</span>
                                <span style="background-color: var(--secondary); color: var(--foreground); padding: 0.25rem 0.75rem; border-radius: 20px; font-weight: 600; font-size: 0.85rem;">Grade: ${course.grade}</span>
                            </div>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            </div>
        `
  }

  renderStudentGrades() {
    return `
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <h1 style="font-size: 2rem;">My Grades</h1>
                <div class="card">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border);">
                        <h2>Current GPA: <span style="color: var(--primary); font-weight: bold;">3.75</span></h2>
                        <span style="background-color: var(--secondary); color: var(--foreground); padding: 0.5rem 1rem; border-radius: 20px; font-weight: 600;">Excellent</span>
                    </div>
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="border-bottom: 2px solid var(--border);">
                                <th style="text-align: left; padding: 1rem; font-weight: 600;">Course</th>
                                <th style="text-align: center; padding: 1rem; font-weight: 600;">Grade</th>
                                <th style="text-align: center; padding: 1rem; font-weight: 600;">Percentage</th>
                                <th style="text-align: center; padding: 1rem; font-weight: 600;">Credits</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${[
                              { course: "Data Structures", grade: "A", percentage: 92, credits: 3 },
                              { course: "Web Development", grade: "A-", percentage: 88, credits: 4 },
                              { course: "Database Design", grade: "B+", percentage: 85, credits: 3 },
                              { course: "Algorithms", grade: "A", percentage: 91, credits: 4 },
                              { course: "Software Engineering", grade: "B+", percentage: 84, credits: 3 },
                            ]
                              .map(
                                (item) => `
                                <tr style="border-bottom: 1px solid var(--border);">
                                    <td style="padding: 1rem;">${item.course}</td>
                                    <td style="text-align: center; padding: 1rem; font-weight: 600; color: var(--primary);">${item.grade}</td>
                                    <td style="text-align: center; padding: 1rem;">${item.percentage}%</td>
                                    <td style="text-align: center; padding: 1rem;">${item.credits}</td>
                                </tr>
                            `,
                              )
                              .join("")}
                        </tbody>
                    </table>
                </div>
            </div>
        `
  }

  renderStudentAttendance() {
    return `
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <h1 style="font-size: 2rem;">Attendance</h1>
                <div class="grid grid-2">
                    ${[
                      { course: "Data Structures", percentage: 95, status: "Excellent" },
                      { course: "Web Development", percentage: 92, status: "Good" },
                      { course: "Database Design", percentage: 88, status: "Good" },
                      { course: "Algorithms", percentage: 96, status: "Excellent" },
                      { course: "Software Engineering", percentage: 90, status: "Good" },
                      { course: "Web Security", percentage: 94, status: "Excellent" },
                    ]
                      .map(
                        (item) => `
                        <div class="card">
                            <h3 style="margin-bottom: 1rem;">${item.course}</h3>
                            <div style="margin-bottom: 1rem;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                    <span style="font-weight: 600;">Attendance</span>
                                    <span style="font-weight: bold; color: var(--primary);">${item.percentage}%</span>
                                </div>
                                <div style="width: 100%; height: 8px; background-color: var(--muted); border-radius: 4px; overflow: hidden;">
                                    <div style="width: ${item.percentage}%; height: 100%; background-color: var(--secondary);"></div>
                                </div>
                            </div>
                            <span style="background-color: rgba(212, 175, 55, 0.1); color: var(--foreground); padding: 0.25rem 0.75rem; border-radius: 20px; font-weight: 600; font-size: 0.85rem;">${item.status}</span>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            </div>
        `
  }

  renderStudentNotices() {
    return `
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <h1 style="font-size: 2rem;">Notices & Announcements</h1>
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    ${[
                      {
                        title: "Midterm Exam Schedule Released",
                        category: "Academic",
                        date: "2 hours ago",
                        icon: "📋",
                      },
                      { title: "Campus Maintenance Notice", category: "General", date: "1 day ago", icon: "🔧" },
                      { title: "Scholarship Application Deadline", category: "Urgent", date: "2 days ago", icon: "⚠️" },
                      { title: "New Library Hours", category: "General", date: "3 days ago", icon: "📚" },
                      { title: "Career Fair Next Week", category: "Events", date: "4 days ago", icon: "🎯" },
                    ]
                      .map(
                        (notice) => `
                        <div class="card" style="display: flex; justify-content: space-between; align-items: start; gap: 1rem;">
                            <div style="flex: 1;">
                                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                                    <span style="font-size: 1.25rem;">${notice.icon}</span>
                                    <span style="font-size: 0.75rem; background-color: rgba(212, 175, 55, 0.1); color: var(--foreground); padding: 0.25rem 0.75rem; border-radius: 20px; font-weight: 600;">${notice.category}</span>
                                </div>
                                <h3 style="margin-bottom: 0.5rem;">${notice.title}</h3>
                                <p class="text-muted" style="font-size: 0.85rem;">${notice.date}</p>
                            </div>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            </div>
        `
  }

  renderAdminDashboard() {
    const totalEnrollments = universityData.courses.reduce((sum, course) => sum + course.enrolled, 0)
    return `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div style="background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%); color: white; border-radius: var(--radius); padding: 2rem; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); border: 1px solid rgba(212, 175, 55, 0.2);">
          <h1 style="font-size: 2rem; margin-bottom: 0.5rem;">${universityData.name} - Administration Dashboard</h1>
          <p style="opacity: 0.95;">Manage students, courses, faculty, and university operations</p>
        </div>

        <div class="grid grid-4">
          <div class="card">
            <div style="font-size: 0.85rem; color: var(--muted-foreground); margin-bottom: 0.5rem; font-weight: 600;">Total Students</div>
            <div style="font-size: 1.75rem; font-weight: bold; color: var(--primary);">${universityData.students.length}</div>
          </div>
          <div class="card">
            <div style="font-size: 0.85rem; color: var(--muted-foreground); margin-bottom: 0.5rem; font-weight: 600;">Active Courses</div>
            <div style="font-size: 1.75rem; font-weight: bold; color: var(--primary);">${universityData.courses.length}</div>
          </div>
          <div class="card">
            <div style="font-size: 0.85rem; color: var(--muted-foreground); margin-bottom: 0.5rem; font-weight: 600;">Faculty Members</div>
            <div style="font-size: 1.75rem; font-weight: bold; color: var(--primary);">${universityData.faculty.length}</div>
          </div>
          <div class="card">
            <div style="font-size: 0.85rem; color: var(--muted-foreground); margin-bottom: 0.5rem; font-weight: 600;">Total Enrollments</div>
            <div style="font-size: 1.75rem; font-weight: bold; color: var(--primary);">${totalEnrollments}</div>
          </div>
        </div>

        <div class="grid grid-3">
          <div class="card">
            <div style="font-size: 0.85rem; color: var(--muted-foreground); margin-bottom: 0.5rem; font-weight: 600;">Departments</div>
            <div style="font-size: 1.75rem; font-weight: bold; color: var(--primary);">${universityData.departments.length}</div>
          </div>
          <div class="card">
            <div style="font-size: 0.85rem; color: var(--muted-foreground); margin-bottom: 0.5rem; font-weight: 600;">Founded</div>
            <div style="font-size: 1.75rem; font-weight: bold; color: var(--primary);">${universityData.founded}</div>
          </div>
          <div class="card">
            <div style="font-size: 0.85rem; color: var(--muted-foreground); margin-bottom: 0.5rem; font-weight: 600;">Location</div>
            <div style="font-size: 0.95rem; font-weight: bold; color: var(--primary);">${universityData.location}</div>
          </div>
        </div>

        <div class="card">
          <h2 style="font-size: 1.25rem; margin-bottom: 2rem;">Management Modules</h2>
          <div class="grid grid-3">
            <a href="#" data-page="admin-students" class="btn btn-outline" style="height: 120px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.75rem; text-decoration: none;">
              <span style="font-size: 2rem;">👥</span>
              <span style="font-weight: 600;">Manage Students</span>
            </a>
            <a href="#" data-page="admin-courses" class="btn btn-outline" style="height: 120px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.75rem; text-decoration: none;">
              <span style="font-size: 2rem;">📚</span>
              <span style="font-weight: 600;">Manage Courses</span>
            </a>
            <a href="#" data-page="admin-faculty" class="btn btn-outline" style="height: 120px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.75rem; text-decoration: none;">
              <span style="font-size: 2rem;">👨‍🏫</span>
              <span style="font-weight: 600;">Manage Faculty</span>
            </a>
          </div>
        </div>

        <div class="card">
          <h2 style="font-size: 1.25rem; margin-bottom: 2rem;">Additional Management</h2>
          <div class="grid grid-3">
            <a href="#" data-page="admin-departments" class="btn btn-outline" style="height: 120px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.75rem; text-decoration: none;">
              <span style="font-size: 2rem;">🏢</span>
              <span style="font-weight: 600;">Departments</span>
            </a>
            <a href="#" data-page="admin-attendance" class="btn btn-outline" style="height: 120px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.75rem; text-decoration: none;">
              <span style="font-size: 2rem;">📍</span>
              <span style="font-weight: 600;">Attendance</span>
            </a>
            <a href="#" data-page="admin-grades" class="btn btn-outline" style="height: 120px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.75rem; text-decoration: none;">
              <span style="font-size: 2rem;">📊</span>
              <span style="font-weight: 600;">Grades</span>
            </a>
          </div>
        </div>

        <div class="card">
          <h2 style="font-size: 1.25rem; margin-bottom: 2rem;">System Management</h2>
          <div class="grid grid-3">
            <a href="#" data-page="admin-notices" class="btn btn-outline" style="height: 120px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.75rem; text-decoration: none;">
              <span style="font-size: 2rem;">📢</span>
              <span style="font-weight: 600;">Notices</span>
            </a>
            <a href="#" data-page="admin-reports" class="btn btn-outline" style="height: 120px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.75rem; text-decoration: none;">
              <span style="font-size: 2rem;">📈</span>
              <span style="font-weight: 600;">Reports</span>
            </a>
            <a href="#" data-page="admin-settings" class="btn btn-outline" style="height: 120px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.75rem; text-decoration: none;">
              <span style="font-size: 2rem;">⚙️</span>
              <span style="font-weight: 600;">Settings</span>
            </a>
          </div>
        </div>

        <div class="card">
          <h2 style="font-size: 1.25rem; margin-bottom: 1.5rem;">Recent Activity</h2>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${[
              { activity: "New student enrollment: Jessica Lee", icon: "✅", time: "2 hours ago" },
              { activity: "Course updated: Database Design", icon: "📝", time: "4 hours ago" },
              { activity: "Faculty member added: Dr. Patricia Lee", icon: "👤", time: "1 day ago" },
              { activity: "Grade submission: CS101 completed", icon: "📊", time: "2 days ago" },
              { activity: "System backup completed successfully", icon: "💾", time: "3 days ago" },
            ]
              .map(
                (item) => `
              <div style="display: flex; align-items: center; gap: 1rem; padding: 0.75rem; background-color: var(--muted); border-radius: var(--radius); border: 1px solid var(--border);">
                <div style="font-size: 1.25rem; flex-shrink: 0;">${item.icon}</div>
                <div style="flex: 1; min-width: 0;">
                  <span style="font-weight: 500;">${item.activity}</span>
                </div>
                <span style="font-size: 0.85rem; color: var(--muted-foreground); font-weight: 600; flex-shrink: 0;">${item.time}</span>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      </div>
    `
  }

  renderAdminStudents() {
    return `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <h1 style="font-size: 2rem;">Manage Students</h1>
          <button class="btn btn-primary" onclick="document.getElementById('addStudentForm').style.display='block'">+ Add Student</button>
        </div>

        <div id="addStudentForm" class="card" style="display: none; margin-bottom: 2rem;">
          <h2 style="margin-bottom: 1.5rem;">Add New Student</h2>
          <form style="display: flex; flex-direction: column; gap: 1rem;">
            <input type="text" placeholder="Full Name" required style="padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);">
            <input type="email" placeholder="Email Address" required style="padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);">
            <select style="padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);">
              <option>Select Department</option>
              ${universityData.departments.map((dept) => `<option>${dept.name}</option>`).join("")}
            </select>
            <input type="number" placeholder="GPA" min="0" max="4" step="0.1" required style="padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);">
            <div style="display: flex; gap: 1rem;">
              <button type="submit" class="btn btn-primary" style="flex: 1;">Save Student</button>
              <button type="button" class="btn btn-outline" style="flex: 1;" onclick="document.getElementById('addStudentForm').style.display='none'">Cancel</button>
            </div>
          </form>
        </div>

        <div class="card">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="border-bottom: 2px solid var(--border);">
                <th style="text-align: left; padding: 1rem; font-weight: 600;">ID</th>
                <th style="text-align: left; padding: 1rem; font-weight: 600;">Name</th>
                <th style="text-align: left; padding: 1rem; font-weight: 600;">Email</th>
                <th style="text-align: left; padding: 1rem; font-weight: 600;">Department</th>
                <th style="text-align: center; padding: 1rem; font-weight: 600;">GPA</th>
                <th style="text-align: center; padding: 1rem; font-weight: 600;">Status</th>
                <th style="text-align: center; padding: 1rem; font-weight: 600;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${universityData.students
                .map(
                  (student) => `
                <tr style="border-bottom: 1px solid var(--border);">
                  <td style="padding: 1rem; font-weight: 600;">${student.id}</td>
                  <td style="padding: 1rem;">${student.name}</td>
                  <td style="padding: 1rem;">${student.email}</td>
                  <td style="padding: 1rem;">${student.dept}</td>
                  <td style="text-align: center; padding: 1rem; font-weight: 600;">${student.gpa}</td>
                  <td style="text-align: center; padding: 1rem;">
                    <span style="background-color: rgba(34, 197, 94, 0.1); color: #22c55e; padding: 0.25rem 0.75rem; border-radius: 20px; font-weight: 600; font-size: 0.85rem;">${student.status}</span>
                  </td>
                  <td style="text-align: center; padding: 1rem;">
                    <button class="btn btn-sm btn-outline" onclick="alert('Edit student: ${student.name}')">Edit</button>
                    <button class="btn btn-sm btn-outline" style="margin-left: 0.5rem;" onclick="alert('Delete student: ${student.name}')">Delete</button>
                  </td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
    `
  }

  renderAdminCourses() {
    return `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <h1 style="font-size: 2rem;">Manage Courses</h1>
          <button class="btn btn-primary" onclick="document.getElementById('addCourseForm').style.display='block'">+ Add Course</button>
        </div>

        <div id="addCourseForm" class="card" style="display: none; margin-bottom: 2rem;">
          <h2 style="margin-bottom: 1.5rem;">Add New Course</h2>
          <form style="display: flex; flex-direction: column; gap: 1rem;">
            <input type="text" placeholder="Course Name" required style="padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);">
            <input type="text" placeholder="Course Code" required style="padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);">
            <select style="padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);">
              <option>Select Instructor</option>
              ${universityData.faculty.map((fac) => `<option>${fac.name}</option>`).join("")}
            </select>
            <input type="number" placeholder="Credits" min="1" max="4" required style="padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);">
            <input type="number" placeholder="Capacity" min="1" required style="padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);">
            <div style="display: flex; gap: 1rem;">
              <button type="submit" class="btn btn-primary" style="flex: 1;">Save Course</button>
              <button type="button" class="btn btn-outline" style="flex: 1;" onclick="document.getElementById('addCourseForm').style.display='none'">Cancel</button>
            </div>
          </form>
        </div>

        <div class="grid grid-2">
          ${universityData.courses
            .map(
              (course) => `
          <div class="card">
            <h3 style="margin-bottom: 0.5rem;">${course.name}</h3>
            <p class="text-muted" style="margin-bottom: 0.5rem;">Code: ${course.code}</p>
            <p class="text-muted" style="margin-bottom: 0.5rem;">Instructor: ${course.instructor}</p>
            <p class="text-muted" style="margin-bottom: 1rem;">Schedule: ${course.schedule}</p>
            <div style="margin-bottom: 1rem;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span style="font-weight: 600;">Enrollment</span>
                <span style="font-weight: bold; color: var(--primary);">${course.enrolled}/${course.capacity}</span>
              </div>
              <div style="width: 100%; height: 8px; background-color: var(--muted); border-radius: 4px; overflow: hidden;">
                <div style="width: ${(course.enrolled / course.capacity) * 100}%; height: 100%; background-color: var(--secondary);"></div>
              </div>
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <button class="btn btn-sm btn-outline" style="flex: 1;" onclick="alert('Edit course: ${course.name}')">Edit</button>
              <button class="btn btn-sm btn-outline" style="flex: 1;" onclick="alert('Delete course: ${course.name}')">Delete</button>
            </div>
          </div>
        `,
            )
            .join("")}
        </div>
      </div>
    `
  }

  renderAdminFaculty() {
    return `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <h1 style="font-size: 2rem;">Manage Faculty</h1>
          <button class="btn btn-primary" onclick="document.getElementById('addFacultyForm').style.display='block'">+ Add Faculty</button>
        </div>

        <div id="addFacultyForm" class="card" style="display: none; margin-bottom: 2rem;">
          <h2 style="margin-bottom: 1.5rem;">Add New Faculty Member</h2>
          <form style="display: flex; flex-direction: column; gap: 1rem;">
            <input type="text" placeholder="Full Name" required style="padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);">
            <input type="email" placeholder="Email Address" required style="padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);">
            <input type="tel" placeholder="Phone Number" required style="padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);">
            <select style="padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);">
              <option>Select Department</option>
              ${universityData.departments.map((dept) => `<option>${dept.name}</option>`).join("")}
            </select>
            <select style="padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);">
              <option>Select Title</option>
              <option>Professor</option>
              <option>Associate Professor</option>
              <option>Assistant Professor</option>
              <option>Lecturer</option>
            </select>
            <div style="display: flex; gap: 1rem;">
              <button type="submit" class="btn btn-primary" style="flex: 1;">Save Faculty</button>
              <button type="button" class="btn btn-outline" style="flex: 1;" onclick="document.getElementById('addFacultyForm').style.display='none'">Cancel</button>
            </div>
          </form>
        </div>

        <div class="card">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="border-bottom: 2px solid var(--border);">
                <th style="text-align: left; padding: 1rem; font-weight: 600;">Name</th>
                <th style="text-align: left; padding: 1rem; font-weight: 600;">Email</th>
                <th style="text-align: left; padding: 1rem; font-weight: 600;">Department</th>
                <th style="text-align: left; padding: 1rem; font-weight: 600;">Title</th>
                <th style="text-align: center; padding: 1rem; font-weight: 600;">Courses</th>
                <th style="text-align: center; padding: 1rem; font-weight: 600;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${universityData.faculty
                .map(
                  (faculty) => `
                <tr style="border-bottom: 1px solid var(--border);">
                  <td style="padding: 1rem;">${faculty.name}</td>
                  <td style="padding: 1rem;">${faculty.email}</td>
                  <td style="padding: 1rem;">${faculty.dept}</td>
                  <td style="padding: 1rem;">${faculty.title}</td>
                  <td style="text-align: center; padding: 1rem; font-weight: 600;">${faculty.courses}</td>
                  <td style="text-align: center; padding: 1rem;">
                    <button class="btn btn-sm btn-outline" onclick="alert('Edit faculty: ${faculty.name}')">Edit</button>
                    <button class="btn btn-sm btn-outline" style="margin-left: 0.5rem;" onclick="alert('Delete faculty: ${faculty.name}')">Delete</button>
                  </td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
    `
  }

  renderAdminDepartments() {
    return `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <h1 style="font-size: 2rem;">Manage Departments</h1>
          <button class="btn btn-primary" onclick="alert('Add department form')">+ Add Department</button>
        </div>
        <div class="grid grid-2">
          ${universityData.departments
            .map(
              (dept) => `
          <div class="card">
            <h3 style="margin-bottom: 0.5rem;">${dept.name}</h3>
            <p class="text-muted" style="margin-bottom: 1rem;">Head: ${dept.head}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding: 1rem; background-color: var(--muted); border-radius: var(--radius);">
              <span style="font-weight: 600;">Students</span>
              <span style="font-size: 1.5rem; font-weight: bold; color: var(--primary);">${dept.students}</span>
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <button class="btn btn-sm btn-outline" style="flex: 1;" onclick="alert('Edit department: ${dept.name}')">Edit</button>
              <button class="btn btn-sm btn-outline" style="flex: 1;" onclick="alert('Delete department: ${dept.name}')">Delete</button>
            </div>
          </div>
        `,
            )
            .join("")}
        </div>
      </div>
    `
  }

  renderAdminReports() {
    return `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <h1 style="font-size: 2rem;">System Reports</h1>
        <div class="grid grid-2">
          <div class="card">
            <h2 style="margin-bottom: 1.5rem;">📊 Enrollment Report</h2>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <div style="display: flex; justify-content: space-between; padding: 0.75rem; background-color: var(--muted); border-radius: var(--radius);">
                <span>Total Enrolled Students</span>
                <span style="font-weight: bold; color: var(--primary);">${universityData.students.length}</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 0.75rem; background-color: var(--muted); border-radius: var(--radius);">
                <span>Active Courses</span>
                <span style="font-weight: bold; color: var(--primary);">${universityData.courses.length}</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 0.75rem; background-color: var(--muted); border-radius: var(--radius);">
                <span>Total Enrollments</span>
                <span style="font-weight: bold; color: var(--primary);">${universityData.courses.reduce((sum, c) => sum + c.enrolled, 0)}</span>
              </div>
              <button class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Download Report</button>
            </div>
          </div>
          <div class="card">
            <h2 style="margin-bottom: 1.5rem;">👥 Faculty Report</h2>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <div style="display: flex; justify-content: space-between; padding: 0.75rem; background-color: var(--muted); border-radius: var(--radius);">
                <span>Total Faculty</span>
                <span style="font-weight: bold; color: var(--primary);">${universityData.faculty.length}</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 0.75rem; background-color: var(--muted); border-radius: var(--radius);">
                <span>Departments</span>
                <span style="font-weight: bold; color: var(--primary);">${universityData.departments.length}</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 0.75rem; background-color: var(--muted); border-radius: var(--radius);">
                <span>Avg Courses/Faculty</span>
                <span style="font-weight: bold; color: var(--primary);">${(universityData.courses.length / universityData.faculty.length).toFixed(1)}</span>
              </div>
              <button class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Download Report</button>
            </div>
          </div>
        </div>
      </div>
    `
  }

  renderAdminSettings() {
    return `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <h1 style="font-size: 2rem;">System Settings</h1>
        <div class="card">
          <h2 style="margin-bottom: 2rem;">University Information</h2>
          <form style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div class="form-group">
              <label>University Name</label>
              <input type="text" value="${universityData.name}" style="padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius); width: 100%;">
            </div>
            <div class="form-group">
              <label>Location</label>
              <input type="text" value="${universityData.location}" style="padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius); width: 100%;">
            </div>
            <div class="form-group">
              <label>Founded Year</label>
              <input type="number" value="${universityData.founded}" style="padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius); width: 100%;">
            </div>
            <button type="submit" class="btn btn-primary">Save Settings</button>
          </form>
        </div>

        <div class="card">
          <h2 style="margin-bottom: 2rem;">System Maintenance</h2>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <button class="btn btn-outline" style="width: 100%; text-align: left; padding: 1rem;">🔄 Backup Database</button>
            <button class="btn btn-outline" style="width: 100%; text-align: left; padding: 1rem;">🗑️ Clear Cache</button>
            <button class="btn btn-outline" style="width: 100%; text-align: left; padding: 1rem;">📊 Generate System Report</button>
            <button class="btn btn-outline" style="width: 100%; text-align: left; padding: 1rem;">🔐 Security Audit</button>
          </div>
        </div>
      </div>
    `
  }

  renderFooter() {
    return `
            <footer>
                <div class="container">
                    <div class="footer-content">
                        <div>
                            <h4>University</h4>
                            <p class="text-muted">Building excellence in education and shaping the leaders of tomorrow</p>
                        </div>
                        <div>
                            <h4>Quick Links</h4>
                            <ul>
                                <li><a href="#" data-page="about">About Us</a></li>
                                <li><a href="#" data-page="contact">Contact</a></li>
                                <li><a href="#">Admissions</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4>Programs</h4>
                            <ul>
                                <li><a href="#">Undergraduate</a></li>
                                <li><a href="#">Graduate</a></li>
                                <li><a href="#">Certificates</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4>Contact</h4>
                            <p class="text-muted">info@university.edu</p>
                            <p class="text-muted">+1 (555) 123-4567</p>
                            <p class="text-muted">123 University Ave, City, State 12345</p>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>&copy; 2025 University. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `
  }
}

// Initialize app when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new UniversityApp()
})

// Handle form submissions
document.addEventListener("submit", (e) => {
  if (e.target.id === "student-login-form") {
    e.preventDefault()
    const email = document.getElementById("student-email").value
    const password = document.getElementById("student-password").value

    if (email && password.length >= 6) {
      localStorage.setItem("student", JSON.stringify({ email, name: email.split("@")[0] }))
      location.reload()
    } else {
      const errorDiv = document.getElementById("student-login-error")
      errorDiv.innerHTML = '<div class="alert alert-error">Please enter valid credentials</div>'
      errorDiv.classList.remove("hidden")
    }
  }

  if (e.target.id === "admin-login-form") {
    e.preventDefault()
    const email = document.getElementById("admin-email").value
    const password = document.getElementById("admin-password").value

    if (email === "admin@university.edu" && password === "admin123") {
      localStorage.setItem("admin", JSON.stringify({ email, name: "Admin" }))
      location.reload()
    } else {
      const errorDiv = document.getElementById("admin-login-error")
      errorDiv.innerHTML = '<div class="alert alert-error">Invalid admin credentials</div>'
      errorDiv.classList.remove("hidden")
    }
  }

  if (e.target.id === "contact-form") {
    e.preventDefault()
    alert("Thank you for your message! We will get back to you soon.")
    e.target.reset()
  }
})
