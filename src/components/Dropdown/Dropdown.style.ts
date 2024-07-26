import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: relative;
`;

export const DropdownList = styled.ul`
  position: absolute;
  right: 0;
  text-align: center;
  z-index: 500;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
`;

export const DropdownItem = styled.li`
  display: block;
  padding: 12px 40px;
  width: max-content;
  cursor: pointer;
  color: #6b7280;

  &:hover {
    background-color: #f7f7f8;
  }

  &:first-child {
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
  }

  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;
