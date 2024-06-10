interface PostType {
  id: number;
  title: string;
  content: string;
  image: string | null;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
  };
}

export const bestPost: PostType[] = [
  {
    id: 2,
    title: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
    content:
      "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요? 알려주시면 감사합니당~ 사진도 같이 첨부해요",
    image:
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/28/1716791518729/mac.jpeg",
    likeCount: 5,
    createdAt: "2024-05-27T06:32:16.745Z",
    updatedAt: "2024-05-27T16:51:28.147Z",
    writer: {
      id: 28,
      nickname: "용섭이",
    },
  },
  {
    id: 3,
    title: "심심풀이 사주 봐드려요~",
    content: "심심풀이 사주 봐드려요~ 댓글 마구 남겨주세요!!",
    image:
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/28/1716791726725/saju.jpeg",
    likeCount: 4,
    createdAt: "2024-05-27T06:35:44.517Z",
    updatedAt: "2024-05-27T16:51:04.178Z",
    writer: {
      id: 28,
      nickname: "용섭이",
    },
  },
  {
    id: 4,
    title: "오늘 모각공하실 분 구합니다~",
    content:
      "오늘 모각공하실 분 구합니다~ 장소는 홍대입니다. 010-1234-1234 연락주시거나 댓글을 달아주세요",
    image: null,
    likeCount: 3,
    createdAt: "2024-05-27T07:17:29.557Z",
    updatedAt: "2024-05-27T16:50:28.178Z",
    writer: {
      id: 28,
      nickname: "용섭이",
    },
  },
];

export const posts: PostType[] = [
  {
    id: 6,
    title: "모각공 하실 분 구해요~",
    content: "모각공 하실 분 구해요~",
    image: null,
    likeCount: 0,
    createdAt: "2024-05-27T16:54:59.925Z",
    updatedAt: "2024-05-27T16:54:59.925Z",
    writer: {
      id: 33,
      nickname: "신승화",
    },
  },
  {
    id: 5,
    title: "혹시 오늘 도림천 같이 산책할 분 계신가요~?",
    content: "혹시 오늘 도림천 같이 산책할 분 계신가요~?",
    image: null,
    likeCount: 0,
    createdAt: "2024-05-27T16:54:39.090Z",
    updatedAt: "2024-05-27T16:54:39.090Z",
    writer: {
      id: 33,
      nickname: "신승화",
    },
  },
  {
    id: 4,
    title: "오늘 모각공하실 분 구합니다~",
    content:
      "오늘 모각공하실 분 구합니다~ 장소는 홍대입니다. 010-1234-1234 연락주시거나 댓글을 달아주세요",
    image: null,
    likeCount: 3,
    createdAt: "2024-05-27T07:17:29.557Z",
    updatedAt: "2024-05-27T16:50:28.178Z",
    writer: {
      id: 28,
      nickname: "용섭이",
    },
  },
  {
    id: 3,
    title: "심심풀이 사주 봐드려요~",
    content: "심심풀이 사주 봐드려요~ 댓글 마구 남겨주세요!!",
    image:
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/28/1716791726725/saju.jpeg",
    likeCount: 4,
    createdAt: "2024-05-27T06:35:44.517Z",
    updatedAt: "2024-05-27T16:51:04.178Z",
    writer: {
      id: 28,
      nickname: "용섭이",
    },
  },
  {
    id: 2,
    title: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
    content:
      "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요? 알려주시면 감사합니당~ 사진도 같이 첨부해요",
    image:
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/28/1716791518729/mac.jpeg",
    likeCount: 5,
    createdAt: "2024-05-27T06:32:16.745Z",
    updatedAt: "2024-05-27T16:51:28.147Z",
    writer: {
      id: 28,
      nickname: "용섭이",
    },
  },
];

export const articleComments = {
  list: [
    {
      id: 39,
      content: "asdasd",
      createdAt: "2024-06-05T01:13:18.067Z",
      updatedAt: "2024-06-05T01:13:18.067Z",
      writer: {
        id: 34,
        nickname: "Bermuda",
        image: null,
      },
    },
    {
      id: 38,
      content: "123",
      createdAt: "2024-06-05T01:12:38.038Z",
      updatedAt: "2024-06-05T01:12:38.038Z",
      writer: {
        id: 34,
        nickname: "Bermuda",
        image: null,
      },
    },
    {
      id: 37,
      content: "asd",
      createdAt: "2024-06-05T01:12:26.144Z",
      updatedAt: "2024-06-05T01:12:26.144Z",
      writer: {
        id: 34,
        nickname: "Bermuda",
        image: null,
      },
    },
  ],
  nextCursor: 37,
};
