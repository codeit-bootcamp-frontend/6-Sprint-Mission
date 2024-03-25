// 비밀번호
function Visibility() {
  const passwordField = document.getElementById("password");
  const toggleButton = document.getElementById("togglePassword");

  if (passwordField.type === "password") {
    passwordField.type = "text";
    toggleButton.innerHTML = '<img src="./image/icon/visible.svg">';
  } //보인다
  else {
    passwordField.type = "password";
    toggleButton.innerHTML = '<img src="./image/icon/invisible.svg">';
  } //안보여
}

function Visibility2(passwordFieldId) {
  const passwordField = document.getElementById(passwordFieldId);
  const toggleButton = document.getElementById("toggleRePassword");

  if (passwordField.type === "password") {
    passwordField.type = "text";
    toggleButton.innerHTML = '<img src="./image/icon/visible.svg">';
  } else {
    passwordField.type = "password";
    toggleButton.innerHTML = '<img src="./image/icon/invisible.svg">';
  }
}

// 버튼 활성화
const emailInput = document.getElementById("e-mail");
const passwordInput = document.getElementById("password");
const nickNameInput = document.getElementById("nick-name");
const rePasswordInput = document.getElementById("re-password");
const signUpButton = document.querySelector(".sign-form button");

emailInput.addEventListener("input", toggleSignUpButton);
passwordInput.addEventListener("input", toggleSignUpButton);
nickNameInput.addEventListener("input", toggleSignUpButton);
rePasswordInput.addEventListener("input", toggleSignUpButton);

function toggleSignUpButton() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const nickname = nickNameInput.value.trim();
  const rePassword = rePasswordInput.value.trim();
  const yesOrYes = (email !== "") & (password !== "") & (nickname !== "") & (rePassword !== "");

  signUpButton.disabled = !yesOrYes;
  signUpButton.classList.toggle("active", yesOrYes);
}
