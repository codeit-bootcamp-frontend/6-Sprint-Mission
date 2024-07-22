import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/NavigationBtn.css';
const ROOT_PATH = `/items?`;

const PageNationItem = ({
  children,
  searchParams,
}: {
  children: string;
  searchParams: URLSearchParams;
}) => {
  const navigation = useNavigate();
  const onClick = () => {
    searchParams.set('page', children);
    navigation(`${ROOT_PATH}${searchParams}`);
  };

  return (
    <button
      className={
        searchParams.get('page') === children ? 'navBtn clicked' : 'navBtn'
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PageNationItem;

