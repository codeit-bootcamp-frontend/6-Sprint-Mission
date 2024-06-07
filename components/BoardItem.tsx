import React from "react";

interface Article {
  id?: number;
  title?: string;
  content?: string;
}

interface BoardItemProps {
  article: Article;
}

const BoardItem: React.FC<BoardItemProps> = ({ article }) => {
  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
    </div>
  );
};

export default BoardItem;
