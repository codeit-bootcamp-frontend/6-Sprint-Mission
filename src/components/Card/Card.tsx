import FavoriteButton from "@/components/Button/FavoriteButton";
import DeleteButton from "@/components/Button/DeleteButton";
import CardImage from "@/components/Card/CardImage";

const CardWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={className}>{children}</div>;
};

const CardTitle = ({
  title,
  children,
  className,
}: {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3 className={`text-18 font-semibold md:text-20 ${className}`}>
      {children || title}
    </h3>
  );
};

const CardSubTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h4 className={`font-medium text-gray-500 ${className}`}>{children}</h4>
  );
};

const CardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <p className={`font-normal text-gray-700 ${className}`}>{children}</p>;
};

const CardFavoriteButton = ({
  className,
  disabled,
  favoriteCount,
  isFavorite,
  handleLikeButtonClick = () => {},
}: {
  className?: string;
  disabled?: boolean;
  favoriteCount: number;
  isFavorite: boolean;
  handleLikeButtonClick?: (userAction: "LIKE" | "UNLIKE") => void;
}) => {
  return (
    <FavoriteButton
      likeCount={favoriteCount}
      isLiked={isFavorite}
      onClick={() => handleLikeButtonClick(isFavorite ? "UNLIKE" : "LIKE")}
      disabled={disabled}
      className={className}
    />
  );
};

const CardTagBox = ({
  tags,
  children,
  className,
}: {
  tags?: string[];
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`mb-24 mt-8 flex h-auto w-full flex-wrap gap-8 ${className}`}
    >
      {tags ? tags.map((tag) => <CardTag key={tag} tag={tag} />) : children}
    </div>
  );
};

const CardTag = ({
  tag,
  onClick,
  isEditable = false,
  className,
}: {
  tag: string;
  onClick?: React.MouseEventHandler;
  isEditable?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={`flex h-36 items-center justify-around gap-4 rounded-26 bg-gray-100 px-16 text-16 ${className}`}
    >
      <p>{isEditable ? tag : `#${tag}`}</p>
      {isEditable && onClick && <DeleteButton onClick={onClick} />}
    </div>
  );
};

const Card = Object.assign(CardWrapper, {
  Title: CardTitle,
  SubTitle: CardSubTitle,
  Description: CardDescription,
  Image: CardImage,
  Favorite: CardFavoriteButton,
  TagBox: CardTagBox,
  Tag: CardTag,
});

export default Card;
