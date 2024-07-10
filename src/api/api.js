export async function fetchProducts() {
  try {
    const res = await fetch('https://panda-market-api.vercel.app/products');
    if (!res.ok) {
      throw new Error(`HTTP에러: ${res.status}`);
    }
    const body = await res.json();
    return body.list;
  } catch (error) {
    console.error('받아오기실패', error);
    throw error;
  }
}
