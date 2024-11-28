const items = JSON.parse(localStorage.getItem('items')) || [];
let editIndex = -1; // Track the index of the item being edited

// Function to add or update an item
function addItem(event) {
    event.preventDefault();

    const itemInput = document.querySelector('#itemInput').value.trim();
    const descriptionInput = document.querySelector('#descriptionInput').value.trim();
    const contactInput = document.querySelector('#contactInput').value.trim();
    const dateInput = document.querySelector('#dateInput').value.trim();
    const statusInput = document.querySelector('#statusInput').value.trim();

    if (!itemInput || !descriptionInput || !contactInput || !dateInput || !statusInput) {
        alert("All fields are required!");
        return;
    }

    const newItem = {
        item: itemInput,
        description: descriptionInput,
        contact: contactInput,
        date: dateInput,
        status: statusInput
    };

    if (editIndex === -1) {
        items.push(newItem);
        alert("Item added successfully!");
    } else {
        items[editIndex] = newItem;
        alert("Item updated successfully!");
        editIndex = -1;
    }

    localStorage.setItem('items', JSON.stringify(items));
    document.querySelector('form').reset();
    document.querySelector('button[type="submit"]').textContent = "Add Item";
    displayItems();
}



// Function to filter items based on status
function filterItems(status) {
    const filteredItems = items.filter(item => item.status.toLowerCase() === status.toLowerCase());
    displayFilteredItems(filteredItems);
}

// Function to display filtered items
function displayFilteredItems(filteredItems) {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; // Clear existing rows

    if (filteredItems.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="6" class="text-center">No items found</td>`; // Display message if no items match
        tbody.appendChild(row);
    } else {
        filteredItems.forEach((item, i) => {
            const row = createTableRow(item, i);
            tbody.appendChild(row);
        });
    }
}

// Function to display all items
function displayItems() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; // Clear existing rows

    // Iterate over items and create table rows
    items.forEach((item, i) => {
        const row = createTableRow(item, i);
        tbody.appendChild(row);
    });

    // Check if there are no items to display
    if (items.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="6" class="text-center">No items found</td>`; // Display message if no items are found
        tbody.appendChild(row);
    }
}

// Function to create a table row for an item
function createTableRow(item, index) {
    // Ensure getSubmittedForms returns an array; guard against potential issues
    let hasForms = false;

    try {
        hasForms = getSubmittedForms(item.item).length > 0; // Check if there are any submitted forms
    } catch (error) {
        console.error("Error checking submitted forms: ", error);
    }
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${item.item}</td>
        <td>${item.description}</td>
        <td>${item.contact}</td>
        <td>${item.date}</td>
        <td>${item.status}</td>
        <td>
            ${document.body.contains(document.getElementById('adminPage')) ? `
                <button class="btn btn-danger btn-sm" onclick="deleteItem(${index})">Delete</button>
                <button class="btn btn-success btn-sm" onclick="editItem(${index})">Edit</button>
            ` : ''}
        </td>
         <td>
            ${document.body.contains(document.getElementById('adminPage')) ? `
                <button class="btn btn-info btn-sm" onclick="showSubmittedForms('${item.item}')">Details</button>
            ` : ''}

            ${document.body.contains(document.getElementById('itemPage')) ? `
                <button class="btn" onclick="openFormModal(${index})">
                    <i class="bi bi-pencil-square" style="font-size: unset;"></i>
                </button>
            ` : ''}
        </td>
        <td>
            ${document.body.contains(document.getElementById('adminPage')) ? `
                ${hasForms ? '<span class="text-warning">&#x26A0;</span>' : ''} <!-- Show warning icon if forms exist -->
            ` : ''}
        </td>
    `;
    return row;
}

// Function to delete an item
function deleteItem(i) {
    if (confirm("Are you sure you want to delete this item?")) { // Confirmation before deletion
        items.splice(i, 1); // Remove item from the array
        localStorage.setItem('items', JSON.stringify(items)); // Update localStorage
        displayItems(); // Refresh the displayed items
    }
}

// Function to edit an item
function editItem(index) {
    editIndex = index; // Set the global edit index

    // Get the selected item details
    const item = items[index];

    // Populate the form fields with the item's current values
    document.querySelector('#itemInput').value = item.item;
    document.querySelector('#descriptionInput').value = item.description;
    document.querySelector('#contactInput').value = item.contact;
    document.querySelector('#dateInput').value = item.date;
    document.querySelector('#statusInput').value = item.status;

    // Change the button text to "Update Item"
    document.querySelector('button[type="submit"]').textContent = "Update Item";
}

// Function to reset filters and show all items
function showAllItems() {
    displayItems();
}

// Function to open the modal and populate it with the item details
function openFormModal(index) {
    const item = items[index]; // Get the item details
    document.getElementById('formModalLabel').innerText = `Update Status for ${item.item}`;

    // Show the modal
    $('#formModal').modal('show'); // Use jQuery to show the modal
}

// Function to show submitted forms for a specific item
function showSubmittedForms(itemName) {
    const submittedForms = JSON.parse(localStorage.getItem('submittedForms')) || {};

    const formsForItem = submittedForms[itemName] || []; // Get forms for the specific item
    const submittedInfoDiv = document.getElementById('submittedInfo');
    submittedInfoDiv.innerHTML = ''; // Clear previous data

    if (formsForItem.length === 0) {
        submittedInfoDiv.innerHTML = '<p>No forms submitted for this item.</p>';
    } else {
        formsForItem.forEach((form) => {
            const formDetails = document.createElement('div');
            formDetails.innerHTML = `
                <p><strong>Name:</strong> ${form.name}</p>
                <p><strong>Contact:</strong> ${form.contact}</p>
                <p><strong>Date Submitted:</strong> ${form.dateSubmitted}</p>
                <hr>
            `;
            submittedInfoDiv.appendChild(formDetails);
        });
    }

    // Show the modal
    $('#itemModal').modal('show');
}

// Flag to check if admin is logged in
const isAdmin = localStorage.getItem("userRole") === "admin";

// Call displayItems on page load
window.onload = displayItems;
