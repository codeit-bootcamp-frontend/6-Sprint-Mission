import instance from './Axios';

export const PostSignUp = async (
	email: string,
	nickname: string,
	password: string,
	passwordConfirmation: string,
) => {
	try {
		const response = await instance.post('/auth/signUp', {
			email,
			nickname,
			password,
			passwordConfirmation,
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const PostSignIn = async (email: string, password: string) => {
	try {
		const response = await instance.post('/auth/signIn', {
			email,
			password,
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};
