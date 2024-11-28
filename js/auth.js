function checkLogin() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userRole = localStorage.getItem("userRole");
    
    // If not logged in, redirect to login page
    if (!isLoggedIn) {
        alert("Not logged in. Redirecting to login page...");
        window.location.href = "login.html";
        return;
    }

    // Check if user is trying to access the admin page
    if (userRole === "user" && window.location.pathname === "/admin.html") {
        alert("Access denied. Users cannot access the admin page.");
        window.location.href = "list.html"; // Redirect user to index page
        return;
    }

    // If user is admin, allow access to both pages
    if (userRole === "admin" && window.location.pathname !== "/admin.html" && window.location.pathname !== "/list.html") {
        window.location.href = "admin.html"; // Admin should be on admin page
    }
}

window.onload = function() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userRole = localStorage.getItem("userRole");
    const welcomeMessageElement = document.getElementById('welcomeMessage');

    // Set the welcome message based on user role and name
    if (userRole === "admin") {
        welcomeMessageElement.innerText = "Welcome, Admin!";
    } else if (currentUser && currentUser.fullName) {
        welcomeMessageElement.innerText = `Welcome, ${currentUser.fullName}!`;
    } else {
        welcomeMessageElement.innerText = "Welcome!";
    }
};
