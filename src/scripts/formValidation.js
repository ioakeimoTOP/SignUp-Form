const validationPatterns = {
  validation__lowercase: /[a-z]/,
  validation__uppercase: /[A-Z]/,
  validation__number: /[0-9]/,
  validation__special: /[!@#$%^&*]/,
  validation__length: /.{8,20}/,
};

function validatePasswordPattern(password, pattern) {
  return pattern.test(password);
}

function updateValidityList(passwordField) {
  const password = passwordField.value;
  const validationTitle = document.getElementById('validation__all');
  const validationList = document.querySelector('.validation');

  // Handle complete validity aria:
  const completeValidity = passwordField.validity.valid;
  if (completeValidity) {
    validationList.ariaHidden = 'true';
    validationTitle.classList.add('validation__criterion-satisfied');
  } else {
    validationList.ariaHidden = 'false';
    validationTitle.classList.remove('validation__criterion-satisfied');
  }

  for (const [id, pattern] of Object.entries(validationPatterns)) {
    let element = validationList.querySelector('#' + id);
    if (validatePasswordPattern(password, pattern)) {
      element.ariaHidden = 'true';
      element.classList.add('validation__criterion-satisfied');
    } else {
      element.ariaHidden = 'false';
      element.classList.remove('validation__criterion-satisfied');
    }
  }
}

const password = document.getElementById('password');
password.addEventListener('input', (e) => {
  updateValidityList(e.target);
});

// Confirm password, custom validity:
const confirmPassword = document.getElementById('confirm_password');
confirmPassword.addEventListener('input', (e) => {
  const error = document.querySelector('.password__match');

  if (e.target.value !== password.value || !password.validity.valid) {
    e.target.setCustomValidity('Invalid field.');
    error.ariaHidden = 'false';
    e.target.classList.remove('validation__criterion-satisfied');
  } else {
    e.target.setCustomValidity('');
    error.ariaHidden = 'true';
    error.classList.add('validation__criterion-satisfied');
  }
});

const form = document.getElementById('signup-form');

// Handle Submit:
function onFormSubmit(e) {
  // Do nothing (can be implemented in future iterations)
  e.preventDefault();
  location.reload();
}
form.addEventListener('submit', onFormSubmit);

// Attach user filled input classes
// Use single listener with event delegation
form.addEventListener('input', (e) => {
  const interactedInputField = e.target;
  if (e.target.value) {
    e.target.closest('.signup__field').classList.add('signup__field-filled');
  } else {
    e.target.closest('.signup__field').classList.remove('signup__field-filled');
  }
});
