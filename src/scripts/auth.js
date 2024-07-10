// 선택사항: `DOMContentLoaded` 이벤트 리스너를 사용해 DOM 요소들이 완전히 로드된 후에 이벤트 리스너를 등록하면, 스크립트 태그의 위치와 상관 없이 DOM 요소를 안전하게 참조할 수 있어요.
//         현재 HTML 구조에서는 자바스크립트 파일이 문서의 마지막에 위치해 있기 때문에 DOMContentLoaded 없이 바로 이벤트 리스너들을 추가해도 문제 없어요.
//         스크립트의 위치를 문서 상단으로 이동하거나, 동적으로 스크립트를 로드하는 경우에는 DOMContentLoaded 이벤트 리스너 내부에서 이벤트 리스너들을 등록하는 것이 안전해요.

document.addEventListener("DOMContentLoaded", () => {
  // 각 필드의 유효성 검사 상태를 저장하는 전역 변수
  let isEmailValid = false;
  let isNicknameValid = false;
  let isPasswordValid = false;
  let isPasswordConfirmationValid = false;

  // ID를 통해 타겟 DOM 요소에 접근
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const emailInput = document.getElementById("email");
  const nicknameInput = document.getElementById("nickname");
  const passwordInput = document.getElementById("password");
  const passwordConfirmationInput = document.getElementById(
    "passwordConfirmation"
  );
  const submitButton = document.querySelector(
    '.auth-container form button[type="submit"]'
  );

  // 오류 메세지 노출 함수 (오류 메시지 <span>을 visible하게 만들고 입력 필드에 빨간색 테두리를 추가)
  // - 코드 중복을 줄이기 위해 반복되는 코드를 함수화해 주었어요. (DRY 원칙, "Don't Repeat Yourself")
  // - 오류 메시지 요소 직접 접근 대신, 오류 메시지 ID를 함수에 전달
  function showError(input, errorId) {
    const errorElement = document.getElementById(errorId);
    errorElement.style.display = "block";
    input.style.border = "1px solid #f74747";
  }

  // 상태 초기화 함수 (오류 메시지를 숨기고 입력 필드의 테두리를 기본 상태로 리셋)
  function hideError(input, errorId) {
    const errorElement = document.getElementById(errorId);
    errorElement.style.display = "none";
    input.style.border = "none";
  }

  // 이메일 유효성 검증 util function
  // - 정규표현식(Regular Expression, Regex)을 통해 입력된 값이 기본적인 이메일 형식을 따르고 있는지 확인 후 boolean을 리턴합니다.
  // - 이메일 형식을 검증하는 다양한 정규식이 존재하는데 너무 엄격하지도, 너무 느슨하지도 않은 실용적인 버전을 사용하는 게 좋아요.
  // - 예시에 사용된 정규식은 보편적으로 사용되는 이메일 주소 형식에 대해서는 높은 검증 성공률을 보이지만, 특수한 도메인의 이메일을 포착하는 데에는 한계가 있을 수 있기 때문에 완벽한 솔루션은 아니에요.
  function validateEmailString(email) {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  }

  // 이메일 필드의 유효성 검사 (입력 여부 및 형식)
  function checkEmailValidity() {
    const emailValue = emailInput.value.trim();

    // 오류 메세지 및 입력 필드의 상태를 먼저 초기화
    // - 사용자가 입력한 값이 유효성 검사를 통과하지 못해 오류 메시지가 한 번 표시된 이후 입력값을 수정하여 필드가 유효한 상태가 되었을 때 오류 메시지를 다시 숨김 처리하기 위한 용도
    // - 두 가지 오류 메세지가 동시에 노출되지 않도록 하기 위한 용도
    isEmailValid = false;
    hideError(emailInput, "emailEmptyError");
    hideError(emailInput, "emailInvalidError");

    if (!emailValue) {
      showError(emailInput, "emailEmptyError");
    } else if (!validateEmailString(emailValue)) {
      showError(emailInput, "emailInvalidError");
    } else {
      isEmailValid = true;
      hideError(emailInput, "emailEmptyError");
      hideError(emailInput, "emailInvalidError");
    }
    // 어느 순서로 input을 입력할지 모르니 매번 submit button 활성화해야 하는지 체크하는 것이 안전해요. (추후에 React state을 사용하면 해결되는 문제!)
    updateSubmitButtonState();
  }

  // 닉네임 필드의 유효성 검사
  function checkNicknameValidity() {
    const nicknameValue = nicknameInput.value.trim();
    isNicknameValid = false;
    hideError(nicknameInput, "nicknameEmptyError");

    if (!nicknameValue) {
      showError(nicknameInput, "nicknameEmptyError");
    } else {
      isNicknameValid = true;
      hideError(emailInput, "nicknameEmptyError");
    }
    updateSubmitButtonState();
  }

  // 비밀번호 필드의 유효성 검사
  function checkPasswordValidity() {
    const passwordValue = passwordInput.value.trim();
    isPasswordValid = false;

    hideError(passwordInput, "passwordEmptyError");
    hideError(passwordInput, "passwordInvalidError");

    if (!passwordValue) {
      showError(passwordInput, "passwordEmptyError");
    } else if (passwordValue.length < 8) {
      showError(passwordInput, "passwordInvalidError");
    } else {
      isPasswordValid = true;
      hideError(passwordInput, "passwordEmptyError");
      hideError(passwordInput, "passwordInvalidError");
    }
    updateSubmitButtonState();

    // 비밀번호 입력 전에 비밀번호 확인 필드 입력을 먼저 시도하는 경우를 대비해 검증 로직 강화
    if (signupForm) {
      checkPasswordConfirmationValidity();
    }
  }

  // 비밀번호 확인 필드의 유효성 검사
  function checkPasswordConfirmationValidity() {
    const passwordConfirmationValue = passwordConfirmationInput.value.trim();
    isPasswordConfirmationValid = false;

    hideError(passwordConfirmationInput, "passwordConfirmationError");
    hideError(passwordConfirmationInput, "passwordConfirmationInitError");

    if (!isPasswordValid) {
      showError(passwordConfirmationInput, "passwordConfirmationInitError");
    } else if (
      !passwordConfirmationValue ||
      passwordConfirmationValue !== passwordInput.value.trim()
    ) {
      showError(passwordConfirmationInput, "passwordConfirmationError");
    } else {
      isPasswordConfirmationValid = true;
      hideError(passwordConfirmationInput, "passwordConfirmationError");
      hideError(passwordConfirmationInput, "passwordConfirmationInitError");
    }
    updateSubmitButtonState();
  }

  function updateSubmitButtonState() {
    // form submit button의 활성화 여부를 관장하기 위한 변수
    let isFormValid = isEmailValid && isPasswordValid;

    if (signupForm) {
      isFormValid =
        isFormValid && isNicknameValid && isPasswordConfirmationValid;
    }

    // isFormValid의 boolean 값에 따라 선택된 제출 버튼의 disabled 속성을 변경
    submitButton.disabled = !isFormValid;
  }

  // 입력 필드에 이벤트 리스너 추가
  // - 회원가입 및 로그인 form에서는 사용자가 입력한 데이터의 유효성을 즉각적으로 검증하고 피드백을 제공하기 위해서 focusout, input, change 등의 input event를 많이 사용해요.
  if (emailInput) {
    // - 입력 필드 선택 후 focus out 했을 때 각 필드에 해당하는 유효성 검증 함수를 호출
    emailInput.addEventListener("focusout", checkEmailValidity);
  }
  if (nicknameInput) {
    nicknameInput.addEventListener("focusout", checkNicknameValidity);
  }
  if (passwordInput) {
    // 로그인에서는 비밀번호 필드가 마지막 항목이므로 입력 후 바로 제출 버튼을 활성화해주려면 focusout보다 input이 더 적절할 것 같아요.
    passwordInput.addEventListener("input", checkPasswordValidity);
  }
  if (passwordConfirmationInput) {
    // 비밀번호 확인 필드 입력 시 정상적인 비밀번호 입력값이 있는지, 그리고 두 값이 일치하는지 여부를 실시간으로 확인하고 오류 메세지를 표시하기 위해 focusout이 아닌 input을 추천
    passwordConfirmationInput.addEventListener(
      "input",
      checkPasswordConfirmationValidity
    );
  }

  // 페이지 로드 시 제출 버튼의 비활성화 상태를 설정
  updateSubmitButtonState();

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault(); // 기본 제출 동작 방지
      window.location.href = "items.html";
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
      event.preventDefault();
      window.location.href = "signup.html";
    });
  }

  // 비밀번호 표시 상태 온오프(toggle) 버튼 동작
  function togglePasswordVisibility(event) {
    // 이벤트가 발생한 버튼을 기준으로 타겟 요소를 찾음
    const button = event.currentTarget;
    const inputField = button.parentElement.querySelector("input");
    const toggleIcon = button.querySelector(".password-toggle-icon");

    // input의 type을 'password'으로 설정하면 입력값이 마스킹된 상태(비밀번호 숨김 상태)로 렌더링되고, 'text'로 설정하면 일반 문자로 출력됩니다.
    const isPasswordVisible = inputField.type === "text";

    // 비밀번호 입력 필드 타입 토글
    // - 비밀번호 필드의 type 설정값이 'password'로 확인되면 'text'로, 'text'라면 반대로 'password'로 업데이트해 준다면 원하는 동작을 구현할 수 있어요.
    inputField.type = isPasswordVisible ? "text" : "password";

    // 토글 버튼 아이콘의 이미지 파일과 alt도 비밀번호 표시 상태와 함께 변경해 주세요.
    toggleIcon.src = isPasswordVisible
      ? "images/icons/eye-visible.svg"
      : "images/icons/eye-invisible.svg";
    toggleIcon.alt = isPasswordVisible
      ? "비밀번호 표시 상태 아이콘"
      : "비밀번호 숨김 상태 아이콘";

    // 버튼의 aria-label 속성 업데이트
    // - 텍스트 정보 없이 이미지로만 되어 있는 버튼 요소이므로 시각장애인의 웹 접근성을 위해 `aria-label`을 추가해 주세요.
    // - 버튼 클릭 시 일어나는 동작을 기준으로 설명을 작성해 주세요.
    // - `aria-label`은 이름의 hyphen 때문에 자바스크립트에서 유효한 식별자로 인식되지 않아 dot notation을 통해 객체의 프로퍼티에 접근할 수 없어요.
    //    이런 속성을 설정하거나 가져올 때는 setAttribute과 getAttribute 메서드를 사용해야 해요.
    button.setAttribute(
      "aria-label",
      isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 보기"
    );
  }

  // 비밀번호 토글 버튼에 이벤트 리스너 추가
  // - 회원가입 페이지에서는 비밀번호 토글 버튼이 두 개이기 때문에 ID 대신 querySelectorAll과 class 선택자를 사용하여 비밀번호 토글 버튼의 배열을 생성한 다음, forEach 루프를 사용해 각 버튼에 클릭 이벤트 리스너를 추가하는 방식을 택했어요.
  // - 이 방법은 페이지 내에서 동일한 클래스를 가진 여러 요소에 같은 기능을 적용할 때 효과적이에요.
  // - 버튼 클릭 시 실행되는 togglePassword 함수에서는 이벤트가 발생한 특정 버튼에 대한 조작이 이루어지므로, 같은 페이지에 여러 토글 버튼이 있더라도 각각 독립적으로 기능하게 됩니다.
  const toggleButtons = document.querySelectorAll(".password-toggle-button"); // 'password-toggle-button' 클래스를 가진 모든 요소들의 배열
  toggleButtons.forEach((button) =>
    button.addEventListener("click", togglePasswordVisibility)
  );
});
