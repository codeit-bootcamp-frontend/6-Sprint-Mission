// 이미지
import iconHeart from '@/assets/images/icon/ic_heart.svg';
import iconBack from '@/assets/images/icon/ic_back.svg';
import iconKebab from '@/assets/images/icon/ic_kebab.svg';
import emptyQuestion from '@/assets/images/items/question-empty.svg';

// API
import { getComment, getProductId } from '@/api/product.api';

import { ChangeEvent, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useParams } from 'react-router';

// import Comments from '../components/Items/Product/Comments';

import styles from '@/styles/Items/Item.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Comments from '@/components/products/Comments';
import Header from '@/components/navigation/Header';

interface Products {
	price: number;
	images: string;
	name: string;
	description: string;
	favoriteCount: number;
	tags: string[];
}

interface Comment {
	id: string;
	content: string;
	updatedAt: string;
	writer: {
		image: string;
		nickname: string;
	};
}

const Item: React.FC = () => {
	const { id } = useRouter().query;
	const [products, setProducts] = useState<Products | null>(null);
	const [comments, setComments] = useState<Comment[]>([]);
	const [question, setQuestion] = useState(false);

	const handleValidQuestion = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const { value } = e.target;
		setQuestion(!!value);
	};

	const handleLoad = async (itemId: string | string[]) => {
		if (itemId) {
			const item = await getProductId(itemId);
			const { list } = await getComment(itemId);

			setComments(list);
			setProducts(item);
		}
	};

	useEffect(() => {
		if (id === undefined) return;

		handleLoad(id);
	}, [id]);

	if (!products) return null;

	const price = products.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	const isQuestionEmpty = !comments.length;

	return (
		<>
			<Header />
			<article className={styles.item_container}>
				{/* 상품 */}
				<section className={styles.item_wrap}>
					<div className={styles.item_img}>
						<Image src={products.images[0]} alt={products.name} fill priority />
					</div>
					<div className={styles.item_top}>
						<span className={styles.item_name}>{products.name}</span>

						<button className={styles.item_kebab_btn}>
							<Image
								className={styles.item_kebab_img}
								src={iconKebab}
								alt='더보기'
								width={28}
								height={38}
							/>
						</button>
					</div>

					<div className={styles.item_price}>{price}원</div>

					<div className={styles.item_description_wrap}>
						<span className={styles.item_description_title}>상품 소개</span>
						<span className={styles.item_description}>{products.description}</span>
					</div>

					<div className={styles.item_tags_wrap}>
						<span className={styles.item_tags_title}>상품 태그</span>
						<div className={styles.item_tags}>
							{products.tags.map((tag) => (
								<span key={tag} className={styles.item_tag}>
									#{tag}
								</span>
							))}
						</div>
					</div>

					<div className={styles.item_heart}>
						<button className={styles.item_heart_btn}>
							<Image
								className={styles.item_heart_icon}
								src={iconHeart}
								alt='icon_heart'
								width={32}
								height={32}
							/>
							<span className={styles.item_heart_count}>{products.favoriteCount}</span>
						</button>
					</div>
				</section>

				{/* 질문 */}
				<section className={styles.question_wrap}>
					<form className={styles.question_form}>
						<label htmlFor='question_id' className={styles.question_title}>
							문의하기
						</label>
						<textarea
							id='question_id'
							className={styles.question_input}
							onInput={handleValidQuestion}
							placeholder='개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.'
						/>

						<div className={styles.question_btn_wrap}>
							<button className={styles.question_btn} type='submit' disabled={!question}>
								등록
							</button>
						</div>
					</form>

					<div className={styles.questions}>
						{isQuestionEmpty ? (
							<div className={styles.question_empty}>
								<Image
									className={styles.question_empty_img}
									src={emptyQuestion}
									alt='문의가 없음'
									width={200}
									height={200}
								/>
								<span className={styles.question_empty_text}>아직 문의가 없습니다.</span>
							</div>
						) : (
							<Comments productId={id} />
						)}
					</div>
				</section>

				<div className={styles.item_back}>
					<Link href='/items' className={styles.item_back_btn}>
						목록으로 돌아가기
						<Image
							className={styles.item_back_img}
							src={iconBack}
							alt='돌아가기'
							width={24}
							height={24}
						/>
					</Link>
				</div>
			</article>
		</>
	);
};

export default Item;
