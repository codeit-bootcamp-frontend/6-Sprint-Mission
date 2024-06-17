export async function getList({ orderBy = "recent", page = 1, pageSize = 10 }) {
  const query = `orderBy=${orderBy}&page=${page}&pageSize=${pageSize}`;
  const response = await fetch(
    `https://panda-market-api.vercel.app/products?${query}`
  );
  const body = await response.json();
  return body;
}
