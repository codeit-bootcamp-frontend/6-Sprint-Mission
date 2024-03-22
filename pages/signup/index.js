import "/pages/login/index.js";

const [password, password_confirm] = [document.querySelector(`#password`), document.querySelector(`#password-confirm`)];

function validator()
{
	password_confirm.setCustomValidity(password.value === password_confirm.value ? `` : `비밀번호 불일치`);
}

for (const element of [password, password_confirm])
{
	element.addEventListener(`change`, (event) => {
		validator();
	});
	element.addEventListener(`keyup`, (event) => {
		validator();
	});
}
