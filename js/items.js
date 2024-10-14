const items = JSON.parse(localStorage.getItem('items')) || [];
let editIndex = -1; // Track the index of the item being edited

// Function to add or update an item
function addItem(event) {
    event.preventDefault();

    const itemInput = document.querySelector('#itemInput').value;
    const descriptionInput = document.querySelector('#descriptionInput').value;
    const contactInput = document.querySelector('#contactInput').value;
    const dateInput = document.querySelector('#dateInput').value;
    const statusInput = document.querySelector('#statusInput').value; // Get selected status

    if (!itemInput || !descriptionInput || !contactInput || !dateInput || !statusInput) {
        alert("All fields are required!"); // Validation alert
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
        // Add new item
        items.push(newItem);
        alert("Item added successfully!"); // Success message
    } else {
        // Update existing item
        items[editIndex] = newItem;
        alert("Item updated successfully!"); // Success message
        editIndex = -1; // Reset the edit index after updating
    }

    localStorage.setItem('items', JSON.stringify(items));
    document.querySelector('form').reset(); // Reset form after submission
    document.querySelector('button[type="submit"]').textContent = "Add Item"; // Change back to "Add Item"
    displayItems(); // Refresh the displayed items
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

    items.forEach((item, i) => {
        const row = createTableRow(item, i);
        tbody.appendChild(row);
    });
}

// Function to create a table row for an item
function createTableRow(item, index) {
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

// Call displayItems on page load
window.onload = displayItems;
