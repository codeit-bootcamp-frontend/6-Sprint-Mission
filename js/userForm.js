const pwdBtnElement = document.getElementById('passwordBtn');
const checkPwdBtnElement = document.getElementById('checkPasswordBtn');

// 비밀번호를 보여주는 버튼에 아이콘 변경 클래스 추가
function toggleClassName(event) {
  event.target.classList.toggle('visibility');
}

pwdBtnElement.addEventListener('click', toggleClassName);
checkPwdBtnElement.addEventListener('click', toggleClassName);
