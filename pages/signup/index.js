const [password, password_confirm] = [document.querySelector(`#password`), document.querySelector(`#password-confirm`)];

if (password !== null && password_confirm !== null)
{
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
}

for (const element of document.querySelectorAll(`form > .field > .wrapper:has(input[type="password"])`))
{
	const [input, img] = [element.querySelector(`input`), element.querySelector(`img`)];

	img.addEventListener(`click`, (event) => {
		switch (input.type)
		{
			case `password`:
			{
				input.type = `text`; img.src = `/assets/icons/visible.svg`;
				break;
			}
			default:
			{
				input.type = `password`; img.src = `/assets/icons/invisible.svg`;
				break;
			}
		}
	});
}
