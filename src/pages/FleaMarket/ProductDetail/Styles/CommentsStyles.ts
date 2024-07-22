import { styled } from 'styled-components';
import { ReactComponent as DotsIcon } from '../../../../assets/dotsIcon.svg';

export const CommentUl = styled.ul`
  margin-bottom: 24px;
`;

export const CommentLi = styled.li`
  margin-bottom: 24px;
  border-bottom: 1px solid var(--bottom-line);
`;

export const Comment = styled.p`
  margin-bottom: 24px;
`;

export const CommentContent = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
`;

export const CommentImg = styled.img`
  width: 40px;
  height: 40px;
`;

export const CommentName = styled.h4`
  margin-bottom: 4px;
`;

export const CommentDate = styled.h5`
  color: var(--placeholder-color);
`;

export const SettingIcon = styled(DotsIcon)`
  cursor: pointer;
  margin-left: auto;

  @media ${(props) => props.theme.mobile} {
    display: inline;
    margin-left: auto;
  }
  @media ${(props) => props.theme.tablet} {
    display: inline;
    margin-left: auto;
  }
`;
