import logo from '../../assets/images/logo/logo.svg';
import googleIcon from '../../assets/images/icons/icon_google.svg';
import kakaoIcon from '../../assets/images/icons/icon_kakao.svg';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';

type IFormInput = {
  email: string;
  password: string;
};

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<IFormInput>({
    mode: 'onChange',
  });

  // @TODO: POST 요청 구현
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <div className="max-w-[640px] m-auto md:px-14 px-4">
      <img src={logo} alt="로고" className="md:w-96 w-48 m-auto mb-14" />
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
        <label className="font-bold">
          이메일
          <input
            {...register('email', {
              required: '이메일은 필수 입력 항목입니다.',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: '잘못된 이메일입니다.',
              },
            })}
            type="email"
            className={`input ${errors.email && 'input-error'}`}
          />
          {errors.email && <span className="error-message">{errors.email.message}</span>}
        </label>
        <label className="font-bold">
          비밀번호
          <input
            {...register('password', {
              required: '비밀번호는 필수 입력 항목입니다.',
              minLength: {
                value: 8,
                message: '비밀번호를 8자 이상 입력해주세요',
              },
            })}
            type="password"
            className={`input ${errors.password && 'input-error'}`}
          />
          {errors.password && <span className="error-message">{errors.password.message}</span>}
        </label>
        <input
          type="submit"
          value="로그인"
          disabled={!isValid || isSubmitting}
          className={`btn ${!isValid && 'btn-disabled'}`}
        />
      </form>
      <div className="flex justify-between items-center bg-[#E6F2FF] inner-p my-6 rounded">
        <p className="font-medium">간편 로그인하기</p>
        <div className="flex gap-2.5">
          <Link to="/" aria-label="구글로 간편 로그인하기">
            <img src={googleIcon} alt="구글 아이콘" />
          </Link>
          <Link to="/" aria-label="카카오톡으로 간편 로그인하기">
            <img src={kakaoIcon} alt="카카오 아이콘" />
          </Link>
        </div>
      </div>
      <p className="text-center">
        판다마켓이 처음이신가요?
        <Link to="/signup" className="text-primary-100 border-b">
          회원가입
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
