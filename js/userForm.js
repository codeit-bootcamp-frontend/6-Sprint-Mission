const pwdBtnElement = document.getElementById("password__btn");
const checkPwdBtnElement = document.getElementById("check-password__btn");

// 비밀번호를 보여주는 버튼에 아이콘 변경 클래스 추가
function toggleClassName1() {
    pwdBtnElement.classList.toggle("visibility");
}
function toggleClassName2() {
    checkPwdBtnElement.classList.toggle("visibility");
}

pwdBtnElement.addEventListener("click", toggleClassName1);
checkPwdBtnElement.addEventListener("click", toggleClassName2);