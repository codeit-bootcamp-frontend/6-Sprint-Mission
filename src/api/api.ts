import axios, { AxiosError, AxiosResponse } from 'axios';
import instance from './axios';
import { articlesType, writingType } from './apiType';
import { url } from 'inspector';
import Cookies from 'js-cookie';
import { form } from '../components/AddBoardForm';
import { title } from 'process';

export const getBestPosts = async (params: string): Promise<writingType[]> => {
  const URL = `/articles?${params}`;
  try {
    const response: AxiosResponse<articlesType> = await instance.get(URL);
    return response.data.list;
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      console.error('Response error:', err.response.status);
      console.error('Response data:', err.response.data);
      throw err;
    }

    throw error;
  }
};

export const getTotalPosts = async (params: string): Promise<writingType[]> => {
  const URL = `/articles?${params}`;
  try {
    const response: AxiosResponse<articlesType> = await instance.get(URL);
    return response.data.list;
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      console.error('Response error:', err.response.status);
      console.error('Response data:', err.response.data);
      throw err;
    }
    console.error(error);
    throw error;
  }
};
export const tempSignUP = async () => {
  const TEMP_URL = '/auth/signIn';
  try {
    if (!Cookies.get('accessToken')) {
      const response = await instance.post(TEMP_URL, {
        email: 'leedong0225@icloud.com',
        password: 'abcd1234',
      });
      const { accessToken, refreshToken } = response.data;
      Cookies.set('accessToken', accessToken);
      Cookies.set('refreshToken', refreshToken);
    }
  } catch (error) {}
};

export const postImage = async (image: File | null) => {
  const URL = '/images/upload';

  try {
    if (image) {
      const response = await instance.post(URL, { image: image });
      const imageUrl = response.data.url;
      return imageUrl;
    }
    return '';
  } catch (error) {}
};

export const postArticles = async (formData: form, imageUrl: string) => {
  const URL = '/articles';
  try {
    const response = await instance.post(URL, {
      image: imageUrl,
      content: formData.content,
      title: formData.title,
    });
  } catch (error) {}
};

