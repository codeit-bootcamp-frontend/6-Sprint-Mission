import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "./api/api";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Products = () => {
  const navigate = useNavigate();
  const pageSize = 10;
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const { data, error, isLoading } = useQuery({
    queryKey: [page, pageSize, orderBy],
    queryFn: () => getProducts({ page, pageSize, orderBy }),
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    if (data && data.totalCount) {
      setTotalPages(Math.ceil(data.totalCount / pageSize));
    }
  }, [data, pageSize]);

  const handlePrevPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prevPage) => prevPage + 1);
  };

  const handleOrderByChange = (order) => {
    setOrderBy(order);
    setPage(1); // Reset to the first page when order changes
  };

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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>전체 상품</h1>
        <button onClick={() => navigate("/additem")}>상품 등록하기</button>
        <button onClick={() => handleOrderByChange("recent")}>최신순</button>
        <button onClick={() => handleOrderByChange("favorite")}>
          좋아요순
        </button>
      </div>
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
                            width: "221px",
                            height: "221px",
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
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </>
  );
};
export default Products;
