document.getElementById('toggle-password').addEventListener('click', function() {
  let passwordInput = document.getElementById('password');
  let toggle = document.getElementById('toggle-password');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggle.innerHTML = '<img src="./images/open_eye.png" alt="비밀번호 숨기기">';
  } else {
    passwordInput.type = 'password';
    toggle.innerHTML = '<img src="./images/close_eye.png" alt="비밀번호 보이기">';
  }
});