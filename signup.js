document.addEventListener('DOMContentLoaded', function () {
  const emailInput = document.querySelector('input[name="userEmail"]');
  const nicknameInput = document.querySelector('input[name="nickname"]');
  const passwordInput = document.querySelector('input[name="password"]');
  const confirmPasswordInput = document.querySelector('input[name="confirmPassword"]');
  const signupButton = document.querySelector('.logbox__submit');

  emailInput.addEventListener('input', toggleButtonColor);
  nicknameInput.addEventListener('input', toggleButtonColor);
  passwordInput.addEventListener('input', toggleButtonColor);
  confirmPasswordInput.addEventListener('input', toggleButtonColor);

  function toggleButtonColor() {
      const emailFilled = emailInput.value.trim() !== '';
      const nicknameFilled = nicknameInput.value.trim() !== '';
      const passwordFilled = passwordInput.value.trim() !== '';
      const confirmPasswordFilled = confirmPasswordInput.value.trim() !== '';

      if (emailFilled && nicknameFilled && passwordFilled && confirmPasswordFilled) {
          signupButton.style.backgroundColor = '#3692ff'; 
      } else {
          signupButton.style.backgroundColor = ''; 
      }
  }
});
