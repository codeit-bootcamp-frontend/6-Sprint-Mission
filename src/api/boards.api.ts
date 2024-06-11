import instance from '@/api/Axios';

export interface GetBoardsQuery {
	orderBy?: string;
	page?: number;
	pageSize?: number;
	search?: string;
}

interface WriterType {
	id: number;
	nickname: string;
	image?: string | null;
}

export interface BoardType {
	id: number;
	title?: string;
	content: string;
	image: string | null;
	likeCount: number;
	createdAt: string;
	updatedAt: string;
	writer: WriterType;
	isLiked?: boolean;
}

export interface CommentType {
	id: number;
	content: string;
	createdAt: string;
	updatedAt: string;
	writer: WriterType;
}

export interface GetBoardsResponse {
	list: BoardType[];
}

export async function getBoards({
	orderBy = 'recent',
	page = 1,
	pageSize = 10,
	search = '',
}: GetBoardsQuery): Promise<GetBoardsResponse> {
	const query = search
		? `orderBy=${orderBy}&page=${page}&pageSize=${pageSize}&keyword=${search}`
		: `orderBy=${orderBy}&page=${page}&pageSize=${pageSize}`;

	try {
		const response = await instance.get(`/articles?${query}`);
		return response.data as GetBoardsResponse;
	} catch (error) {
		console.error('API 오류 \n', error);
		return { list: [] };
	}
}

export async function getBoardId(boardId: string | string[]): Promise<BoardType> {
	try {
		const response = await instance.get(`/articles/${boardId}`);
		return response.data;
	} catch (error) {
		console.error('API 오류 \n', error);
		return {} as BoardType;
	}
}

export async function getBoardComments(boardId: string | string[]): Promise<CommentType[]> {
	try {
		const response = await instance.get(`/articles/${boardId}/comments?limit=3`);
		return response.data.list;
	} catch (error) {
		console.error('API 오류 \n', error);
		return [] as CommentType[];
	}
}
