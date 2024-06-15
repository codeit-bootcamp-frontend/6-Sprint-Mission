import HeartIcon from '@/public/images/icons/ic_heart.svg';

interface LickCountProps {
  count: number;
  width?: number;
  height?: number;
  gap?: number;
  fontSize?: number;
  leading?: number;
  fontWeight?: number;
  color?: string;
}

const LikeCount: React.FC<LickCountProps> = ({
  count,
  width,
  height,
  fontSize,
  gap,
  leading,
  fontWeight,
  color,
}) => {
  const displayCount = count >= 10000 ? '9999+' : count.toString();

  return (
    <div className={`flex gap-[${gap}px] items-center text-[#${color}]`}>
      <HeartIcon width={width} height={height} alt="좋아요 아이콘" />
      <span
        className={`text-[${fontSize}px] leading-[${leading}px] font-[${fontWeight}px]`}
      >
        {displayCount}
      </span>
    </div>
  );
};

export default LikeCount;
