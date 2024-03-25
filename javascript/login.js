const loginEmail = document.getElementById("email");
const loginPw = document.getElementById("password");
const loginBtn = document.getElementById("btn-login");

function color() {
  if (
    loginEmail.value.length > 0 &&
    loginEmail.value.indexOf("@") !== -1 &&
    loginPw.value.length >= 5
  ) {
    loginBtn.style.backgroundColor = "#3692ff";
    loginBtn.style.cursor = "pointer";
    loginBtn.disabled = false;
  } else {
    loginBtn.disabled = true;
    loginBtn.style.backgroundColor = "#9ca3af";
  }
}

loginEmail.addEventListener("keyup", color);
loginPw.addEventListener("keyup", color);
