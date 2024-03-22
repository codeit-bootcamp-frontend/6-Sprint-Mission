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

// 버튼 활성화
const emailInput = document.getElementById("e-mail");
const passwordInput = document.getElementById("password");
const loginButton = document.querySelector(".sign-form button");

emailInput.addEventListener("input", toggleLoginButton);
passwordInput.addEventListener("input", toggleLoginButton);

function toggleLoginButton() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const yesOrYes = email !== "" && password !== "";

  loginButton.disabled = !yesOrYes;
  loginButton.classList.toggle("active", yesOrYes);
}
