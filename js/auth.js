// auth.js
function checkLogin() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userRole = localStorage.getItem("userRole");

    // If not logged in, redirect to login page
    if (!isLoggedIn) {
        window.location.href = "login.html";
        return;
    }

    // Check role and redirect if necessary
    if (userRole === "admin" && window.location.pathname !== '/admin.html') {
        window.location.href = "admin.html"; // Admin should be on admin page
    } else if (userRole === "user" && window.location.pathname !== '/index.html') {
        window.location.href = "index.html"; // User should be on index page
    }
}
