document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginButton = document.querySelector("button[type='submit']");

  emailInput.addEventListener("focusout", validateEmail);
  passwordInput.addEventListener("focusout", validatePassword);

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
    const passwordError = document.querySelector("#passwordError").innerText;

    if (emailError || passwordError) {
      loginButton.disabled = true;
    } else {
      loginButton.disabled = false;
    }
  }
  document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const togglePassword = document.querySelector(".toggle-password");

    togglePassword.addEventListener("click", function () {
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);

      togglePassword.classList.toggle("visible");
    });
  });
});
