import { useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, fallback: T)
{
	const [storage, set_storage] = useState<T>(key in localStorage ? deserialize(localStorage[key]) : fallback);

	useEffect(() =>
	{
		function listener(event: StorageEvent)
		{
			if (key === event.key && event.oldValue !== event.newValue && event.storageArea === localStorage)
			{
				set_storage(key in localStorage ? deserialize(localStorage[key]) : fallback);
			}
		}

		window.addEventListener("storage", listener);
		// @ts-ignore
		window.addEventListener("local-storage", listener);

		return () =>
		{
			window.removeEventListener("storage", listener);
			// @ts-ignore
			window.removeEventListener("local-storage", listener);
		};
	},
	[key, fallback]);

	function setter(value: T | ((value: T) => T))
	{
		const signal = value instanceof Function ? value(storage) : value;

		switch (storage)
		{
			case null: case undefined:
			{
				localStorage[key] = serialize(fallback);
				break;
			}
			default:
			{
				localStorage[key] = serialize(signal);
				break;
			}
		}
		window.dispatchEvent(new StorageEvent("local-storage", { key, storageArea: localStorage, oldValue: serialize(storage), newValue: serialize(signal) }));
	}

	return [storage, setter] as [T, typeof setter];
}

function serialize(value: unknown) { return JSON.stringify({ ["value"]: value }); } function deserialize(value: unknown) { return JSON.parse(String(value))["value"]; }
