import React, { useState, useEffect } from 'react';
import './Sign.css';
import LogoImage from '../assets/images/title/title_img.svg';
import {
	validateEmail,
	validateNickname,
	validatePassword,
	errorMessages,
	validatePasswordMatch,
} from '../Utils/Validator';
import InputField from '../components/Sign/InputField';
import SocialSignIn from '../components/Sign/SocialSignIn';
import { PostSignUp } from '../api/Validator.api';
import { useNavigate } from 'react-router';
import { getAccessToken } from 'Utils/TokenManager';

const SignUp: React.FC = () => {
	const [email, setEmail] = useState('');
	const [nickname, setNickname] = useState('');
	const [password, setPassword] = useState('');
	const [passwordCheck, setPasswordCheck] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordCheck, setShowPasswordCheck] = useState(false);
	const [errors, setErrors] = useState({
		user_email: '',
		user_nickname: '',
		user_psw: '',
		user_psw_chk: '',
	});
	const [isFormValid, setIsFormValid] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const accessToken = getAccessToken();

		if (accessToken) {
			navigate('/');
		}
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
			case 'user_nickname':
				if (value === '') {
					error = errorMessages.nickname.empty;
				} else if (!validateNickname(value)) {
					error = errorMessages.nickname.invalid;
				}
				break;
			case 'user_psw':
				if (value === '') {
					error = errorMessages.password.empty;
				} else if (!validatePassword(value)) {
					error = errorMessages.password.invalid;
				}
				break;
			case 'user_psw_chk':
				if (!validatePasswordMatch(password, value)) {
					error = errorMessages.password.match;
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
			case 'user_nickname':
				setNickname(value);
				break;
			case 'user_psw':
				setPassword(value);
				break;
			case 'user_psw_chk':
				setPasswordCheck(value);
				break;
			default:
				break;
		}
		validateField(name, value);
	};

	// 폼 유효성 검사
	useEffect(() => {
		const emailValid = email !== '' && validateEmail(email);
		const nicknameValid = nickname !== '' && validateNickname(nickname);
		const passwordValid = password !== '' && validatePassword(password);
		const passwordCheckValid = validatePasswordMatch(password, passwordCheck);

		const allValid = emailValid && nicknameValid && passwordValid && passwordCheckValid;
		setIsFormValid(allValid);
	}, [email, nickname, password, passwordCheck]);

	// 폼 제출 처리 함수
	const handleSubmit = async () => {
		validateField('user_email', email);
		validateField('user_nickname', nickname);
		validateField('user_psw', password);
		validateField('user_psw_chk', passwordCheck);

		if (isFormValid) {
			try {
				const data = await PostSignUp(email, nickname, password, passwordCheck);
				console.log('Form submitted successfully', data);

				navigate('/SignIn');
			} catch (error) {
				console.error('Form submission failed', error);
			}
		}
	};

	// 비밀번호 보이기/숨기기 토글 함수
	const togglePasswordVisibilityHandler = () => {
		setShowPassword(!showPassword);
	};

	const togglePasswordCheckVisibilityHandler = () => {
		setShowPasswordCheck(!showPasswordCheck);
	};

	return (
		<main className='sign_up_main'>
			<a className='logo_btn' href='/'>
				<img className='logo_img' src={LogoImage} alt='Logo' />
			</a>

			{/* 회원가입 폼 */}
			<form className='sign_up_form'>
				<fieldset className='sign_up_content'>
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
						id='user_nickname'
						label='닉네임'
						type='text'
						value={nickname}
						placeholder='닉네임을 입력해주세요'
						error={errors.user_nickname}
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
					<InputField
						id='user_psw_chk'
						label='비밀번호 확인'
						type='password'
						value={passwordCheck}
						placeholder='비밀번호를 다시 한 번 입력해주세요'
						error={errors.user_psw_chk}
						showPassword={showPasswordCheck}
						onChange={handleInputChange}
						togglePasswordVisibility={togglePasswordCheckVisibilityHandler}
					/>
					<div>
						{/* 회원가입 버튼 */}
						<button
							id='btn'
							className='submit_btn'
							type='button'
							onClick={handleSubmit}
							disabled={!isFormValid}>
							회원가입
						</button>
					</div>
				</fieldset>

				{/* 소셜 로그인 */}
				<SocialSignIn />

				<div className='to_sign_in'>
					<p className='sign_in_text'>
						이미 회원이신가요?
						<a className='sign_in_btn' href='/signin'>
							로그인
						</a>
					</p>
				</div>
			</form>
		</main>
	);
};

export default SignUp;
