import styled from "styled-components";

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

// 이 컴포넌트는 상품 등록 페이지의 TagInput 컴포넌트에서 구현했던 것과 디자인은 유사하지만, 기능적으로 큰 차이가 있기 때문에 별도의 컴포넌트로 분리했어요 (인터랙티브 기능의 유무).
// D.R.Y(Don't Repeat Yourself) 원칙에 따라 비슷한 컴포넌트를 재사용하는 것도 중요하지만, 여러 상황에 같은 컴포넌트를 적용하려다 보면 코드가 너무 복잡해지고 유지보수(maintainability)가 어려워지는 역효과가 있기 때문에 기능적 관심사의 명확한 분리가 필요해요.
// 코드를 컴포넌트화 할 때는 단순히 겉모습을 기준으로 하지 않고 코드의 범용성, 간결성, 가독성, 유지보수성 등을 고려해 적절한 밸런스를 찾는 것이 중요해요. 하나의 컴포넌트에 여러 책임을 지우는 것을 피하고 각 컴포넌트가 하나의 기능에 집중하도록 하는 것도 좋은 가이드라인이 될 수 있어요.

function TagDisplay({ tags }: { tags: string[] }) {
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
