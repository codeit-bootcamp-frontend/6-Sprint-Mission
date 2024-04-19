
const emailText = document.getElementById('email');
const emailSpan = document.getElementById('emailMsg');
const nicknameText = document.getElementById('nickname');
const nicknameSpan = document.getElementById('nicknameMsg');
const passwordText = document.getElementById('password');
const passwordSpan = document.getElementById('passwordMsg');
const passwordConfirmationText = document.getElementById('passwordConfirmation');
const passwordConfirmationSpan = document.getElementById('passwordConfirmationMsg');
const signupButton = document.querySelector('#signupButton');
var emailOk = false;
var nicknameOk = false;
var passwordOk = false;
var passwordConfirmationOk = false;

//email 형식 검사기
function emailCheck(email_address) {     
  email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  return email_regex.test(email_address);
};

// 로그인버튼 페이지 이동 함수 정의
function moveit() {
  window.location.href="signin.html";
}

// 로그인버튼에 이벤트 리스너 추가
signupButton.addEventListener("click", moveit);

// 비밀번호 눈 아이콘 작동
function tapEye() {
  var passwordType = passwordText.type === 'password' ? 'text' : 'password';
  passwordText.type = passwordType;
  var toggleIcon = document.querySelector('.toggle-password');
  if (passwordType === 'text') {
    toggleIcon.src = 'images/icons/eye-visible.svg';
  } else {
    toggleIcon.src = 'images/icons/eye-invisible.svg';
  }
}
function tapEye2() {
  var passwordConfirmationType = passwordConfirmationText.type === 'password' ? 'text' : 'password';
  passwordConfirmationText.type = passwordConfirmationType;
  var toggleIcon = document.querySelector('#toggle-password-confirmation');
  if (passwordConfirmationType === 'text') {
    toggleIcon.src = 'images/icons/eye-visible.svg';
  } else {
    toggleIcon.src = 'images/icons/eye-invisible.svg';
  }
}

// 로그인버튼 활성화/비활성화
function actButton() {
  if (emailOk && nicknameOk && passwordOk && passwordConfirmationOk ) {
    signupButton.disabled = false;
  }
}
function deactButton() {
  signupButton.disabled = true;
}
deactButton()

// 이메일 입력확인 메시지 띄우기
emailText.addEventListener("focusout", () => {
  const valueE = emailText.value;

  if (valueE === '') {
    emailText.style.border = "medium solid red";
    emailSpan.innerHTML = '이메일을 입력해주세요.';
    emailSpan.style.color = "red";
    emailSpan.style.fontsize = "15";
    emailSpan.style.margin = "8px 16px";
    emailOk = false;
    deactButton()
  } else if (!emailCheck(valueE)) {
    emailText.style.border = "medium solid red";
    emailSpan.innerHTML = '잘못된 이메일 형식입니다.';
    emailSpan.style.color = "red";
    emailSpan.style.fontsize = "15";
    emailSpan.style.margin = "8px 16px";
    emailOk = false;
    deactButton()
  } else {
    emailText.style.border = "";
    emailSpan.innerHTML = '';
    emailOk = true;
    actButton()
  }
});

// 닉네임 입력확인 메시지 띄우기
nicknameText.addEventListener("focusout", () => {
  const valueN = nicknameText.value;

  if (valueN === '') {
    nicknameText.style.border = "medium solid red";
    nicknameSpan.innerHTML = '닉네임을 입력해주세요.';
    nicknameSpan.style.color = "red";
    nicknameSpan.style.fontsize = "15";
    nicknameSpan.style.margin = "8px 16px";
    nicknameOk = false;
    deactButton()
  } else {
    nicknameText.style.border = "";
    nicknameSpan.innerHTML = '';
    nicknameOk = true;
    actButton()
  }
});

// 비밀번호 입력확인 메시지 띄우기
passwordText.addEventListener("focusout", () => {
  const valueP = passwordText.value;

  if (valueP === '') {
    passwordText.style.border = "medium solid red";
    passwordSpan.innerHTML = '비밀번호를 입력해주세요.';
    passwordSpan.style.color = "red";
    passwordSpan.style.fontsize = "15";
    passwordSpan.style.margin = "8px 16px";
    passwordOk = false;
    deactButton()
  } else if (valueP.length <= 7) {
    passwordText.style.border = "medium solid red";
    passwordSpan.innerHTML = '비밀번호를 8자 이상 입력해주세요.';
    passwordSpan.style.color = "red";
    passwordSpan.style.fontsize = "15";
    passwordSpan.style.margin = "8px 16px";
    passwordOk = false;
    deactButton()
  } else {
    passwordText.style.border = "";
    passwordSpan.innerHTML = '';
    passwordOk = true;
    actButton()
  }
});

// 비밀번호2번째 입력확인 메시지 띄우기
passwordConfirmationText.addEventListener("focusout", () => {
  const valueC = passwordConfirmationText.value;

  if (valueC != passwordText.value) {
    passwordConfirmationText.style.border = "medium solid red";
    passwordConfirmationSpan.innerHTML = '비밀번호가 일치하지 않습니다.';
    passwordConfirmationSpan.style.color = "red";
    passwordConfirmationSpan.style.fontsize = "15";
    passwordConfirmationSpan.style.margin = "8px 16px";
    passwordConfirmationOk = false;
    deactButton()
  } else {
    passwordConfirmationText.style.border = "";
    passwordConfirmationSpan.innerHTML = '';
    passwordConfirmationOk = true;
    actButton()
  }
});

