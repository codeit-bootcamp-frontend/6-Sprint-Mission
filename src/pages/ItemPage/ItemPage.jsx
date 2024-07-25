import { useEffect, useState } from "react";
import { getProductDetail } from "../../api/api";
import { useParams } from "react-router-dom";
import { ReactComponent as HeartIcon } from "../../imgs/icon/icon_heart.svg";
import Comment from "../../components/Comment";

function ItemPage() {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    async function fetchProduct() {
      if (!productId) {
        setError("상품 아이디가 제공되지 않았습니다.");
        return;
      }
      try {
        const response = await getProductDetail(productId);
        if (!response) {
          throw new Error("해당 상품의 데이터를 찾을 수 없습니다.");
        }
        setProduct(response);
        console.log(response);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchProduct();
  }, [productId]);

  if (error) {
    return (
      <div className="flex p-6 m-4 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex p-6 m-4">
        <p>로딩 중...</p>
      </div>
    );
  }

  const tags = Array.isArray(product.tags) ? product.tags : [];

  return (
    <div>
      <div className="flex p-6 m-4">
        <img
          src={product.images}
          alt="상품 이미지"
          className="w-[486px] h-[486px] object-cover rounded-2xl mb-4 mr-6"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {product.name}
          </h2>
          <p className="text-[40px] font-[600] mb-2">{product.price}원</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          {tags.length > 0 ? (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
          <div className="flex items-center text-gray-500 text-sm">
            <time className="mr-2">
              {new Date(product.updatedAt).toLocaleDateString()}
            </time>
            <button className="flex justify-center items-center gap-1 w-[63px] h-[32px] rounded-[35px] border py-1 px-3">
              <HeartIcon />
              <span>{product.favoriteCount}</span>
            </button>
          </div>
        </div>
      </div>
      <Comment productId={product.id} />
    </div>
  );
}

export default ItemPage;
