import styled from 'styled-components';
import { ReactComponent as CloseIcon } from '../../assets/images/icons/ic_x.svg';

type DeleteButtonProps = {
  onClick: () => void;
  label: string;
};

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.gray[400]};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue.primary};
  }
`;

function DeleteButton({ onClick, label }: DeleteButtonProps) {
  return (
    <Button aria-label={`${label} 삭제`} onClick={onClick}>
      <CloseIcon />
    </Button>
  );
}

export default DeleteButton;
