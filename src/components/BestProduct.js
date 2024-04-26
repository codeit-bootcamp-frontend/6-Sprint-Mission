import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getComments } from "../Api/getComments";
import NoneImg from "../assets/images/Img_inquiry_empty.png";
import BackIcon from "../assets/images/ic_back.png";
import styled from "styled-components";
import KebabIcon from "../assets/images/ic_kebab.png";
import { formatTimes } from "../utils/FormatTimes";

const CommentList = () => {
  const { productId } = useParams();
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();

  const handleReturnClick = () => {
    navigate("/items");
  };
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getComments(productId, 3);
        setComments(data.list);
        console.log(data);
      } catch (error) {
        console.error("댓글을 불러오는 데 실패했습니다:", error);
      }
    };
    fetchComments();
  }, [productId]);

  return (
    <>
      {!comments || comments.length === 0 ? (
        <NoneListContainer>
          <img src={NoneImg} alt="로딩이미지" width="200" />
          <NoneCommentText>아직 문의가 없습니다</NoneCommentText>
          <ReturnButton onClick={handleReturnClick}>
            목록으로 돌아가기
            <BackIconImg src={BackIcon} alt="돌아가기 아이콘" />
          </ReturnButton>
        </NoneListContainer>
      ) : (
        <>
          <CommentListContainer>
            {comments.map((comment, id) => (
              <div key={id}>
                <Content>
                  {comment.content}
                  <img src={KebabIcon} alt="Kebab Icon" />
                </Content>
                <ProfileWrapper>
                  <ProfileImg src={comment.writer.image} alt="작성자 이미지" />
                  <NicknameWrapper>
                    <NickName>{comment.writer.nickname}</NickName>
                    <UpdateAt>{formatTimes(comment.updatedAt)}</UpdateAt>
                  </NicknameWrapper>
                </ProfileWrapper>
                <Divider />
              </div>
            ))}
          </CommentListContainer>
          <ButtonWrapper>
            <ReturnButton onClick={handleReturnClick}>
              목록으로 돌아가기
              <BackIconImg src={BackIcon} alt="돌아가기 아이콘" />
            </ReturnButton>
          </ButtonWrapper>
        </>
      )}
    </>
  );
};

const NoneListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 30px 0; /* 수정된 부분 */
`;

const NoneCommentText = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: #9ca3af;
`;

const ReturnButton = styled.button`
  display: flex;
  width: 240px;
  height: 48px;
  border-radius: 40px;
  background: #3692ff;
  border: none;
  color: #fff;
  margin-top: 20px;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const BackIconImg = styled.img`
  width: 24px;
  height: 24px;
`;

const CommentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 30px 0; /* 수정된 부분 */
`;

const NickName = styled.div`
  font-family: Pretendard;
  font-size: 16px; /* 수정된 부분 */
  font-weight: 400;
  line-height: 16.71px;
  text-align: left;
  color: #4b5563;
`;

const ProfileImg = styled.img`
  width: auto;
  height: 40px;
`;

const Content = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;
  text-align: left;
  padding-bottom: 10px; /* 수정된 부분 */
  display: flex;
  justify-content: space-between;
`;

const UpdateAt = styled.div`
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  line-height: 14.32px;
  text-align: left;
  color: #9ca3af;
  padding-top: 5px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 30px 0; /* 수정된 부분 */
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;

const NicknameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e5e7eb;
  margin: 16px 0;
`;

export default CommentList;
