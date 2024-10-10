function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Admin validation
    if (username === "admin" && password === "admin") {
        // Set login status and role as admin
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "admin");

        // Redirect to admin page
        window.location.href = "admin.html";
    }
    // Regular user validation (you can change this for real-world cases)
    else if (username === "user" && password === "password") {
        // Set login status and role as user
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "user");

        // Redirect to index page
        window.location.href = "index.html";
    } else {
        alert("Invalid credentials!");
    }
}