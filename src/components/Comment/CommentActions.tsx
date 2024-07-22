import PrimaryDropdown from "../Dropdown/PrimaryDropdown";
import KebabIcon from "/public/images/ic_kebab.svg";

const CommentActions = ({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => {};
}) => {
  return (
    <PrimaryDropdown
      buttonContent={<KebabIcon />}
      options={[
        { children: "수정하기", value: "commentEdit", onSelect: onEdit },
        { children: "삭제하기", value: "commentDelete", onSelect: onDelete },
      ]}
    />
  );
};

export default CommentActions;
