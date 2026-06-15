// js/main.js

// 1. Sidebar toggle for mobile
$('#sidebarToggle').on('click', function () {
  $('#sidebar').toggleClass('sidebar-open');
  $('#sidebarOverlay').removeClass('d-none');
});

$('#sidebarOverlay, #sidebarClose').on('click', function () {
  $('#sidebar').removeClass('sidebar-open');
  $('#sidebarOverlay').addClass('d-none');
});

// 2. Auto-highlight active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
$('#sidebar .nav-link').each(function () {
  const href = $(this).attr('href');
  if (href === currentPage) {
    $(this).addClass('active');
  }
});

// 3. Dark mode
const darkModeToggle = $('#darkModeToggle');
const body = $('body');

// Load saved preference on every page
if (localStorage.getItem('shopsphere-theme') === 'dark') {
  body.addClass('dark-mode');
  darkModeToggle.find('i').removeClass('fa-moon').addClass('fa-sun');
}

darkModeToggle.on('click', function () {
  body.toggleClass('dark-mode');
  const isDark = body.hasClass('dark-mode');
  localStorage.setItem('shopsphere-theme', isDark ? 'dark' : 'light');
  $(this).find('i').toggleClass('fa-moon fa-sun');
});

// 4. Global toast function
function showToast(message, type = 'success') {
  const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
  const bgClass = type === 'success' ? 'bg-success' : 'bg-danger';
  const toastHtml = `
    <div class="toast align-items-center text-white ${bgClass} border-0" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex align-items-center gap-2 p-3">
        <i class="fas ${icon}"></i>
        <div class="me-auto">${message}</div>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
      </div>
    </div>
  `;
  const toastEl = $(toastHtml).appendTo('#toastContainer');
  const toastOptions = { autohide: true, delay: 3500 };
  const btToast = new bootstrap.Toast(toastEl[0], toastOptions);
  btToast.show();
  
  toastEl.on('hidden.bs.toast', function () {
    $(this).remove();
  });
}

// 5. Reusable confirm modal
function showConfirmModal(title, message, actionLabel, actionClass, onConfirm) {
  $('#confirmModalTitle').text(title);
  $('#confirmModalBody').text(message);
  $('#confirmModalAction')
    .text(actionLabel)
    .attr('class', `btn ${actionClass}`)
    .off('click')
    .on('click', function () {
      onConfirm();
      bootstrap.Modal.getInstance(document.getElementById('confirmModal')).hide();
    });
  
  const confirmModalEl = document.getElementById('confirmModal');
  if (confirmModalEl) {
    new bootstrap.Modal(confirmModalEl).show();
  }
}
