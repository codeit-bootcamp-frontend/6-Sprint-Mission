import Image from "next/image";
import React from "react";
import styled from "styled-components";
import ic_x from "@/public/icon/ic_x.svg";

interface DeleteButtonProps {
  onClick: () => void;
  label: string;
}

const Button = styled.button`
  background-color: #9ca3af;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #3692ff;
  }
`;

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, label }) => {
  return (
    <Button aria-label={`${label} 삭제`} onClick={onClick}>
      <Image src={ic_x} alt="삭제 svg" />
    </Button>
  );
};

export default DeleteButton;
