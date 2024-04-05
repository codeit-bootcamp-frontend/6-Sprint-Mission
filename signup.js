document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const nicknameInput = document.getElementById("nickname");
  const passwordInput = document.getElementById("password");
  const passwordConfirmationInput = document.getElementById(
    "passwordConfirmation"
  );
  const signupButton = document.querySelector("button[type='submit']");

  emailInput.addEventListener("focusout", validateEmail);
  nicknameInput.addEventListener("focusout", validateNickname);
  passwordInput.addEventListener("focusout", validatePassword);
  passwordConfirmationInput.addEventListener(
    "focusout",
    validatePasswordConfirmation
  );

  function validateEmail() {
    const email = emailInput.value.trim();
    const emailError = document.querySelector("#emailError");

    if (!email) {
      showError(emailInput, emailError, "이메일을 입력해 주세요.");
    } else if (!isValidEmail(email)) {
      showError(emailInput, emailError, "잘못된 이메일 형식입니다.");
    } else {
      hideError(emailInput, emailError);
    }

    toggleButtonState();
  }

  function validateNickname() {
    const nickname = nicknameInput.value.trim();
    const nicknameError = document.querySelector("#nicknameError");

    if (!nickname) {
      showError(nicknameInput, nicknameError, "닉네임을 입력해 주세요.");
    } else {
      hideError(nicknameInput, nicknameError);
    }

    toggleButtonState();
  }

  function validatePassword() {
    const password = passwordInput.value.trim();
    const passwordError = document.querySelector("#passwordError");

    if (!password) {
      showError(passwordInput, passwordError, "비밀번호를 입력해 주세요.");
    } else if (password.length < 8) {
      showError(
        passwordInput,
        passwordError,
        "비밀번호를 8 자 이상 입력해 주세요."
      );
    } else {
      hideError(passwordInput, passwordError);
    }

    toggleButtonState();
  }

  function validatePasswordConfirmation() {
    const password = passwordInput.value.trim();
    const passwordConfirmation = passwordConfirmationInput.value.trim();
    const passwordConfirmationError = document.querySelector(
      "#passwordConfirmationError"
    );

    if (password !== passwordConfirmation) {
      showError(
        passwordConfirmationInput,
        passwordConfirmationError,
        "비밀번호가 일치하지 않습니다."
      );
    } else {
      hideError(passwordConfirmationInput, passwordConfirmationError);
    }

    toggleButtonState();
  }

  function showError(input, errorElement, message) {
    input.classList.add("error");
    errorElement.innerText = message;
    errorElement.style.display = "block";
  }

  function hideError(input, errorElement) {
    input.classList.remove("error");
    errorElement.innerText = "";
    errorElement.style.display = "none";
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function toggleButtonState() {
    const emailError = document.querySelector("#emailError").innerText;
    const nicknameError = document.querySelector("#nicknameError").innerText;
    const passwordError = document.querySelector("#passwordError").innerText;
    const passwordConfirmationError = document.querySelector(
      "#passwordConfirmationError"
    ).innerText;

    if (
      emailError ||
      nicknameError ||
      passwordError ||
      passwordConfirmationError
    ) {
      signupButton.disabled = true;
    } else {
      signupButton.disabled = false;
    }
  }
  document.addEventListener("DOMContentLoaded", function () {
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    const togglePasswordIcons = document.querySelectorAll(".toggle-password");

    togglePasswordIcons.forEach(function (togglePassword, index) {
      togglePassword.addEventListener("click", function () {
        const type =
          passwordInputs[index].getAttribute("type") === "password"
            ? "text"
            : "password";
        passwordInputs[index].setAttribute("type", type);

        togglePassword.classList.toggle("visible");
      });
    });
  });
});
