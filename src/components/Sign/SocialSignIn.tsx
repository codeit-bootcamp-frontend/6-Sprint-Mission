import React from 'react';
import GoogleIcon from '../../assets/images/icon/ic_google.svg';
import KakaoIcon from '../../assets/images/icon/ic_kakao.svg';

const SocialSignIn: React.FC = () => {
	return (
		<div className='social_sign_in'>
			<h1>간편 로그인하기</h1>
			<div className='social_btn'>
				<a href='https://www.google.com/' className='sign_in_google'>
					<img src={GoogleIcon} alt='구글 간편 로그인' />
				</a>
				<a href='https://www.kakaocorp.com/page/' className='sign_in_kakao'>
					<img src={KakaoIcon} alt='카카오 간편 로그인' />
				</a>
			</div>
		</div>
	);
};

export default SocialSignIn;
