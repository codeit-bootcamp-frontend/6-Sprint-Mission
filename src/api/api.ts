import instance from '../lib/axios'
import axiosGetInstance from '../lib/axiosGetInstance'

// 모든 상품
export async function getProducts({
  page = 1,
  pageSize = 100,
  order = '',
  keyword = '',
}) {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    order,
    keyword,
  })
  const { data } = await instance.get(`/products?${params.toString()}`)
  return data.list
}

// 베스트 상품
export async function getBestProducts() {
  const params = new URLSearchParams({ orderBy: 'favorite' })
  const { data } = await instance.get(`/products?${params.toString()}`)
  return data
}

export async function getProductsDetail(id: string) {
  const { data } = await instance.get(`/products/${id}`)
  return data
}

export async function getProductsComments(id: string) {
  const params = new URLSearchParams({ limit: '5' })
  const { data } = await instance.get(
    `/products/${id}/comments?${params.toString()}`,
  )
  return data.list
}

type PostProductData = {
  name: string
  description: string
  price: number
  tags: string[]
  images?: string
}

// 게시글 등록
export async function postProducts(postData: PostProductData) {
  try {
    const response = await instance.post('/products', postData)
    return response.data
  } catch (error) {
    console.error('postProducts 함수에서 오류 발생:', error)
  }
}

// 댓글 등록
export async function postProductsComments(
  productId: string,
  content: string,
  token: string,
) {
  try {
    await instance.post(
      `/products/${productId}/comments`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
  } catch (error) {
    console.error('postProductsComments 함수에서 오류 발생:', error)
  }
}

// 상품 수정
export async function patchProducts(productId: number, content: string) {
  try {
    await instance.patch(`/products/${productId}`, { content })
  } catch (error) {
    console.error('patchProducts 함수에서 오류 발생:', error)
  }
}

// 상품 삭제
export async function deleteProducts(productId: number) {
  try {
    await instance.delete(`/products/${productId}`)
  } catch (error) {
    console.error('deleteProducts 함수에서 오류 발생:', error)
  }
}

// 페이지네이션을 위한 전체 게시글 수
export async function getTotalPosts() {
  try {
    const params = new URLSearchParams({ pageSize: '10000', orderBy: 'recent' })
    const { data } = await axiosGetInstance.get('/articles?', { params })
    return data.list.length
  } catch (error) {
    console.error('getTotalPosts 함수에서 오류 발생:', error)
    throw error
  }
}

export async function getPosts({
  orderBy = '',
  keyword = '',
  page = 1,
  pageSize = 10,
}) {
  try {
    const params = new URLSearchParams({
      orderBy,
      keyword,
      page: page.toString(),
      pageSize: pageSize.toString(),
    })
    const { data } = await axiosGetInstance.get(
      `/articles?${params.toString()}`,
    )
    return data.list
  } catch (error) {
    console.error('getPosts 함수에서 오류 발생:', error)
    throw error
  }
}

// 베스트 게시글
export async function getBestPosts({ pageSize = 3 }) {
  try {
    const params = new URLSearchParams({
      orderBy: 'like',
      pageSize: pageSize.toString(),
    })
    const { data } = await axiosGetInstance.get(
      `/articles?${params.toString()}`,
    )
    return data.list
  } catch (error) {
    console.error('getBestPosts 함수에서 오류 발생:', error)
    throw error
  }
}

// 게시글 상세
export async function getPostsDetail(articleId: string) {
  try {
    const { data } = await axiosGetInstance.get(`/articles/${articleId}`)
    return data
  } catch (error) {
    console.error('getPostsDetail 함수에서 오류 발생:', error)
    throw error
  }
}

// 게시글 댓글
export async function getPostsComments(articleId: string) {
  try {
    const params = new URLSearchParams({ limit: '100' })
    const { data } = await axiosGetInstance.get(
      `/articles/${articleId}/comments?${params.toString()}`,
    )
    return data.list
  } catch (error) {
    console.error('getPostsComments 함수에서 오류 발생:', error)
    throw error
  }
}

// 이미지 POST
export async function postImages(formData: FormData) {
  try {
    const response = await instance.post('/images/upload', formData)
    console.log(formData)
    console.log(response.data.url)
    return response.data.url
  } catch (error) {
    console.error('postImages 함수에서 오류 발생:', error)
    throw error
  }
}

type PostData = {
  title: string
  content: string
  image?: string
}

// 게시글 등록
export async function postArticles(postData: PostData) {
  try {
    const response = await instance.post('/articles', postData)
    return response.data
  } catch (error) {
    console.error('postArticles 함수에서 오류 발생:', error)
  }
}

// 댓글 등록
export async function postArticleComments(articleId: string, content: string) {
  try {
    await instance.post(`/articles/${articleId}/comments`, { content })
  } catch (error) {
    console.error('postArticleComments 함수에서 오류 발생:', error)
  }
}

// 댓글 수정
export async function patchComments(commentId: number, content: string) {
  try {
    await instance.patch(`/comments/${commentId}`, { content })
  } catch (error) {
    console.error('patchComments 함수에서 오류 발생:', error)
  }
}

// 댓글 삭제
export async function deleteComments(commentId: number) {
  try {
    await instance.delete(`/comments/${commentId}`)
  } catch (error) {
    console.error('deleteComments 함수에서 오류 발생:', error)
  }
}
