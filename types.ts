export interface ArticlesList {
  id: number;
  title: string;
  content: string;
  image: null | string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
}

export interface Writer {
  id: number;
  nickname: string;
}

export interface BoardsProps {
  PostsData: ArticlesList[];
}

export interface DropdownProps {
  onChange: (order: "recent" | "like") => void;
}

export interface PostsProps {
  posts: ArticlesList;
}

export interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface getUserMessage {
  message: string;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  image: string | null;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: ArticleWriter;
  isLiked: boolean;
}

export interface ArticleWriter {
  id: number;
  nickname: string;
}

export interface getUserData {
  id: number;
  nickname: string;
  image: null | string;
  createdAt: string;
  updatedAt: string;
}

export interface Comments {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: CommentsWriter;
}

export interface CommentsWriter {
  id: number;
  nickname: string;
  image: string | null;
}

export interface PostViewProps {
  article: Article | null;
  comments: Comments[];
}

export interface CommentProps {
  comment: Comments;
  isEdit: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onCancelEdit: () => void;
  onSaveEdit: (id: number, newContent: string) => void;
}

export interface postProps {
  email: string;
  password: string;
}

export interface LoginData {
  user: UserProps;
  accessToken: string;
  refreshToken: string;
}

export interface UserProps {
  id: number;
  nickname: string;
  image: null;
  createdAt: string;
  updatedAt: string;
  email: string;
}

export interface WriterType {
  nickname: string;
  image: string | null; 
}

export interface CommentType {
  id: number;
  content: string;
  createdAt: string;
  writer: WriterType;
}
