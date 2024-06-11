import iconHeart from '@/assets/images/icon/ic_heart.svg';
import notImage from '@/assets/images/items/question-empty.svg';

import styles from '@/styles/Items/product.module.css';
import Image from 'next/image';

import Link from 'next/link';

interface ProductType {
	id: string;
	images: string;
	name: string;
	price: number;
	favoriteCount: number;
}

interface ProductProps {
	product: ProductType;
	isAllSection: boolean;
}

const Product: React.FC<ProductProps> = ({ product, isAllSection }) => {
	const productImages = product.images[0].match('sprint-fe-project') ? product.images[0] : notImage;
	return (
		<Link href={`/items/${product.id}`} className={styles.product_wrap}>
			{isAllSection ? (
				<>
					<Image
						className={styles.all_img}
						src={productImages}
						alt={product.name}
						width={300}
						height={300}
					/>
					<div className={styles.all_name}>{product.name}</div>
					<div className={styles.all_price}>{product.price}원</div>
					<div className={styles.all_heart}>
						<Image
							className={styles.all_heart_icon}
							src={iconHeart}
							alt='icon_heart'
							width={25}
							height={25}
						/>
						<span className={styles.all_heart_count}>{product.favoriteCount}</span>
					</div>
				</>
			) : (
				<>
					<Image
						className={styles.best_img}
						src={productImages}
						alt={product.name}
						width={300}
						height={300}
					/>
					<div className={styles.best_name}>{product.name}</div>
					<div className={styles.best_price}>{product.price}원</div>
					<div className={styles.best_heart}>
						<Image
							className={styles.best_heart_icon}
							src={iconHeart}
							alt='icon_heart'
							width={25}
							height={25}
						/>
						<span className={styles.best_heart_count}>{product.favoriteCount}</span>
					</div>
				</>
			)}
		</Link>
	);
};

export default Product;
