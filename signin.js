document.addEventListener('DOMContentLoaded', function () {
  const emailInput = document.querySelector('input[name="email"]');
  const passwordInput = document.querySelector('input[name="password"]');
  const loginButton = document.querySelector('.logbox__submit');


  emailInput.addEventListener('input', toggleButtonColor);
  passwordInput.addEventListener('input', toggleButtonColor);

  function toggleButtonColor() {
      const emailFilled = emailInput.value.trim() !== '';
      const passwordFilled = passwordInput.value.trim() !== '';

      if (emailFilled && passwordFilled) {
          loginButton.style.backgroundColor = '#3692ff'; 
      } else {
          loginButton.style.backgroundColor = ''; 
      }
  }
});
