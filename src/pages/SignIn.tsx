import React, { useState, useEffect } from 'react';
import './Sign.css';
import LogoImage from '../assets/images/title/title_img.svg';
import { validateEmail, validatePassword, errorMessages } from '../Utils/Validator';
import InputField from '../components/Sign/InputField';
import SocialSignIn from '../components/Sign/SocialSignIn';
import { PostSignIn } from '../api/Validator.api';
import { useNavigate } from 'react-router';
import {
	getAccessToken,
	setAccessToken,
	setRefreshToken,
	getRefreshToken,
} from '../Utils/TokenManager';
import { refreshAccessToken } from '../api/Auth.api';

const SignIn: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState({
		user_email: '',
		user_psw: '',
	});
	const navigate = useNavigate();

	useEffect(() => {
		// 페이지 로드 시 자동 로그인 시도
		const autoLogin = async () => {
			if (!getRefreshToken()) return;

			let accessToken = getAccessToken();
			if (!accessToken) {
				try {
					// 엑세스 토큰 갱신
					await refreshAccessToken();
					accessToken = getAccessToken();
				} catch (error) {
					console.error('Failed to refresh access token', error);
					return;
				}
			}

			if (accessToken) {
				navigate('/');
			}
		};
		autoLogin();
	}, [navigate]);

	// 입력 필드 검증 함수
	const validateField = (name: string, value: string) => {
		let error = '';
		switch (name) {
			case 'user_email':
				if (value === '') {
					error = errorMessages.email.empty;
				} else if (!validateEmail(value)) {
					error = errorMessages.email.invalid;
				}
				break;
			case 'user_psw':
				if (value === '') {
					error = errorMessages.password.empty;
				} else if (!validatePassword(value)) {
					error = errorMessages.password.invalid;
				}
				break;
			default:
				break;
		}
		setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
	};

	// 입력 필드 변경 처리 함수
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		switch (name) {
			case 'user_email':
				setEmail(value);
				break;
			case 'user_psw':
				setPassword(value);
				break;
			default:
				break;
		}
		validateField(name, value);
	};

	// 폼 제출 처리 함수
	const handleSubmit = async () => {
		validateField('user_email', email);
		validateField('user_psw', password);

		if (!errors.user_email && !errors.user_psw) {
			try {
				// 로그인 요청
				const data = await PostSignIn(email, password);
				console.log('Form submitted successfully', data);

				// 엑세스 토큰과 리프레시 토큰 저장
				setAccessToken(data.accessToken);
				setRefreshToken(data.refreshToken);

				navigate('/');
			} catch (error) {
				console.error('Form submission failed', error);
			}
		}
	};

	// 비밀번호 보이기/숨기기 토글 함수
	const togglePasswordVisibilityHandler = () => {
		setShowPassword(!showPassword);
	};

	return (
		<main className='sign_in_main'>
			<a className='logo_btn' href='/'>
				<img className='logo_img' src={LogoImage} alt='Logo' />
			</a>

			{/* 로그인 폼 */}
			<form className='sign_in_form'>
				<fieldset className='content'>
					<InputField
						id='user_email'
						label='이메일'
						type='email'
						value={email}
						placeholder='이메일을 입력해주세요'
						error={errors.user_email}
						onChange={handleInputChange}
					/>
					<InputField
						id='user_psw'
						label='비밀번호'
						type='password'
						value={password}
						placeholder='비밀번호를 입력해주세요'
						error={errors.user_psw}
						showPassword={showPassword}
						onChange={handleInputChange}
						togglePasswordVisibility={togglePasswordVisibilityHandler}
					/>
					<div>
						<button id='btn' className='submit_btn' type='button' onClick={handleSubmit}>
							로그인
						</button>
					</div>
				</fieldset>
			</form>

			{/* 소셜 로그인 */}
			<SocialSignIn />

			<div className='to_sign_up'>
				<p className='sign_up_text'>
					판다마켓이 처음이신가요?
					<a className='sign_up_btn' href='/signup'>
						회원가입
					</a>
				</p>
			</div>
		</main>
	);
};

export default SignIn;
