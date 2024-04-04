import {
  validateEmail,
  validatePassword,
  validateInput,
  togglePasswordVisibility,
} from "/js/utils/validator.js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("psw");

const submitButton = document.getElementById("btn");

const errorMessages = {
  email: {
    empty: "이메일을 입력해주세요.",
    invalid: "잘못된 이메일 형식입니다.",
  },
  password: {
    empty: "비밀번호를 입력해주세요.",
    invalid: "비밀번호를 8자 이상 입력해주세요.",
    match: "비밀번호가 일치하지 않습니다.",
  },
};

// 버튼 활성화를 위한 유효성 검사
function validateSubmitButton() {
  const isValidEmail = validateEmail(emailInput.value);
  const isValidPassword = validatePassword(passwordInput.value);

  submitButton.disabled = !(isValidEmail && isValidPassword);
}

// 입력값이 변경될 때마다 유효성 검사 실행
emailInput.addEventListener("input", () => {
  validateInput(emailInput, validateEmail, errorMessages.email),
    validateSubmitButton();
});
passwordInput.addEventListener("input", () => {
  validateInput(passwordInput, validatePassword, errorMessages.password),
    validateSubmitButton();
});

// 포커스를 잃었을 때 유효성 검사 실행
emailInput.addEventListener("blur", () =>
  validateInput(emailInput, validateEmail, errorMessages.email)
);
passwordInput.addEventListener("blur", () =>
  validateInput(passwordInput, validatePassword, errorMessages.password)
);

// 비밀번호 가리기/표시 버튼 클릭 시 비밀번호 가리기/표시 기능 토글
const passwordToggleButtons = document.querySelectorAll(".psw_chk_btn");
passwordToggleButtons[0].addEventListener("click", () => {
  togglePasswordVisibility(passwordInput);
  const associatedImage =
    passwordToggleButtons[0].querySelector(".psw_chk_img");
  associatedImage.classList.toggle("eye_open");
  associatedImage.classList.toggle("eye_close");
});

submitButton.addEventListener("click", function () {
  window.location.href = "/pages/items/index.html";
});
