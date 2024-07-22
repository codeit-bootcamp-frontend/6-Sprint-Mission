import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "./api/api";
import Products from "./Products";

const ListPage = () => {
  const orderBy = "favorite";
  const page = 1;
  const pageSize = 4;

  const { data, error, isLoading } = useQuery({
    queryKey: [page, pageSize, orderBy],
    queryFn: () => getProducts({ page, pageSize, orderBy }),
    staleTime: 60 * 1000,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error fetching products: {error.message}</div>;
  }

  // Check if data is defined and has the list property
  const products = data?.list || []; // Extract the list of products
  const hasProducts = products.length > 0;

  return (
    <>
      <div>
        <h1>베스트 상품</h1>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {hasProducts ? (
            <>
              {products.map((product) => (
                <div key={product.id}>
                  {product.images && product.images.length > 0 && (
                    <div>
                      <div>
                        {product.images.map((imageUrl, index) => (
                          <img
                            key={index}
                            src={imageUrl}
                            alt={`Product ${product.id} image ${index}`}
                            style={{
                              width: "282px",
                              height: "282px",
                              marginRight: "10px",
                            }}
                          />
                        ))}
                      </div>
                      <div>{product.name}</div>
                      <div>{product.price}원</div>
                      <div>{product.favoriteCount}</div>
                    </div>
                  )}
                </div>
              ))}
            </>
          ) : (
            <div>No products available</div>
          )}
        </div>
      </div>
      <Products />
    </>
  );
};

export default ListPage;
