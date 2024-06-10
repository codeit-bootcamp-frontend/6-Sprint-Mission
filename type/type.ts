export interface Post {
  id: number;
  title: string;
  content: string;
  image: string | null;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
  writer: {
    id: number;
    nickname: string;
  };
}

export interface PostsProps {
  key: React.Key;
  post: Post;
}

export interface BestPostsProps {
  key: React.Key;
  post: Post;
}