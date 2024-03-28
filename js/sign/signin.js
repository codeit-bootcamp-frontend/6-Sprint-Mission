const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("psw");
const submitButton = document.getElementById("btn");

function validateInputs() {
    const isValidEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(
        emailInput.value.trim()
    );
    const isValidPassword = passwordInput.value.trim().length >= 8;

    submitButton.disabled = !(isValidEmail && isValidPassword);
}

// 입력값이 변경될 때마다 검사
emailInput.addEventListener("input", validateInputs);
passwordInput.addEventListener("input", validateInputs);
