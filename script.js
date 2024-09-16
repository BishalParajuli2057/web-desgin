
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("add-user-form").addEventListener("submit", function(event) {
      event.preventDefault();  
      const username = document.getElementById("input-username").value;
      const email = document.getElementById("input-email").value;
      const isAdmin = document.getElementById("input-admin").checked ? 'X' : '-';
  
      
      const table = document.getElementById("user-table");
      const newRow = table.insertRow();
  
      
      const usernameCell = newRow.insertCell(0);
      const emailCell = newRow.insertCell(1);
      const adminCell = newRow.insertCell(2);
  
      usernameCell.textContent = username;
      emailCell.textContent = email;
      adminCell.textContent = isAdmin;
  
      
      document.getElementById("add-user-form").reset();
    });
  });
  