import { Link } from 'react-router-dom';
import Logo from '../Logo';
import NavMain from './NavMain';
import '../../assets/styles/Root.css';
import './Header.css';
import React, { useEffect, useState } from 'react';
import { getAccessToken, getRefreshToken } from 'Utils/TokenManager';

import UserIcon from '../../assets/images/icon/ic_user.svg';
import { refreshAccessToken } from 'api/Auth.api';

interface HeaderProps {
	site?: string;
}

const Header: React.FC<HeaderProps> = ({ site = '' }) => {
	const [accessToken, setAccessToken] = useState<string | null>(getAccessToken());
	const refreshToken = getRefreshToken();

	useEffect(() => {
		const updateAccessToken = async () => {
			if (refreshToken && !accessToken) {
				await refreshAccessToken();
				setAccessToken(getAccessToken());
			}
		};

		updateAccessToken();
	}, [accessToken, refreshToken]);

	return (
		<header className='top_navigation'>
			<div className='top_container'>
				<div className='top_navigation_wrap'>
					<Logo />
				</div>
				<div className='top_navigation_main'>
					<NavMain site={site} />
				</div>
				<div className='top_navigation_login'>
					{accessToken ? (
						<img src={UserIcon} alt='user' />
					) : (
						<Link to={'/SignIn'} className='login_btn blue'>
							로그인
						</Link>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
