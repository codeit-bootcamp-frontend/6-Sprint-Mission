const createQueryParams = (obj: Record<string, any>): URLSearchParams => {
  const stringRecord = Object.entries(obj).reduce(
    (acc, [key, value]) => {
      acc[key] = String(value);
      return acc;
    },
    {} as Record<string, string>
  );
  return new URLSearchParams(stringRecord);
};

export default createQueryParams;
