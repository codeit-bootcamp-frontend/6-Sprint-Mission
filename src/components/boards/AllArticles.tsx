import styles from '@/styles/boards/AllArticles.module.css';
import ic_search from '@/assets/images/items/ic_search.svg';
import { useEffect, useState } from 'react';
import { getBoards, BoardType, GetBoardsResponse, GetBoardsQuery } from '@/api/boards.api';
import AllSection from './AllSection';
import Link from 'next/link';
import Dropdown from '@/components/common/DropDown';
import Image from 'next/image';
import { debounce } from 'lodash';

interface AllArticlesProps {
	initialBoards: BoardType[];
}

// 전체 게시글 컴포넌트
const AllArticles: React.FC<AllArticlesProps> = ({ initialBoards }) => {
	const [order, setOrder] = useState<string>('recent');
	const [search, setSearch] = useState<string>('');
	const [boards, setBoards] = useState<BoardType[]>(initialBoards);

	const [isLoading, setIsLoading] = useState(true);

	/**
	 * 게시글을 로드하는 함수
	 * @async handleLoad
	 * @param {GetBoardsQuery} query - 게시글 검색 조건
	 */
	const handleLoad = async (query: GetBoardsQuery) => {
		const { list }: GetBoardsResponse = await getBoards(query);
		setBoards(list || []);
	};

	const handleSearch = debounce((value: string) => {
		setSearch(value);
	}, 300);

	useEffect(() => {
		// 처음 렌더링 시에는 실행하지 않음
		if (isLoading) {
			setIsLoading(false);
			return;
		}

		handleLoad({ orderBy: order, search: search });
	}, [order, search]);

	return (
		<section className={styles.all_articles_wrap}>
			<div className={styles.all_articles_title_wrap}>
				<span className={styles.all_articles_title}>게시글</span>
				<Link className={styles.all_articles_title_btn} href='/addboard'>
					글쓰기
				</Link>
			</div>
			<div className={styles.all_articles_sort_wrap}>
				<div className={styles.all_search_icon}>
					<Image src={ic_search} alt='검색 아이콘' fill />
				</div>
				<input
					className={styles.all_articles_input}
					maxLength={50}
					type='text'
					onChange={(e) => handleSearch(e.target.value)}
					placeholder='검색할 상품을 입력해주세요'
				/>
				<Dropdown
					className={styles.all_articles_dropdown}
					name='order'
					value={order}
					onChange={(name, value) => setOrder(value)}
					options={[
						{ label: '최신순', value: 'recent' },
						{ label: '좋아요순', value: 'like' },
					]}
				/>
			</div>
			<div className={styles.all_articles_main}>
				{boards.map((board) => (
					<AllSection key={board.id} board={board} />
				))}
			</div>
		</section>
	);
};

export default AllArticles;
