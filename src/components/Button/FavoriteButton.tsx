"use client";

import HeartIcon from "/public/images/ic_heart.svg";
import HeartActiveIcon from "/public/images/ic_heart-active.svg";

interface FavoriteButtonProps {
  className?: string;
  isLiked?: boolean;
  likeCount: number;
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
}

const FavoriteButton = ({
  className = "",
  isLiked = false,
  likeCount,
  onClick,
  ...rest
}: FavoriteButtonProps) => {
  return (
    <button
      className={`flex cursor-pointer items-center gap-4 bg-transparent p-0 text-12 font-medium ${className}`}
      onClick={onClick}
      {...rest}
    >
      {isLiked ? (
        <HeartActiveIcon width="16" height="16" viewBox="0 0 24 24" />
      ) : (
        <HeartIcon
          width="16"
          height="16"
          styles="color: var(--color-cool-gray-500)"
        />
      )}
      {likeCount}
    </button>
  );
};

export default FavoriteButton;
