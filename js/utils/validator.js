export function validateEmail(email) {
  return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email.trim());
}

export function validateNickname(name) {
  return name.trim().length >= 2;
}

export function validatePassword(password) {
  return password.trim().length >= 8;
}

export function validatePasswordMatch(password, confirmPassword) {
  return password === confirmPassword;
}
