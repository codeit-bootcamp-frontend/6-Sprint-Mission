// boards 페이지 자체에서 계속 사용되므로, types 파일 생성

// 포괄적으로 예상되는 항목들에 대한 타입을 명시하여 재사용성을 극대화
export interface Article {
  createdAt: Date;
  updatedAt: Date;
  likeCount: number;
  writer: { nickname: string; id: number };
  image: string;
  title: string;
  content: string;
  id: number;
}

// 게시글 데이터 fetch
export interface ArticleListData {
  totalCount: number;
  list: Article[];
}

// 게시글 필터 옵션
export type ArticleSortOption = 'recent' | 'like';