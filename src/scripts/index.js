// Show password toggles functionality
const passwordToggles = document.querySelectorAll('.password__toggle');

for (const passwordToggle of passwordToggles) {
  passwordToggle.addEventListener('click', () => {
    const parent = passwordToggle.parentElement;
    const passwordField = parent.querySelector('[name*="password"]');

    passwordField.type = passwordToggle.checked ? 'text' : 'password';
  });
}

// Password strength indicator functionality
const criteria = document.querySelector('.validation');
const strengthMeter = document.querySelector('.password__strength');
const observationConfig = {
  attributeFilter: ['class'],
  subtree: true,
};

const onCriteriaMutation = () => {
  const satisfiedCriteriaCount = criteria.querySelectorAll(
    '.validation__criterion-satisfied'
  ).length;
  strengthMeter.value = satisfiedCriteriaCount;
};

const strengthObserver = new MutationObserver(onCriteriaMutation);
strengthObserver.observe(criteria, observationConfig);
