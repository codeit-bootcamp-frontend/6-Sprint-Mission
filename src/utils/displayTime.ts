export const displayTime = (time: string) => {
  const date = +new Date(time)
  const now = Date.now()

  const milliSeconds = now - date

  const seconds = milliSeconds / 1000
  const minutes = seconds / 60
  const hours = minutes / 60
  const days = hours / 24
  const months = days / 30
  const years = months / 12

  if (seconds < 60) {
    return '방금 전'
  } else if (minutes < 60) {
    return `${Math.floor(minutes)}분 전`
  } else if (hours < 24) {
    return `${Math.floor(hours)}시간 전`
  } else if (days < 30) {
    return `${Math.floor(days)}일 전`
  } else if (months < 12) {
    return `${Math.floor(months)}달 전`
  } else {
    return `${Math.floor(years)}년 전`
  }
}
