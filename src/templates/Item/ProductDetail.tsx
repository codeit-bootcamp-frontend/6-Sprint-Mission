import { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "components/Button";
import Input from "components/Input";
import { Tag, TagList } from "components/Tag";
import { ImageCard } from "components/Card/ImageCard";
import Comment from "components/Comment";
import Loading from "components/Loading";
import CommentType from "models/comment";
import { addCommas } from "utils/commas";
import kebabIcon from "assets/icon/ic_kebab.svg";
import inquiryEmpty from "assets/img/Img_inquiry_empty.svg";
import backIcon from "assets/icon/ic_back.svg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, getProductDetail } from "api/product";
import { getCommentList, postComment } from "api/comment";
import { useAtomValue } from "jotai";
import { userInfoAtom } from "contexts/atom/user";
import Dropdown from "components/Dropdown";
import * as S from "./ProductDetail.style";

export default function ProductDetail() {
  const params = useParams();

  if (!params.productId) return null;

  return (
    <>
      <ProductDetailInfo productId={params.productId} />
      <InquiryComments productId={params.productId} />
    </>
  );
}

function ProductDetailInfo({ productId }: { productId: string }) {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["product-detail"],
    queryFn: () => getProductDetail(productId),
  });
  const deleteMutation = useMutation({
    mutationFn: () => deleteProduct(productId),
    onSuccess: () => {
      navigate("/items");
    },
  });
  const userInfo = useAtomValue(userInfoAtom);

  const handleDelete = () => {
    const confirm = window.confirm("게시글을 삭제하시겠습니까?");

    if (confirm) deleteMutation.mutate();
  };

  if (isLoading) return <Loading />;

  return (
    <S.ProductDetailInfoContainer>
      <ImageCard src={data?.images[0]} alt="product-img" />
      <S.InfoContainer>
        <S.InfoTop>
          <h1 className="product-name">{data?.name}</h1>
          {userInfo && userInfo.id === data.ownerId ? (
            <Dropdown.Root>
              <Dropdown.Toggle>
                <img src={kebabIcon} alt="kebab" />
              </Dropdown.Toggle>

              <Dropdown.List>
                <Dropdown.Item
                  onClick={() => navigate(`/edititem/${productId}`)}
                >
                  수정하기
                </Dropdown.Item>
                <Dropdown.Item onClick={handleDelete}>삭제하기</Dropdown.Item>
              </Dropdown.List>
            </Dropdown.Root>
          ) : (
            <div />
          )}

          <span className="price">{addCommas(data?.price as number)}원</span>
        </S.InfoTop>

        <S.InfoBottom>
          <h2>상품 소개</h2>
          <p>{data?.description}</p>
          <h2>상품 태그</h2>
          <TagList>
            {data?.tags.map((tag: string) => (
              <Tag.Product key={tag}>{`#${tag}`}</Tag.Product>
            ))}
          </TagList>
        </S.InfoBottom>

        <S.LikeBtnBox>
          <Button.Like>{data?.favoriteCount}</Button.Like>
        </S.LikeBtnBox>
      </S.InfoContainer>
    </S.ProductDetailInfoContainer>
  );
}

const PRIVACY_POLICY_NOTICE =
  "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.";

function InquiryComments({ productId }: { productId: string }) {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["comment-list"],
    queryFn: () => getCommentList({ productId }),
  });
  const submitMutation = useMutation({
    mutationFn: (content: string) => postComment({ productId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment-list"] });
    },
  });

  const onTextChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    submitMutation.mutate(text);
  };

  if (isLoading) return <Loading />;

  return (
    <S.InquiryTemplateContainer>
      <h1 className="title">문의하기</h1>
      <form>
        <Input.Form.Textarea
          name="textarea"
          height={104}
          value={text}
          onChange={onTextChange}
          placeholder={PRIVACY_POLICY_NOTICE}
        />
        <S.SubmitBtnBox>
          <Button.Submit isActive={!!text} handleSubmit={handleSubmit}>
            등록
          </Button.Submit>
        </S.SubmitBtnBox>
      </form>
      {data.list.length > 0 ? (
        <S.CommentListContainer>
          {data.list.map((comment: CommentType) => (
            <Comment key={comment.id} data={comment} />
          ))}
        </S.CommentListContainer>
      ) : (
        <S.EmptyContainer>
          <img src={inquiryEmpty} alt="inquiry-img" />
          <span>아직 문의가 없습니다.</span>
        </S.EmptyContainer>
      )}
      <S.BackButtonBox>
        <Button.Link to="/items" radius={40}>
          <S.ButtonContent>
            <span>목록으로 돌아가기</span>
            <img src={backIcon} alt="back-icon" />
          </S.ButtonContent>
        </Button.Link>
      </S.BackButtonBox>
    </S.InquiryTemplateContainer>
  );
}
