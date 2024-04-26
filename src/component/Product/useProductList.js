import { useEffect, useState } from "react";
import { getItems } from "../../api/Api.js";

const useProductList = (loadOptions) => {
  const [productList, setProductList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const { list, totalCount } = await getItems(loadOptions);
        setProductList(list);
        setTotalCount(totalCount);
      } catch (error) {
        console.error("상품 목록을 불러오는 도중 오류가 발생했습니다:", error);
      }
    };

    fetchProductList();
  }, [loadOptions]);

  return { productList, totalCount };
};

export default useProductList;
