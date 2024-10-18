let submittedItems = JSON.parse(localStorage.getItem('submittedItems')) || [];

// Function to clear form fields
function clearFormFields() {
    document.getElementById('status').value = '';
    document.getElementById('name').value = '';
    document.getElementById('contact').value = '';
    document.getElementById('department').value = '';
    document.getElementById('studentNumber').value = '';
    document.getElementById('remarks').value = '';
}

// Function to submit the item form
function submitItemForm() {
    const status = document.getElementById('status').value;
    const name = document.getElementById('name').value;
    const contact = document.getElementById('contact').value;
    const department = document.getElementById('department').value;
    const studentNumber = document.getElementById('studentNumber').value;
    const remarks = document.getElementById('remarks').value;

    // Validate required fields
    if (!name || !contact || !department || !studentNumber || !remarks) {
        alert("All fields are required!");
        return;
    }

    // Validate contact number (example format check)
    if (!/^09\d{9}$/.test(contact)) {
        alert("Please enter a valid contact number starting with '09'.");
        return;
    }

   // Create a submission object
    const submission = {
        id: Date.now(),
        status,
        name,
        contact,
        department,
        studentNumber,
        remarks
    };

    try {
        // Store the new submission in the array and update localStorage
        submittedItems.push(submission);
        localStorage.setItem('submittedItems', JSON.stringify(submittedItems));

        // Display success feedback
        alert('Form submitted successfully!');

        // Clear form fields
        clearFormFields();

        // Optionally close the modal if it's open
        $('#formModal').modal('hide');

    } catch (error) {
        console.error("Error saving submission:", error);
        alert("There was an error submitting the form. Please try again.");
    }
}

// Function to display all submissions (for admin viewing)
function displaySubmittedForms() {
    const submittedItems = JSON.parse(localStorage.getItem('submittedItems')) || [];
    
    if (submittedItems.length === 0) {
        console.log("No submissions found.");
        return;
    }

    submittedItems.forEach(submission => {
        console.log(`Status: ${submission.status}`);
        console.log(`Name: ${submission.name}`);
        console.log(`Contact: ${submission.contact}`);
        console.log(`Department: ${submission.department}`);
        console.log(`Student Number: ${submission.studentNumber}`);
        console.log(`Remarks: ${submission.remarks}`);
        console.log('-----------------------------');
    });
}

// Function to check if there are submitted forms for a specific item
function hasSubmittedForms(itemName) {
    return submittedItems.some(submission => submission.itemName === itemName); // Check for submissions
}
