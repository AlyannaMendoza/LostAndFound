
function logout() {
    if (confirm("Are you sure you want to log out?")) {
        // Remove login status and user role from local storage
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userRole");

        // Redirect to the login page
        window.location.href = "login.html";
    }
}