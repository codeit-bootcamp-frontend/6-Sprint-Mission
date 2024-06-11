const useDate = (diffDate: number) => {
	const hour = Math.floor(Math.abs(diffDate / (1000 * 60 * 60)));
	const min = Math.floor(Math.abs(diffDate / (1000 * 60)));
	const sec = Math.floor(Math.abs(diffDate / 1000));

	if (hour >= 24) return `${Math.floor(hour / 24)}일 전`;
	else if (hour >= 0) return `${hour}시간 전`;
	else if (min >= 0) return `${min}분 전`;
	else if (sec >= 0) return `${sec}초 전`;
	else if (hour >= 24) return `${Math.abs(hour / 24)}일 전`;
	else return '';
};

export default useDate;
