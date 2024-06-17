import axios from "axios";

export default async function getBestItems() {
  try {
    //API 호출
    const responses = await axios.get(
      "https://panda-market-api.vercel.app/products?page=1&pageSize=4&orderBy=favorite"
    );
    return responses;
  } catch (error) {
    console.error(error);
  }
}
