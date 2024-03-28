const emailInput = document.getElementById("email");
const nameInput = document.getElementById("name");
const passwordInput = document.getElementById("psw");
const passwordConfirmInput = document.getElementById("psw_chk");
const submitButton = document.getElementById("btn");

// 입력값이 변경될 때마다 검사
emailInput.addEventListener("input", validateInputs);
nameInput.addEventListener("input", validateInputs);
passwordInput.addEventListener("input", validateInputs);
passwordConfirmInput.addEventListener("input", validateInputs);

function validateInputs() {
    const isValidEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(
        emailInput.value.trim()
    );
    const isValidName = nameInput.value.trim().length > 2;
    const isValidPassword = passwordInput.value.trim().length >= 8;
    const isPasswordMatch = passwordInput.value === passwordConfirmInput.value;

    submitButton.disabled = !(
        isValidEmail &&
        isValidName &&
        isValidPassword &&
        isPasswordMatch
    );
}
