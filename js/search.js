//search.js

function searchItems() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const table = document.getElementById('itemTableBody');
    const rows = table.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let found = false;

        for (let j = 0; j < cells.length; j++) {
            if (cells[j].innerText.toLowerCase().includes(filter)) {
                found = true;
                break;
            }
        }

        rows[i].style.display = found ? '' : 'none';
    }
}
