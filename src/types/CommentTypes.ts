export type Writer = {
  image: string;
  nickname: string;
};

export type Comments = {
  id: string;
  writer: Writer;
  content: string;
  updatedAt: string;
};

export interface CommentItemProps {
  item: Comments;
}
