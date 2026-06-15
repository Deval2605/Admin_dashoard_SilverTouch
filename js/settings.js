// js/settings.js

$(document).ready(function() {
  // Clear field errors on focus
  $('input, textarea, select').on('focus', function() {
    if(typeof clearFieldError === 'function') clearFieldError($(this).attr('id'));
  });

  // Store Information Form submit
  $('#storeForm').on('submit', function(e) {
    e.preventDefault();
    clearAllErrors('storeForm');
    
    let isValid = true;
    const sName = $('#storeName').val();
    const sEmail = $('#storeEmail').val();
    const sPhone = $('#storePhone').val();

    if(validateRequired(sName, 'Store Name') || sName.trim().length < 3) {
      showFieldError('storeName', 'Store Name must be at least 3 characters.');
      isValid = false;
    }
    
    if(validateEmail(sEmail)) {
      showFieldError('storeEmail', 'Please enter a valid email address.');
      isValid = false;
    }
    
    if(sPhone.trim() !== '' && sPhone.trim().replace(/\D/g,'').length < 10) {
      showFieldError('storePhone', 'Phone number must be at least 10 digits if provided.');
      isValid = false;
    }

    if(isValid) {
      showToast('Store information saved successfully', 'success');
    }
  });

  // Password Form
  const $newPass = $('#newPassword');
  
  $newPass.on('keyup', function() {
    const val = $(this).val();
    const score = getPasswordStrengthScore(val);
    
    // reset classes
    $('#seg1, #seg2, #seg3, #seg4').removeClass('weak fair good strong');
    
    let label = 'Enter a password';
    if(val.length > 0) {
      if(score === 1) {
        $('#seg1').addClass('weak');
        label = 'Weak';
      } else if (score === 2) {
        $('#seg1, #seg2').addClass('fair');
        label = 'Fair';
      } else if (score === 3) {
        $('#seg1, #seg2, #seg3').addClass('good');
        label = 'Good';
      } else if (score >= 4) {
        $('#seg1, #seg2, #seg3, #seg4').addClass('strong');
        label = 'Strong';
      }
    }
    $('#strengthLabel').text(label);
  });

  $('#passwordForm').on('submit', function(e) {
    e.preventDefault();
    clearAllErrors('passwordForm');
    
    let isValid = true;
    const curPass = $('#currentPassword').val();
    const newPass = $('#newPassword').val();
    const confPass = $('#confirmPassword').val();

    if(validateRequired(curPass, 'Current password')) {
      showFieldError('currentPassword', 'Current password is required.');
      isValid = false;
    }

    if(validateRequired(newPass, 'New password')) {
      showFieldError('newPassword', 'New password is required.');
      isValid = false;
    } else {
      const authErrors = validatePasswordStrength(newPass);
      if(authErrors.length > 0) {
        showFieldError('newPassword', 'Password needs: ' + authErrors.join(', ') + '.');
        isValid = false;
      }
    }

    if(validateMatch(newPass, confPass, 'Passwords')) {
      showFieldError('confirmPassword', 'Passwords do not match.');
      isValid = false;
    }

    if(isValid) {
      showToast('Password updated successfully', 'success');
      this.reset();
      $('#seg1, #seg2, #seg3, #seg4').removeClass('weak fair good strong');
      $('#strengthLabel').text('Enter a password');
      clearAllErrors('passwordForm');
    }
  });

  // Adding real-time confirm password check
  $('#confirmPassword, #newPassword').on('keyup', function() {
    const newPass = $('#newPassword').val();
    const confPass = $('#confirmPassword').val();
    if(confPass.length > 0) {
      if(newPass !== confPass) {
        showFieldError('confirmPassword', 'Passwords do not match.');
      } else {
        clearFieldError('confirmPassword');
      }
    }
  });

  // Notification Toggles auto-save
  $('.form-switch input').on('change', function() {
    showToast('Preference auto-saved', 'success');
  });

  // Delete Account
  $('#exportDataBtn').on('click', function() {
    showToast('Data export started. Check your email shortly.', 'success');
  });

  $('#deleteAccountBtn').on('click', function() {
    if(typeof showConfirmModal === 'function') {
      showConfirmModal(
        'Delete Account',
        'Are you sure you want to permanently delete your entire ShopSphere application account? This cannot be undone.',
        'Delete Account',
        'btn-danger',
        function() {
          showToast('Account deletion initiated.', 'danger');
        }
      );
    }
  });
});
