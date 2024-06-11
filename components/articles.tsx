import Image from 'next/image';
import Link from 'next/link';
import icSearch from '@/public/images/icons/ic_search.png';
import SelectBox from './select-box';
import { getArticles } from '@/lib/api/getArticles';
import { ArticleProps } from '@/types';
import { ChangeEvent, useState, useEffect } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { constants, SEARCH_TIME } from '../lib/constants';
import ArticlePreview from './article-preview';
import Pagination from './pagination';

interface Props {
  articlesServer: ArticleProps[];
  totalCount: number;
}

export default function Articles({ articlesServer, totalCount: initialTotalCount }: Props) {
  const [orderBy, setOrderby] = useState('recent');
  const [keyword, setKeyword] = useState('');
  const [articles, setArticles] = useState<ArticleProps[]>(articlesServer);
  const [pageNum, setPageNum] = useState(constants.PAGE_NUM);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const debouncedValue = useDebounce(keyword, SEARCH_TIME);

  const handleOrderClick = async (sortType: string): Promise<void> => {
    setOrderby(sortType);
    setPageNum(1);
    try {
      const { list: sortData, totalCount: updatedTotalCount } = await getArticles(
        1,
        constants.PAGE_SIZE,
        sortType,
        keyword
      );
      setArticles(sortData);
      setTotalCount(updatedTotalCount);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setKeyword(e.target.value);
    setPageNum(1);
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { list: sortData, totalCount: updatedTotalCount } = await getArticles(
          pageNum,
          constants.PAGE_SIZE,
          orderBy,
          debouncedValue
        );
        setArticles(sortData);
        setTotalCount(updatedTotalCount);
      } catch (error) {
        console.error(error);
      }
    };
    fetchArticles();
  }, [orderBy, pageNum, debouncedValue]);

  return (
    <div>
      <div className='relative flex justify-between gap-2 mb-6'>
        <Image src={icSearch} width={24} alt='돋보기' className='absolute z-10 top-2 left-3' />
        <input
          value={keyword}
          onChange={handleChange}
          type='text'
          placeholder='검색할 상품을 입력해주세요'
          className='placeholder-cool-gray400 w-[293px] h-[42px] pl-9 bg-cool-gray100 rounded-xl md:w-[560px] lg:w-[1054px] relative left-[1px] focus:border'
        />
        <SelectBox handleOrder={handleOrderClick} />
      </div>
      <div className='flex flex-col gap-6 min-h-[350px]'>
        {articles.map(article => (
          <Link key={article.id} href={`/boards/${article.id}`}>
            <ArticlePreview {...article} />
          </Link>
        ))}
      </div>
      <Pagination pageNum={pageNum} setPageNum={setPageNum} totalCount={totalCount} />
    </div>
  );
}
