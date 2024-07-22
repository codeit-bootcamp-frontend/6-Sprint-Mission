import ItemTag from "@/components/Item/ItemTag";

interface ItemTagListProps {
  className?: string;
  tags: string[];
  isEditable: boolean;
  onClickTag: (tag: string) => void;
}

const ItemTagList = ({
  className,
  tags,
  isEditable,
  onClickTag,
}: ItemTagListProps) => {
  return (
    <div className={className}>
      {tags.map((tag: string) => (
        <ItemTag
          key={tag}
          tag={tag}
          onClick={() => onClickTag(tag)}
          isEditable={isEditable}
        />
      ))}
    </div>
  );
};

export default ItemTagList;
