import axios from './instance';

export async function getBoardById(id: number) {
  const res = await axios.get(`/articles/${id}`);
  return res.data;
}

export async function getBoardComments(boardId: number) {
  const res = await axios.get(`/articles/${boardId}/comments?limit=100`);
  return res.data.list;
}

export async function postBoardComment(boardId: number, content: string) {
  const res = await axios.post(`/articles/${boardId}/comments`, { content });
  return res.data;
}
