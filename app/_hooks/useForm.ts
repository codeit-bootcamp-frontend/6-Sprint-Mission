import { useCallback, useEffect, useRef, useState } from "react";

export const enum Cause
{
	PATTERN,
	REQUIRED,
	MINLENGTH,
	MAXLENGTH,
}

export const enum Trigger
{
	BLUR,
	FOCUS,
	CHANGE,
	SUBMIT,
	VERIFY,
}
// TODO: get rid of anti-patterns
export default function useForm(id: string, triggers: Trigger[], onSubmit: (data: FormData) => void)
{
	// DOM element
	const form = useRef<Nullable<HTMLFormElement>>(null);
	// data tracker
	const [values, set_values] = useState<Record<string, Nullable<string>>>({});	
	const [errors, set_errors] = useState<Record<string, Nullable<string>>>({});
	// event handles
	const onBlock = useRef<({ input, key }: { input: HTMLInputElement; key: string; }) => boolean>(() => false);
	const onEffect = useRef<({ input, trigger }: { input: HTMLInputElement; trigger: Trigger; }) => void>(() => null);
	const onVerify = useRef<({ input, trigger }: { input: HTMLInputElement; trigger: Trigger; }) => typeof values[keyof typeof values]>(() => null);
	// validation tracker
	const checks = useRef<Record<string, boolean>>({}); const [disabled, set_disabled] = useState(true);

	const causes = useCallback((input: HTMLInputElement) =>
	{
		const buffer: Set<Cause> = new Set();

		if (input.required && input.value.length === 0)
		{
			buffer.add(Cause.REQUIRED);
		}
		else
		{
			if (input.minLength && input.value.length < input.minLength)
			{
				buffer.add(Cause.MINLENGTH);
			}
			if (0 < input.maxLength && input.maxLength < input.value.length)
			{
				buffer.add(Cause.MAXLENGTH);
			}
			if (input.pattern && !new RegExp(input.pattern).test(input.value))
			{
				buffer.add(Cause.PATTERN);
			}
		}
		return buffer;
	},
	[]);

	const message = useCallback((input: HTMLInputElement, value: Nullable<string> | (() => Nullable<string>)) =>
	{
		if (!form.current) throw new Error();
		
		const msg = value instanceof Function ? value() : value;
		// anti-pattern
		errors[input.name] = msg; checks.current = { ...checks.current, [input.name]: !msg };
		// actually update
		set_errors((errors) => ({ ...errors, [input.name]: msg }));
		// :valid :invalid supports
		(form.current.elements[input.name as never] as HTMLInputElement).setCustomValidity(msg ?? "");
	},
	[errors]);

	const notify = useCallback((name: string, trigger: Trigger = Trigger.VERIFY) =>
	{
		if (!form.current) throw new Error();

		const input = form.current.elements[name as never] as HTMLInputElement;

		message(input, onVerify.current({ input, trigger }))

		onEffect.current({ input, trigger });
	},
	[message]);

	useEffect(() =>
	{
		if (form.current = document.getElementById(id) as Nullable<HTMLFormElement>)
		{
			const inputs = form.current.querySelectorAll<HTMLInputElement>("input[name]");

			set_values((_) =>
			{
				const buffer: typeof values = {};
	
				for (const input of inputs) buffer[input.name] = input.value;
	
				return buffer;
			});
			set_errors((_) =>
			{
				const buffer: typeof errors = {};
	
				for (const input of inputs) buffer[input.name] = null;
	
				return buffer;
			});
			checks.current = (() =>
			{
				const buffer: typeof checks.current = {};
	
				for (const input of inputs) buffer[input.name] = !input.required;
	
				return buffer;
			})();
		}
	},
	[id]);

	useEffect(() =>
	{
		if (!form.current) throw new Error();

		const target = form.current;

		for (const input of target.querySelectorAll<HTMLInputElement>("input[name]"))
		{
			for (const trigger of new Set(triggers))
			{
				switch (trigger)
				{
					case Trigger.BLUR:
					{
						input.onblur = (event) => notify(input.name, trigger);
						break;
					}
					case Trigger.FOCUS:
					{
						input.onfocus = (event) => notify(input.name, trigger);
						break;
					}
				}
			}
			input.oninput = (event) =>
			{
				// anti-pattern
				values[input.name] = input.value; notify(input.name, Trigger.CHANGE);

				set_values((values) => ({ ...values, [input.name]: input.value }));
			};
			input.onkeydown = (event) =>
			{
				if (onBlock.current({ input, key: event.key })) event.preventDefault();
			};
		}
		target.onsubmit = (event) =>
		{
			if (triggers.includes(Trigger.SUBMIT))
			{
				for (const input of target.querySelectorAll<HTMLInputElement>("input[name]"))
				{
					notify(input.name, Trigger.SUBMIT);
				}
			}
			if (!disabled)
			{
				// send form data
				onSubmit(new FormData(target));
			}
			// fuck you
			event.preventDefault();
		};
	},
	[notify, values, disabled, triggers, onSubmit]);

	useEffect(() =>
	{
		for (const check of Object.values(checks.current))
		{
			if (!check) return set_disabled(true);
		}
		return set_disabled(false);
	},
	[checks.current]);

	return {
		values, errors, disabled, notify, causes, message,
		block: (handle: typeof onBlock.current) => onBlock.current = handle,
		verify: (handle: typeof onVerify.current) => onVerify.current = handle,
		effect: (handle: typeof onEffect.current) => onEffect.current = handle,
	};
}
