document.getElementById('submit-data').addEventListener('click', function (event) {
    event.preventDefault();

    const username = document.getElementById('input-username').value;
    const email = document.getElementById('input-email').value;
    const isAdmin = document.getElementById('input-admin').checked ? 'X' : '-';
    const imageInput = document.getElementById('input-image').files[0];

    const table = document.getElementById('user-table').getElementsByTagName('tbody')[0];
    let rows = table.getElementsByTagName('tr');
    let userExists = false;
    let existingRow;

    for (let i = 0; i < rows.length; i++) {
        if (rows[i].cells[0].textContent === username) {
            userExists = true;
            existingRow = rows[i];
            break;
        }
    }

    
    let imageElement = '';
    if (imageInput) {
        const imageURL = URL.createObjectURL(imageInput);
        imageElement = `<img src="${imageURL}" alt="${username}">`;
    }

    if (userExists) {
        
        existingRow.cells[1].textContent = email;
        existingRow.cells[2].textContent = isAdmin;
        existingRow.cells[3].innerHTML = imageElement;
    } else {
       
        const newRow = table.insertRow();
        newRow.insertCell(0).textContent = username;
        newRow.insertCell(1).textContent = email;
        newRow.insertCell(2).textContent = isAdmin;
        newRow.insertCell(3).innerHTML = imageElement;
    }

    
    document.getElementById('user-form').reset();
});

document.getElementById('empty-table').addEventListener('click', function () {
    const tableBody = document.getElementById('user-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';  
});

