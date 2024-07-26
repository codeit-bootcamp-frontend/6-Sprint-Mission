import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// 요청 인터셉터 설정
instance.interceptors.request.use(
  (config) => {
    // 로컬 스토리지에서 accessToken 가져오기
    const accessToken = localStorage.getItem('accessToken')?.replace(/"/gi, '')

    // accessToken이 존재하는 경우, 헤더에 추가
    if (accessToken) {
      config.url?.includes('upload')
        ? (config.headers['Content-Type'] = 'multipart/form-data')
        : (config.headers['Content-Type'] = 'application/json')
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    // 요청 에러 처리
    return Promise.reject(error)
  },
)

// 응답 인터셉터 설정
instance.interceptors.response.use(
  (response) => {
    // 응답이 성공적인 경우 그대로 반환
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // 에러가 인증 실패(401)이고, 재시도하지 않은 경우
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true // 무한 루프 방지를 위해 플래그 설정

      try {
        // 로컬 스토리지에서 refreshToken 가져오기
        const refreshToken = localStorage
          .getItem('refreshToken')
          ?.replace(/"/gi, '')

        // refreshToken이 없는 경우 에러 발생
        if (!refreshToken) {
          throw new Error('리프레시 토큰이 없습니다.')
        }

        // 새로운 accessToken 요청
        const response = await instance.post('/auth/refresh-token', {
          refreshToken: refreshToken,
        })
        const { accessToken } = response.data

        // 새로운 accessToken을 로컬 스토리지에 저장
        localStorage.setItem('accessToken', accessToken)

        // 새로운 accessToken으로 헤더 업데이트
        instance.defaults.headers.common['Authorization'] =
          `Bearer ${accessToken}`
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`

        // 새로운 토큰으로 원래 요청 재시도
        return instance(originalRequest)
      } catch (error) {
        console.error('토큰 갱신 실패:', error)
      }
    }
    alert(`ERROR: ${error.response.data.message}`)
    return Promise.reject(error)
  },
)

export default instance
