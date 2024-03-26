// 비밀번호 타입 토글버튼 구현
const eyeBtn = document.querySelector('.eye_btn');
const pwInput = document.querySelector('#password');

eyeBtn.addEventListener('click', function togglePassword() {
    if (pwInput.type !== 'text') {
        pwInput.type = 'text';
    } else {
        pwInput.type = 'password';
    }
});
