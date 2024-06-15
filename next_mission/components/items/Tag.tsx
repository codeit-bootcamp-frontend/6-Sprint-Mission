interface TagProps {
  tags: string[];
}

const Tag: React.FC<TagProps> = ({ tags }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex gap-2">
      {tags.map((tag, i) => (
        <div key={`tag-${i}`}>#{tag}</div>
      ))}
    </div>
  );
};

export default Tag;
