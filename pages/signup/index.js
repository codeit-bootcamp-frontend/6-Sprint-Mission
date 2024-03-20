const [password, password_confirm] = [document.getElementById("password"), document.getElementById("password-confirm")];

if (password !== null && password_confirm !== null)
{
	for (const element of [password, password_confirm])
	{
		element.addEventListener("change", (event) => {
			password_confirm.setCustomValidity(password.value === password_confirm.value ? "" : "비밀번호 불일치");
		});
		element.addEventListener("keyup", (event) => {
			password_confirm.setCustomValidity(password.value === password_confirm.value ? "" : "비밀번호 불일치");
		});
	}
}

for (const element of document.querySelectorAll("form > .field > .wrapper:has(input[type=\"password\"]) > img"))
{
	element.addEventListener("click", (event) => {
		const wrapper = event.target.parentElement;
		const input = wrapper.querySelector("input");
	
		switch (input.type)
		{
			case "password":
			{
				input.type = "text";
				wrapper.classList.add("visible");
				wrapper.classList.remove("invisible");
				break;
			}
			default:
			{
				input.type = "password";
				wrapper.classList.add("invisible");
				wrapper.classList.remove("visible");
				break;
			}
		}
	});
}
