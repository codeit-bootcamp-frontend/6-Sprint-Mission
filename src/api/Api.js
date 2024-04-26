//product item list api
const BASEURL = "https://panda-market-api.vercel.app";
export async function getItems({
  pageSize = 12,
  orderBy = "recent",
  page = "1",
}) {
  const query = `pageSize=${pageSize}&orderBy=${orderBy}&page=${page}`;
  const response = await fetch(`${BASEURL}/products?${query}`);
  const body = await response.json();
  return body;
}

//product item detail api
export async function getItemDetail({ id }) {
  const response = await fetch(`${BASEURL}/products/${id}`);
  const body = await response.json();
  return body;
}

//product item comment api
export async function getItemDetailComment({ id }) {
  const response = await fetch(`${BASEURL}/products/${id}/comments?limit=30`);
  const body = await response.json();
  return body;
}
