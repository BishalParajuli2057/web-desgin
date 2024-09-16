document.getElementById('submit-data').addEventListener('click', function(event) {
    event.preventDefault();

    const username = document.getElementById('input-username').value;
    const email = document.getElementById('input-email').value;
    const isAdmin = document.getElementById('input-admin').checked ? 'X' : '-';
    const imageInput = document.getElementById('input-image').files[0];

    const existingRow = findRowByUsername(username);
    
    let imgTag = '<img src="https://via.placeholder.com/64" alt="Default Image">';
    if (imageInput) {
        const imageUrl = URL.createObjectURL(imageInput);
        imgTag = `<img src="${imageUrl}" alt="${username}'s Profile Image">`;
    }

    if (existingRow) {
       
        existingRow.cells[1].textContent = email;
        existingRow.cells[2].textContent = isAdmin;
        existingRow.cells[3].innerHTML = imgTag;
    } else {
     
        const table = document.getElementById('user-table').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();
        const usernameCell = newRow.insertCell(0);
        const emailCell = newRow.insertCell(1);
        const adminCell = newRow.insertCell(2);
        const imageCell = newRow.insertCell(3);

     
        usernameCell.textContent = username;
        emailCell.textContent = email;
        adminCell.textContent = isAdmin;
        imageCell.innerHTML = imgTag;
    }

    document.getElementById('input-username').value = '';
    document.getElementById('input-email').value = '';
    document.getElementById('input-admin').checked = false;
    document.getElementById('input-image').value = '';
});

document.getElementById('empty-table').addEventListener('click', function() {
    const tableBody = document.getElementById('user-table').getElementsByTagName('tbody')[0];

    while (tableBody.rows.length > 0) {
        tableBody.deleteRow(0);
    }
});


function findRowByUsername(username) {
    const rows = document.getElementById('user-table').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    for (let row of rows) {
        if (row.cells[0].textContent === username) {
            return row;
        }
    }
    return null;
}
