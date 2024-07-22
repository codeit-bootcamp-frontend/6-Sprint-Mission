import React from 'react';
import { getComments, getProduct } from '../api/api';

import { useParams, useSearchParams } from 'react-router-dom';
import SpecificItem from './SpecificItem';
import { useQueries } from '@tanstack/react-query';

const SpecificItemContainer = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams('limit=5');
  const commentsURL = `${id}/comments/?${searchParams.toString()}`;
  const results = useQueries({
    queries: [
      { queryKey: ['getProduct'], queryFn: () => getProduct(id) },
      { queryKey: ['getComments'], queryFn: () => getComments(commentsURL) },
    ],
  });

  if (results[0].isPending || results[1].isPending) {
    return <div>로딩중</div>;
  }

  return (
    <>
      {results[0].data && results[1].data && (
        <SpecificItem
          specificItem={results[0].data}
          inquiries={results[1].data}
        />
      )}
    </>
  );
};

export default SpecificItemContainer;

