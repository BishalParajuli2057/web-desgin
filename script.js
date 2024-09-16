document.getElementById('user-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('input-username').value;
    const email = document.getElementById('input-email').value;
    const isAdmin = document.getElementById('input-admin').checked ? 'X' : '-';
    
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Admin:', isAdmin);
    
    const table = document.getElementById('user-table');
    const newRow = table.insertRow();
    
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    
    cell1.textContent = username;
    cell2.textContent = email;
    cell3.textContent = isAdmin;
    
    document.getElementById('user-form').reset();
});
  