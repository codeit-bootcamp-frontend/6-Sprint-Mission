import {
  format,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";

export const formatUpdatedAt = dateString => {
  const date = new Date(dateString); // 입력된 날짜 문자열을 Date 객체로 변환
  const now = new Date(); // 현재 기준 Date 객체 생성

  const diffInDays = differenceInDays(now, date); // 현재 시간과 입력된 날짜의 차이를 일(day) 단위로 계산
  const diffInHours = differenceInHours(now, date); // 현재 시간과 입력된 날짜의 차이를 시간(hour) 단위로 계산
  const diffInMinutes = differenceInMinutes(now, date); // 현재 시간과 입력된 날짜의 차이를 분(minute) 단위로 계산
  const diffInSeconds = differenceInSeconds(now, date); // 현재 시간과 입력된 날짜의 차이를 초(second) 단위로 계산

  if (diffInSeconds < 60) {
    return "방금 전"; // 차이가 1분 미만인 경우 "방금 전" 형식으로 출력
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`; // 차이가 1시간 미만인 경우 "N분 전" 형식으로 출력
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`; // 차이가 1일 미만인 경우 "N시간 전" 형식으로 출력
  } else if (diffInDays < 7) {
    return `${diffInDays}일 전`; // 차이가 7일 이내인 경우 "N일 전" 형식으로 출력
  } else {
    // 차이가 7일 이상인 경우 포맷팅된 날짜 출력
    return format(date, "yyyy.MM.dd hh:mm a");
  }
};
