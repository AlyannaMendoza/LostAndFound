// signup.js

 // Basic email validation
 const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};


document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form values
    const fullName = document.getElementById('fullName').value;
    const studentNumber = document.getElementById('studentNumber').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate inputs
    if (!fullName || !studentNumber || !email || !password) {
        alert('All fields are required.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email.');
        return;
    }

    // Create user object
    const user = {
        fullName: fullName,
        studentNumber: studentNumber,
        email: email,
        password: password
    };

    // Store user in localStorage 
    let users = JSON.parse(localStorage.getItem('users')) || []; // Retrieve existing users
    users.push(user); // Add new user
    localStorage.setItem('users', JSON.stringify(users)); // Store updated users list

    // Redirect to login page after successful sign up
    alert('Sign up successful! Redirecting to login...');
    window.location.href = 'login.html';
});
