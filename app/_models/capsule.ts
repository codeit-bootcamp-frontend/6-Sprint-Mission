export default function capsule<T>(getter: () => T, setter: (value: T) => void)
{
	return function (value?: T) { return value === undefined ? getter() : setter(value); } as { (): T; (value: T): void; }
}
