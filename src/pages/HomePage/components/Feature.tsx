import styled from "styled-components";

interface FeatureProps {
  image: string;
  alt: string;
  featureName: string;
  title: string;
  description: string;
  direction?: "row" | "row-reverse";
}

const FeatureContainer = styled.div<{ direction?: "row" | "row-reverse" }>`
  margin-bottom: 64px;
  display: flex;
  flex-direction: column;

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    margin-bottom: 138px;
    flex-direction: ${(props) => props.direction || "row"};
    align-items: center;
    gap: 5%;
  }

  img {
    width: 100%;
    margin-bottom: 20px;

    @media ${({ theme }) => theme.mediaQuery.desktop} {
      width: 50%;
      margin-bottom: 0;
    }
  }
`;

const FeatureContent = styled.div`
  flex: 1;

  h2 {
    color: var(--blue);
    font-size: 16px;
    line-height: 22.4px;
    font-weight: 700;
    margin-bottom: 8px;

    @media ${({ theme }) => theme.mediaQuery.tablet} {
      font-size: 18px;
      line-height: 25.2px;
      margin-bottom: 12px;
    }
  }

  h1 {
    font-weight: 700;
    font-size: 24px;
    line-height: 33.6px;

    @media ${({ theme }) => theme.mediaQuery.tablet} {
      font-size: 32px;
      line-height: 44.8px;
    }

    @media ${({ theme }) => theme.mediaQuery.desktop} {
      font-size: 40px;
      line-height: 56px;
    }

    .break-on-desktop {
      display: none;

      @media ${({ theme }) => theme.mediaQuery.desktop} {
        display: inline;
      }
    }
  }

  p {
    font-weight: 500;
    font-size: 16px;
    line-height: 19.2px;
    letter-spacing: 0.08em;
    margin-top: 20px;

    @media ${({ theme }) => theme.mediaQuery.tablet} {
      font-size: 18px;
      line-height: 21.6px;
    }

    @media ${({ theme }) => theme.mediaQuery.desktop} {
      font-size: 24px;
      line-height: 28.8px;
      margin-top: 24px;
    }
  }
`;

const Feature: React.FC<FeatureProps> = ({
  image,
  alt,
  featureName,
  title,
  description,
  direction,
}) => {
  return (
    <FeatureContainer direction={direction}>
      <img src={image} alt={alt} />
      <FeatureContent>
        <h2>{featureName}</h2>
        <h1>{title}</h1>
        <p className="feature-description">{description}</p>
      </FeatureContent>
    </FeatureContainer>
  );
};

export default Feature;
