// js/users.js

let usersData = [];
let currentRowTr = null;

$(document).ready(function() {
  fetchUsers();

  $('#searchInput').on('input', filterTable);
  $('#statusFilter').on('change', filterTable);

  $('#addUserBtn').on('click', function() {
    clearAllErrors('addUserForm');
    document.getElementById('addUserForm').reset();
    new bootstrap.Modal(document.getElementById('addUserModal')).show();
  });

  $('#saveNewUserBtn').on('click', function() {
    clearAllErrors('addUserForm');
    
    const name = $('#addName').val();
    const email = $('#addEmail').val();
    const city = $('#addCity').val();
    const password = $('#addPassword').val();
    const status = $('#addStatus').val();

    let isValid = true;
    
    if(validateRequired(name, 'Name')) { showFieldError('addName', 'Name is required'); isValid = false; }
    if(validateEmail(email)) { showFieldError('addEmail', 'Valid email is required'); isValid = false; }
    if(validateRequired(city, 'City')) { showFieldError('addCity', 'City is required'); isValid = false; }
    if(password.length < 8) { showFieldError('addPassword', 'Password must be at least 8 characters'); isValid = false; }

    if(isValid) {
      const newUser = {
        id: Math.floor(Math.random() * 1000) + 20,
        name: name,
        email: email,
        address: { city: city },
        customStatus: status,
        orders: 1, // New user default
        spent: 0.00
      };
      
      usersData.unshift(newUser);
      renderTable();
      bootstrap.Modal.getInstance(document.getElementById('addUserModal')).hide();
      showToast('User added successfully', 'success');
    }
  });

  $(document).on('click', '.edit-btn', function() {
    currentRowTr = $(this).closest('tr');
    const index = currentRowTr.data('index');
    const user = usersData[index];
    
    $('#editName').val(user.name);
    $('#editEmail').val(user.email);
    $('#editCity').val(user.address.city);
    $('#editStatus').val(user.customStatus || 'Active');
    
    new bootstrap.Modal(document.getElementById('editModal')).show();
  });

  $('#saveEditBtn').on('click', function() {
    const index = currentRowTr.data('index');
    usersData[index].name = $('#editName').val();
    usersData[index].email = $('#editEmail').val();
    usersData[index].address.city = $('#editCity').val();
    usersData[index].customStatus = $('#editStatus').val();
    
    renderTable();
    bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
    showToast('User updated successfully', 'success');
  });

  $(document).on('click', '.delete-btn', function() {
    currentRowTr = $(this).closest('tr');
    const index = currentRowTr.data('index');
    const user = usersData[index];
    
    if(typeof showConfirmModal === 'function') {
      showConfirmModal(
        'Delete User',
        `Are you sure you want to delete ${user.name}? This action cannot be undone.`,
        'Delete',
        'btn-danger',
        function() {
          usersData.splice(index, 1);
          renderTable();
          showToast('User deleted', 'danger');
        }
      );
    }
  });
  
  // Clear input errors on focus
  $('input, select').on('focus', function() {
    if(typeof clearFieldError === 'function') clearFieldError($(this).attr('id'));
  });
});

