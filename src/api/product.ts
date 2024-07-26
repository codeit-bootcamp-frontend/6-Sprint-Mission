interface GetProductsParams {
  page?: number;
  pageSize?: number;
  orderBy?: "favorite" | "recent";
  keyword?: string;
}

export async function getProducts({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
}: GetProductsParams = {}) {
  const searchParams = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    orderBy,
    keyword,
  });
  const url = `${process.env.REACT_APP_BASE_URL}/products?${searchParams}`;

  const res = await fetch(url);
  const body = await res.json();

  return body;
}

export async function getProductDetail(productId: string) {
  const url = `${process.env.REACT_APP_BASE_URL}/products/${productId}`;

  const res = await fetch(url);
  const body = await res.json();

  return body;
}

export interface PostProductPayload {
  images: string[];
  tags: string[];
  price: number;
  description: string;
  name: string;
}

export async function postProduct(payload: PostProductPayload) {
  const accessToken = localStorage.getItem("accessToken");
  const url = `${process.env.REACT_APP_BASE_URL}/products`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ ...payload }),
  });

  const body = await res.json();

  return body;
}

export async function deleteProduct(productId: string) {
  const accessToken = localStorage.getItem("accessToken");
  const url = `${process.env.REACT_APP_BASE_URL}/products/${productId}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const body = await res.json();

  return body;
}

interface EditProductParams {
  productId: string;
  payload: {
    images: string[];
    tags: string[];
    price: number;
    description: string;
    name: string;
  };
}

export async function editProduct({ productId, payload }: EditProductParams) {
  const accessToken = localStorage.getItem("accessToken");
  const url = `${process.env.REACT_APP_BASE_URL}/products/${productId}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ ...payload }),
  });

  const body = await res.json();

  return body;
}
