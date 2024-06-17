import { useState, useEffect } from 'react'

// 글 작성시간을 인자로 받아오기
export const useTimeStamp = (timestamp) => {
  const [timeAgo, setTimeAgo] = useState('')

  const updateTimeStamp = () => {
    // 경과한 시간 계산 (1초 = 1000)
    const timeElapsed = Math.floor((new Date() - new Date(timestamp)) / 1000)

    if (timeElapsed < 60) {
      setTimeAgo(`방금 전`)
    } else if (timeElapsed < 60 * 60) {
      const minutes = Math.floor(timeElapsed / 60)
      setTimeAgo(`${minutes}분 전`)
    } else if (timeElapsed < 60 * 60 * 24) {
      const hours = Math.floor(timeElapsed / (60 * 60))
      setTimeAgo(`${hours}시간 전`)
    } else {
      const days = Math.floor(timeElapsed / (60 * 60 * 24))
      setTimeAgo(`${days}일 전`)
    }
  }

  useEffect(() => {
    updateTimeStamp()
  }, [timestamp])

  return timeAgo
}