function fetchUsers() {
  const tbody = $('#userTableBody');
  // Loading skeleton
  tbody.html(`
    <tr class="skeleton-row">
      <td><div class="skeleton-box skel-20"></div></td>
      <td><div class="skeleton-box skel-140"></div></td>
      <td><div class="skeleton-box skel-180"></div></td>
      <td><div class="skeleton-box skel-100"></div></td>
      <td><div class="skeleton-box skel-40"></div></td>
      <td><div class="skeleton-box skel-80"></div></td>
      <td><div class="skeleton-box skel-60"></div></td>
      <td><div class="skeleton-box skel-60"></div></td>
    </tr>
    <tr class="skeleton-row">
      <td><div class="skeleton-box skel-20"></div></td>
      <td><div class="skeleton-box skel-150"></div></td>
      <td><div class="skeleton-box skel-170"></div></td>
      <td><div class="skeleton-box skel-90"></div></td>
      <td><div class="skeleton-box skel-40"></div></td>
      <td><div class="skeleton-box skel-80"></div></td>
      <td><div class="skeleton-box skel-60"></div></td>
      <td><div class="skeleton-box skel-60"></div></td>
    </tr>
    <tr class="skeleton-row">
      <td><div class="skeleton-box skel-20"></div></td>
      <td><div class="skeleton-box skel-130"></div></td>
      <td><div class="skeleton-box skel-160"></div></td>
      <td><div class="skeleton-box skel-110"></div></td>
      <td><div class="skeleton-box skel-40"></div></td>
      <td><div class="skeleton-box skel-80"></div></td>
      <td><div class="skeleton-box skel-60"></div></td>
      <td><div class="skeleton-box skel-60"></div></td>
    </tr>
  `);

  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      if(!response.ok) throw new Error('API Error');
      return response.json();
    })
    .then(data => {
      const indianNames = ["Aarav Patel", "Priya Sharma", "Rahul Verma", "Neha Gupta", "Aditya Singh", "Anjali Desai", "Rohan Joshi", "Pooja Reddy", "Kunal Iyer", "Kavita Rao"];
      const indianCities = ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Surat"];
      
      // Map API data to our needs and add dummy data
      usersData = data.map((user, idx) => {
        let status = 'Active';
        if (idx === 7 || idx === 8) status = 'Pending';
        if (idx === 9) status = 'Banned';
        user.customStatus = status;
        user.name = indianNames[idx] || user.name;
        user.address.city = indianCities[idx] || user.address.city;
        
        let hash = user.id;
        // Simple seeded randomizer
        function seededRandom() {
          var x = Math.sin(hash++) * 10000;
          return x - Math.floor(x);
        }
        
        user.orders = Math.floor(seededRandom() * 50) + 1; 
        user.spent = (user.id * 1270 + 3400).toFixed(2);
        return user;
      });
      renderTable();
    })
    .catch(error => {
      console.error("Failed to load users:", error);
      $('#userTableBody').html('<tr><td colspan="8" class="text-center text-danger py-4"><i class="fas fa-exclamation-triangle me-2"></i>Failed to load users. Please refresh.</td></tr>');
      showToast('Failed to load users. Please refresh.', 'danger');
    });
}

function getInitials(name) {
  return name.substring(0, 2).toUpperCase();
}

function getAvatarColor(index) {
  const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  return colors[index % colors.length];
}

function getStatusBadge(status) {
  if (status === 'Active') return '<span class="badge-status badge-success"><i class="fas fa-circle status-dot"></i> Active</span>';
  if (status === 'Pending') return '<span class="badge-status badge-warning"><i class="fas fa-circle status-dot"></i> Pending</span>';
  if (status === 'Banned') return '<span class="badge-status badge-danger"><i class="fas fa-circle status-dot"></i> Banned</span>';
  return `<span class="badge-status badge-neutral">${status}</span>`;
}

function renderTable() {
  const tbody = $('#userTableBody');
  tbody.empty();

  if (usersData.length === 0) {
    tbody.html('<tr><td colspan="8" class="text-center py-4 text-muted">No users found.</td></tr>');
    return;
  }

  const searchTerm = $('#searchInput').val().toLowerCase();
  const filterStatus = $('#statusFilter').val();
  let displayedCount = 0;
  let totalDisplayed = 0;

  usersData.forEach((user, index) => {
    const matchSearch = user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm);
    const matchStatus = filterStatus === 'All' || user.customStatus === filterStatus;

    if (matchSearch && matchStatus) {
      displayedCount++;
      // Limit to 10 for pagination UI simulation
      if (displayedCount <= 10) {
        totalDisplayed++;
        const tr = $(`
          <tr data-index="${index}">
            <td>${index + 1}</td>
            <td>
              <div class="d-flex align-items-center gap-3">
                <div class="avatar avatar-bg-${index % 5}">
                  ${getInitials(user.name)}
                </div>
                <div class="fw-medium">${user.name}</div>
              </div>
            </td>
            <td>${user.email}</td>
            <td>${user.address.city}</td>
            <td>${user.orders}</td>
            <td>₹${user.spent}</td>
            <td>${getStatusBadge(user.customStatus)}</td>
            <td>
              <div class="d-flex gap-2">
                <button class="icon-btn edit-btn btn-icon-primary" title="Edit"><i class="fas fa-pen"></i></button>
                <button class="icon-btn delete-btn btn-icon-danger" title="Delete"><i class="fas fa-trash"></i></button>
              </div>
            </td>
          </tr>
        `);
        tbody.append(tr);
      }
    }
  });

  if (displayedCount === 0) {
    tbody.html('<tr><td colspan="8" class="text-center py-4 text-muted">No users found.</td></tr>');
    $('#paginationText').text(`Showing 0 users`);
  } else {
    $('#paginationText').text(`Showing 1-${totalDisplayed} of ${displayedCount} users`);
  }
}

function filterTable() {
  renderTable();
}
