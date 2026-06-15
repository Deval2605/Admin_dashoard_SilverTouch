// js/validation.js

// Validate a required string value
function validateRequired(value, fieldName) {
  if (!value || value.trim() === '') {
    return `${fieldName} is required.`;
  }
  return null;
}

// Validate an email format
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return 'Please enter a valid email address.';
  return null;
}

// Validate minimum length
function validateMinLength(value, min, fieldName) {
  if (value.length < min) return `${fieldName} must be at least ${min} characters.`;
  return null;
}

// Check password strength and return array of missing requirements
function validatePasswordStrength(password) {
  const errors = [];
  if (password.length < 8) errors.push('at least 8 characters');
  if (!/[A-Z]/.test(password)) errors.push('one uppercase letter');
  if (!/[0-9]/.test(password)) errors.push('one number');
  if (!/[^A-Za-z0-9]/.test(password)) errors.push('one special character');
  return errors;
}

// Check if two values match
function validateMatch(value1, value2, fieldName) {
  if (value1 !== value2) return `${fieldName} does not match.`;
  return null;
}

// Show error below a specific field
function showFieldError(inputId, message) {
  const input = $(`#${inputId}`);
  input.addClass('is-invalid').removeClass('is-valid');
  let errorEl = $(`#${inputId}-error`);
  if (errorEl.length === 0) {
    input.after(`<div id="${inputId}-error" class="invalid-feedback"></div>`);
    errorEl = $(`#${inputId}-error`);
  }
  errorEl.text(message).show();
}

// Clear error state of a specific field
function clearFieldError(inputId) {
  const input = $(`#${inputId}`);
  input.removeClass('is-invalid').addClass('is-valid');
  $(`#${inputId}-error`).hide();
}

// Clear all field error states in a form
function clearAllErrors(formId) {
  $(`#${formId} input, #${formId} textarea, #${formId} select`)
    .removeClass('is-invalid is-valid');
  $('.invalid-feedback').hide();
}

// Helper to calculate password strength score for UI
function getPasswordStrengthScore(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}
