import styled from 'styled-components';

const TagsDisplaySection = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[50]};
  color: ${({ theme }) => theme.colors.gray[800]};
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 16px;
`;

type TagDisPlayProps = {
  tags: string[];
};

function TagDisplay({ tags }: TagDisPlayProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <TagsDisplaySection>
      {tags.map((tag, index) => (
        <Tag key={`tag-display-${index}`}>#{tag}</Tag>
      ))}
    </TagsDisplaySection>
  );
}

export default TagDisplay;
