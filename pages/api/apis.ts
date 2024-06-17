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

export async function imageUpload(imgFile: File) {
  try {
    const formData = new FormData();
    formData.append('image', imgFile);
    const res = await axios.post('/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data.url;
  } catch (error) {
    console.error('Error POST imageUpload', error);
  }
}

export async function createArticle(
  title: string,
  content: string,
  imgUrl?: string | null,
) {
  try {
    await axios.post('/articles', { title, content, image: imgUrl });
  } catch (error) {
    console.error('Error POST createArticle', error);
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
