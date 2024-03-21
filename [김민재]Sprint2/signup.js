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
  
function Visibility2(passwordFieldId) {
  var passwordField = document.getElementById(passwordFieldId);
  var toggleButton = document.getElementById("toggleRePassword");

  if (passwordField.type === "password") {
      passwordField.type = "text";
      toggleButton.innerHTML = '<img src="./image/icon/visible.svg">';}
  else {
      passwordField.type = "password";
      toggleButton.innerHTML = '<img src="./image/icon/invisible.svg">';}
}

// 버튼 활성화
const emailInput = document.getElementById('e-mail');
const passwordInput = document.getElementById('password');
const nickNameInput = document.getElementById('nick-name');
const rePasswordInput = document.getElementById('re-password');
const signUpButton = document.querySelector('.sign-form button');

emailInput.addEventListener('input', toggleSignUpButton);
passwordInput.addEventListener('input', toggleSignUpButton);
nickNameInput.addEventListener('input', toggleSignUpButton);
rePasswordInput.addEventListener('input', toggleSignUpButton);

const activeColor = '#3692FF';
const inactiveColor = '#9CA3AF';

function toggleSignUpButton() {
  if (emailInput.value.trim() !== '' && 
      passwordInput.value.trim() !== '' && 
      nickNameInput.value.trim() !== '' && 
      rePasswordInput.value.trim() !== '') {
      signUpButton.disabled = false;
      signUpButton.style.backgroundColor = activeColor;}
  else {
      signUpButton.disabled = true;
      signUpButton.style.backgroundColor = inactiveColor;}
}