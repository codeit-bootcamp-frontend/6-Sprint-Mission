import instance from "./axios";

export async function getProductList(id, count, sort, query = "") {
  try {
    const res = await instance.get(
      `/products?page=${id}&pageSize=${count}&orderBy=${sort}&keyword=${query}`
    );
    return res.data;
  } catch (e) {
    console.error(e);
  }
}
