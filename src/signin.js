
const emailText = document.getElementById('email');
const emailSpan = document.getElementById('emailMsg');
const passwordText = document.getElementById('password');
const passwordSpan = document.getElementById('passwordMsg');
const loginButton = document.querySelector('#loginButton');
var emailOk = false;
var passwordOk = false;

// 로그인버튼 활성화/비활성화
function actButton() {
  if (emailOk && passwordOk) {
    loginButton.disabled = false;
  }
}
function deactButton() {
  loginButton.disabled = true;
}

deactButton()

//email 형식 검사기
function emailCheck(email_address) {     
  email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  return email_regex.test(email_address);
};

// 로그인버튼 페이지 이동 함수 정의
function moveit() {
  window.location.href="items.html";
}

// 로그인버튼에 이벤트 리스너 추가
loginButton.addEventListener("click", moveit);

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

// 이메일, 비밀번호 입력확인 메시지 띄우기
emailText.addEventListener("focusout", () => {
  const value = emailText.value;

  if (value === '') {
    emailText.style.border = "medium solid red";
    emailSpan.innerHTML = '이메일을 입력해주세요.';
    emailSpan.style.color = "red";
    emailSpan.style.fontsize = "15";
    emailSpan.style.margin = "8px 16px";
    emailOk = false;
    deactButton()
  } else if (!emailCheck(value)) {
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

passwordText.addEventListener("focusout", () => {
  const value = passwordText.value;

  if (value === '') {
    passwordText.style.border = "medium solid red";
    passwordSpan.innerHTML = '비밀번호를 입력해주세요.';
    passwordSpan.style.color = "red";
    passwordSpan.style.fontsize = "15";
    passwordSpan.style.margin = "8px 16px";
    passwordOk = false;
    deactButton()
  } else if (value.length <= 7) {
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

