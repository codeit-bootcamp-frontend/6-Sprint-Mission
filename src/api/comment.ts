interface GetCommentListParams {
  productId: string;
  limit?: number;
  cursor?: number;
}

export async function getCommentList({
  productId,
  limit = 5,
  cursor,
}: GetCommentListParams) {
  const searchParams = new URLSearchParams({
    limit: String(limit),
  });

  if (cursor !== undefined) {
    searchParams.append("cursor", String(cursor));
  }

  const url = `${process.env.REACT_APP_BASE_URL}/products/${productId}/comments?${searchParams}`;

  const res = await fetch(url);
  const body = await res.json();

  return body;
}

interface PostCommentParams {
  productId: string;
  content: string;
}

export async function postComment({ productId, content }: PostCommentParams) {
  const accessToken = localStorage.getItem("accessToken");
  const url = `${process.env.REACT_APP_BASE_URL}/products/${productId}/comments`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ content }),
  });

  const body = await res.json();

  return body;
}

interface EditCommentParams {
  commentId: number;
  content: string;
}

export async function editComment({ commentId, content }: EditCommentParams) {
  const accessToken = localStorage.getItem("accessToken");
  const url = `${process.env.REACT_APP_BASE_URL}/comments/${commentId}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ content }),
  });

  const body = await res.json();

  return body;
}

export async function deleteComment(commentId: number) {
  const accessToken = localStorage.getItem("accessToken");
  const url = `${process.env.REACT_APP_BASE_URL}/comments/${commentId}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const body = await res.json();

  return body;
}
