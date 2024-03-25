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
