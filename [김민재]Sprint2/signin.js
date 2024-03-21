// 비밀번호
function Visibility() {
  var passwordField = document.getElementById("password");
  var toggleButton = document.getElementById("togglePassword");

  if (passwordField.type === "password") {
  passwordField.type = "text";
  toggleButton.innerHTML = '<img src="./image/icon/visible.svg">';} //보인다
  else {
  passwordField.type = "password";
  toggleButton.innerHTML = '<img src="./image/icon/invisible.svg">';} //안보여
}

// 버튼 활성화   
const emailInput = document.getElementById('e-mail');
const passwordInput = document.getElementById('password');
const loginButton = document.querySelector('.sign-form button');

emailInput.addEventListener('input', toggleLoginButton);
passwordInput.addEventListener('input', toggleLoginButton);

const activeColor = '#3692FF';
const inactiveColor = '#9CA3AF';

function toggleLoginButton() {
  if (emailInput.value.trim() !== '' && passwordInput.value.trim() !== '') {
      loginButton.disabled = false;
      loginButton.style.backgroundColor = activeColor;}
  else {
      loginButton.disabled = true;
      loginButton.style.backgroundColor = inactiveColor;}
}