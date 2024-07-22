import { inquiryType, productType } from './type';

const URL = `https://panda-market-api.vercel.app/products/`;

const getProducts = async (searchParams = ''): Promise<productType[]> => {
  let response;
  try {
    response = await fetch(`${URL}?${searchParams}`, {
      method: 'GET',
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
  if (!response.ok) {
    const httpError = await response.json();
    const error = new Error(httpError.message);
    error.name = `httpError`;
    throw error;
  }
  const result = await response.json();
  return result.list;
};

const getProduct = async (searchParams = ''): Promise<productType> => {
  let response;
  try {
    response = await fetch(`${URL}${searchParams}`, {
      method: 'GET',
    });
  } catch (error) {
    console.error(error);
    throw error;
  }

  if (!response.ok) {
    const httpError = await response.json();
    const error = new Error(httpError.message);
    error.name = `httpError`;
    throw error;
  }
  const result = await response.json();
  return result;
};

const getComments = async (searchParams = ''): Promise<inquiryType[]> => {
  let response;
  try {
    response = await fetch(`${URL}${searchParams}`, {
      method: 'GET',
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
  if (!response.ok) {
    const httpError = await response.json();
    const error = new Error(httpError.message);
    error.name = `httpError`;
    throw error;
  }
  const result = await response.json();
  return result.list;
};

export { getProduct, getProducts, getComments };

