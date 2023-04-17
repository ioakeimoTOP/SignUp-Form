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
  const validationList = document.querySelector('.validation');

  // Handle complete validity aria:
  validationList.ariaHidden = passwordField.validity.valid ? 'true' : 'false';

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
  const error = e.target.parentElement.querySelector('.password__match');

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
