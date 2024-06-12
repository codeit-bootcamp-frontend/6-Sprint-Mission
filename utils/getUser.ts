import axios from "@/utils/axios";

interface getUserData {
  id: number;
  nickname: string;
  image: null | string; // image가 null일 수 있다는 것을 명시합니다.
  createdAt: string;
  updatedAt: string;
}

interface getUserMessage {
  message: string;
}

export default async function getUser(token: string | null): Promise<getUserData | getUserMessage | null> {
  try {
    const res = await axios.get(`/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      return { message: "다시로그인" } as getUserMessage;
    } else if ( res.status === 200 ){
      return res.data as getUserData;
    }
    return null;
  } catch (error) {
    console.log(error);
    return { message: "에러" } as getUserMessage;
  }
}