"use strict";

const email = document.getElementById("email");
const password = document.getElementById("password");
const username = document.getElementById("username");
const confirmPassword = document.getElementById("confirm_password");
const btn = document.querySelector(".signin_button");

function emailCheck() {
  const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}/;
  const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;

  if (
    emailRegex.test(email.value) &&
    passwordRegEx.test(password.value) &&
    username.value.length > 0 &&
    confirmPassword.value === password.value
  ) {
    btn.classList.add("btn_abled");
  } else {
    btn.classList.remove("btn_abled");
  }
};

email.addEventListener("keyup", emailCheck);
password.addEventListener("keyup", emailCheck);
username.addEventListener("keyup", emailCheck);
confirmPassword.addEventListener("keyup", emailCheck);