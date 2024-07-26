import instance from '../../lib/axios'

export async function getUsersMe() {
  try {
    const { data } = await instance.get('/users/me')
    return data
  } catch (error) {
    console.error('getUsersMe 함수에서 오류 발생:', error)
    throw error
  }
}
