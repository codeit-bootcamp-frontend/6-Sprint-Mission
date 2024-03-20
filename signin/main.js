// 비밀번호 타입 토글버튼 구현
const eyeBtn = document.querySelector('.eye');
const pwInput = document.querySelector('#password');

eyeBtn.addEventListener('click', function togglePassword() {
    if (pwInput.type !== 'text') {
        pwInput.type = 'text';
        eyeBtn.innerHTML = '<img src="/assets/img/icon/pw_Property=Default.svg" alt="">';
    } else {
        pwInput.type = 'password';
        eyeBtn.innerHTML = '<img src="/assets/img/icon/pw_Property=Variant2.svg" alt="" />';
    }
});
