const baseURL = "https://panda-market-api.vercel.app";

export async function getProducts(params: Record<string, string> = {}) {
  const query = new URLSearchParams(params).toString();

  try {
    const response = await fetch(`${baseURL}/products?${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}

export async function getProductDetail(productId: string) {
  if (!productId) {
    throw new Error("Invalid product ID");
  }

  try {
    const response = await fetch(`${baseURL}/products/${productId}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Failed to fetch product detail:", error);
    throw error;
  }
}

export async function getProductComments({
  productId,
  params = {},
}: {
  productId: string;
  params: Record<string, string>;
}) {
  if (!productId) {
    throw new Error("Invalid product ID");
  }

  try {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(
      `${baseURL}/products/${productId}/comments?${query}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Failed to fetch product comments:", error);
    throw error;
  }
}

export async function postProductComment({
  productId,
  commentContent,
}: {
  productId: string;
  commentContent: string;
}) {
  if (!productId) {
    throw new Error("Invalid product ID");
  }

  if (!commentContent) {
    throw new Error("Comment content is required");
  }

  const requestBody = {
    content: commentContent,
  };

  try {
    const response = await fetch(`${baseURL}/products/${productId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Failed to post product comment:", error);
    throw error;
  }
}

export async function updateProductComment({
  commentId,
  commentContent,
}: {
  commentId: number;
  commentContent: string;
}) {
  if (!commentId) {
    throw new Error("Invalid comment ID");
  }

  if (!commentContent) {
    throw new Error("Comment content is required");
  }

  const requestBody = {
    content: commentContent,
  };

  try {
    const response = await fetch(`${baseURL}/comments/${commentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Failed to update product comment:", error);
    throw error;
  }
}

export async function deleteProductComment(commentId: number) {
  if (!commentId) {
    throw new Error("Invalid comment ID");
  }

  try {
    const response = await fetch(`${baseURL}/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to delete product comment:", error);
    throw error;
  }
}
