const signupEmail = document.getElementById("email");
const signupPw = document.getElementById("password");
const signupName = document.getElementById("nickname");
const signupPwCheck = document.getElementById("password-check");
const signupBtn = document.getElementById("btn-signup");

function color() {
  if (
    signupEmail.value.length > 0 &&
    signupEmail.value.indexOf("@") !== -1 &&
    signupName.value.length > 0 &&
    signupPw.value.length >= 5 &&
    signupPw.value == signupPwCheck.value
  ) {
    signupBtn.style.backgroundColor = "#3692ff";
    signupBtn.style.cursor = "pointer";
    signupBtn.disabled = false;
  } else {
    signupBtn.disabled = true;
    signupBtn.style.backgroundColor = "#9ca3af";
  }
}

signupEmail.addEventListener("keyup", color);
signupName.addEventListener("keyup", color);
signupPw.addEventListener("keyup", color);
signupPwCheck.addEventListener("keyup", color);
