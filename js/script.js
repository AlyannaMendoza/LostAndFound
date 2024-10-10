

document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting normally
    alert('Item added!');
});

function deleteItem(itemId) {
    // Function to delete an item
    alert('Item deleted: ' + itemId);
}

function updateItem(itemId) {
    // Function to update an item
    alert('Update item: ' + itemId);
}
