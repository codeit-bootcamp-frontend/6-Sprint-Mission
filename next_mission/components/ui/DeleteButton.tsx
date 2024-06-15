import CloseIcon from '@/public/images/icons/ic_x.svg';

interface DeleteButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  label: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, label }) => {
  return (
    <button aria-label={`${label} 삭제`} onClick={onClick}>
      <CloseIcon />
    </button>
  );
};

export default DeleteButton;
