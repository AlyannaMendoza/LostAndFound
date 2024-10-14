function login(event) {
    event.preventDefault(); // Prevent form from submitting

    const studentNumber = document.getElementById("studentNumber").value;
    const password = document.getElementById("password").value;

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find matching user based on student number and password
    const user = users.find(user => user.studentNumber === studentNumber && user.password === password);

    if (user) {
        // Successful login
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "user");
        localStorage.setItem("currentUser", JSON.stringify(user)); 

        // Redirect to user page
        window.location.href = "index.html";
    } else if (studentNumber === "admin" && password === "admin") {
        // Admin login
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "admin");

        // Redirect to admin page
        window.location.href = "admin.html";
    } else {
        // Invalid credentials
        alert("Invalid student number or password!");
    }
}
