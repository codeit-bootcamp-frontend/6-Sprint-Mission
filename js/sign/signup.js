import {
  validateEmail,
  validateNickname,
  validatePassword,
  validatePasswordMatch,
  validateInput,
  validatePasswordMatchInput,
  togglePasswordVisibility,
} from "/js/utils/validator.js";

const emailInput = document.getElementById("email");
const nicknameInput = document.getElementById("nickname");
const passwordInput = document.getElementById("psw");
const passwordMatchInput = document.getElementById("psw_chk");

const submitButton = document.getElementById("btn");

const errorMessages = {
  email: {
    empty: "이메일을 입력해주세요.",
    invalid: "잘못된 이메일 형식입니다.",
  },
  nickname: {
    empty: "닉네임을 입력해주세요.",
    invalid: "닉네임을 2자 이상 입력해주세요.",
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
  const isValidNickname = validateNickname(nicknameInput.value);
  const isValidPassword = validatePassword(passwordInput.value);
  const isValidPasswordMatch = validatePasswordMatch(
    passwordInput.value,
    passwordMatchInput.value
  );

  submitButton.disabled = !(
    isValidEmail &&
    isValidNickname &&
    isValidPassword &&
    isValidPasswordMatch
  );
}

// 입력값이 변경될 때마다 유효성 검사 실행
emailInput.addEventListener("input", () => {
  validateInput(emailInput, validateEmail, errorMessages.email),
    validateSubmitButton();
});
nicknameInput.addEventListener("input", () => {
  validateInput(nicknameInput, validateNickname, errorMessages.nickname),
    validateSubmitButton();
});
passwordInput.addEventListener("input", () => {
  validateInput(passwordInput, validatePassword, errorMessages.password),
    validateSubmitButton();
});
passwordMatchInput.addEventListener("input", () => {
  validatePasswordMatchInput(
    passwordInput,
    passwordMatchInput,
    errorMessages.password.match
  ),
    validateSubmitButton();
});

// 포커스를 잃었을 때 유효성 검사 실행
emailInput.addEventListener("blur", () =>
  validateInput(emailInput, validateEmail, errorMessages.email)
);
nicknameInput.addEventListener("blur", () =>
  validateInput(nicknameInput, validateNickname, errorMessages.nickname)
);
passwordInput.addEventListener("blur", () =>
  validateInput(passwordInput, validatePassword, errorMessages.password)
);
passwordMatchInput.addEventListener("blur", () =>
  validatePasswordMatchInput(
    passwordInput,
    passwordMatchInput,
    errorMessages.password.match
  )
);

// 비밀번호 가리기/표시 버튼 클릭 시 비밀번호 가리기/표시 기능 토글
const passwordToggleButtons = document.querySelectorAll(".psw_chk_btn");
passwordToggleButtons.forEach((button) => {
  if (button.parentNode.querySelector("input") === passwordInput) {
    button.addEventListener("click", () => {
      togglePasswordVisibility(passwordInput);
      const eyeImages = button.querySelector(".psw_chk_img");
      eyeImages.classList.toggle("eye_open");
      eyeImages.classList.toggle("eye_close");
    });
  } else if (button.parentNode.querySelector("input") === passwordMatchInput) {
    button.addEventListener("click", () => {
      togglePasswordVisibility(passwordMatchInput);
      const eyeImages = button.querySelector(".psw_chk_img");
      eyeImages.classList.toggle("eye_open");
      eyeImages.classList.toggle("eye_close");
    });
  }
});

submitButton.addEventListener("click", function () {
  window.location.href = "/pages/signin";
});
