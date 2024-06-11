import axios from '@/lib/axios';
import { ILoadArticlesParams } from '@/interface/interface';

export async function loadArticles({
  page = 1,
  pageSize = 99,
  orderBy = 'recent',
  keyword = '',
}: ILoadArticlesParams) {
  try {
    const res = await axios.get('/articles', {
      params: { page, pageSize, orderBy, keyword },
    });
    return res.data.list;
  } catch (error) {
    console.error('Error get Articles', error);
  }
}

export async function loadArticlesDetail(articleId: string) {
  try {
    const res = await axios.get(`/articles/${articleId}`);
    return res.data;
  } catch (error) {
    console.error('Error get Articles Detail', error);
  }
}

export async function loadCommentsList(articleId: string) {
  try {
    const res = await axios.get(`/articles/${articleId}/comments`, {
      params: { articleId, limit: 99 },
    });
    return res.data.list;
  } catch (error) {
    console.error('Error get Articles Detail', error);
  }
}

export async function addComment(articleId: string, value: string) {
  try {
    await axios.post(`/articles/${articleId}/comments`, {
      content: value,
    });
  } catch (error) {
    console.error('Error get Articles Detail', error);
  }
}
