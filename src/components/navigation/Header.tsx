import title_img from '@/assets/images/title/title_img.svg';
import title_typo from '@/assets/images/title/title_typo.svg';

import styles from '@/styles/Nav/Header.module.css';
import Image from 'next/image';

import Link from 'next/link';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
	const nowSite = useRouter().pathname;

	const isItems = nowSite === '/AddItem' || nowSite === '/items' || nowSite === '/items/[id]';
	const isBoards = nowSite === '/boards' || nowSite === '/boards/[id]';

	return (
		<header className={styles.top_navigation}>
			<div className={styles.top_container}>
				<div className={styles.top_navigation_wrap}>
					<Link href='/' className='logo_btn'>
						<Image className={styles.logo_img} src={title_img} alt='Desktop_logo_img' width={152} height={60} />
					</Link>
				</div>

				<div className={styles.top_navigation_main}>
					<nav className={styles.main_nav}>
						<div className={styles.nav_menu}>
							{/* 자유게시판 링크 */}
							<Link href='/boards' className={`${styles.menu_community} ${isBoards ? `${styles.active}` : ''}`}>
								자유게시판
							</Link>

							{/* 중고마켓 링크 */}
							<Link href='/items' className={`${styles.menu_used_market} ${isItems ? `${styles.active}` : ''}`}>
								중고마켓
							</Link>
						</div>
					</nav>
				</div>

				<div className={styles.top_navigation_login}>
					<Link href='/signIn' className={`${styles.login_btn} blue`}>
						로그인
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;
