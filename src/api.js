const BASE_URL = "https://panda-market-api.vercel.app";

export async function getProducts({ page = 1, pageSize = 10, orderBy = "" }) {
  const query = `page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`;
  try {
    const response = await fetch(`${BASE_URL}/products?${query}`);
    if (!response.ok) {
      throw new Error("데이터를 불러오는데 실패했습니다");
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getProductDetail(id) {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error("데이터를 불러오는데 실패했습니다");
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("데이터를 불러오는데 실패했습니다");
    throw error;
  }
}

export async function getProductComments(id) {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}/comments?limit=3`);
    if (!response.ok) {
      throw new Error("데이터를 불러오는데 실패했습니다");
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("데이터를 불러오는데 실패했습니다");
    throw error;
  }
}
