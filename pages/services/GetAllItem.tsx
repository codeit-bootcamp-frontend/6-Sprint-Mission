import axios from "axios";

export default async function getAllItems(
  currentPage: number,
  sort: string,
  search: string
) {
  try {
    //API 호출
    const responses = await axios.get(
      `https://panda-market-api.vercel.app/products?page=${currentPage}&pageSize=10&orderBy=${sort}&keyword=${search}`
    );
    return responses;
  } catch (error) {
    console.error(error);
  }
}
