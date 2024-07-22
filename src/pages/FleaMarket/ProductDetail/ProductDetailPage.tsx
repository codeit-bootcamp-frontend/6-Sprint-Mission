import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postComment } from '../../../api/api';
import Comments from './Comments';
import ProductDetailAccordian from './ProductDetailAccordian';
import { getProductDetail, getComments } from '../../../api/api';
import { ReactComponent as HeartIcon } from '../../../assets/heartIcon.svg';
import { ReactComponent as BackIcon } from '../../../assets/backIcon.svg';
import { ReactComponent as InquireImg } from '../../../assets/inquireImg.svg';
import * as S from './Styles/ProductDetailPageStyles';
import { Product } from '../../../types';

function ProductDetailPage() {
  const { productId } = useParams();
  const queryClient = useQueryClient();
  const [content, setContent] = useState('');
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const handleModification = () => {
    // TODO
  };

  const handleDelete = () => {
    // TODO
  };

  const accordionItems = [
    { label: '수정하기', onClick: handleModification },
    { label: '삭제하기', onClick: handleDelete },
  ];

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
  };

  const isFormValid = () => {
    return content.trim() !== '';
  };

  const { status, error, mutate } = useMutation({
    mutationFn: postComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['comments', productId] });
      setContent('');
      console.log(data, '댓글 달기 성공');
    },
    onError: (data) => {
      console.log(data, '댓글 달기 실패');
    },
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(productId, content);
    mutate({ productId, content });
  };

  const {
    status: productDetailStatus,
    error: productDetailError,
    data: productDetailData,
  } = useQuery({
    enabled: productId !== null,
    queryKey: ['productDetail', productId],
    queryFn: () => getProductDetail(productId),
    placeholderData: true,
    initialData: () => {
      const products = queryClient.getQueryData<Product>(['bestProducts']);
      const productDetail = products?.list?.find((p: { id: number | string }) => {
        return p.id === productId;
      });
      return productDetail;
    },
    staleTime: 60 * 1000,
  });

  const {
    status: commentsStatus,
    error: commentsError,
    data: commentsData,
  } = useQuery({
    enabled: productId !== null,
    queryKey: ['comments', productId],
    queryFn: () => getComments(productId),
    placeholderData: true,
    initialData: () => {
      const products = queryClient.getQueryData<Product>(['bestProducts']);
      const productDetail = products?.list?.find((p: { id: number | string }) => {
        return p.id === productId;
      });
      return productDetail;
    },
    staleTime: 60 * 1000,
  });

  if (productDetailStatus === 'error') return <h1>{productDetailError.message}</h1>;
  if (commentsStatus === 'error') return <h1>{commentsError.message}</h1>;

  return (
    <S.Wrapper>
      {/* 상품 상세 섹션 */}
      <S.ProductDetailContainer>
        {productDetailStatus === 'success' && (
          <>
            <S.ProductImage src={productDetailData.images} alt={productDetailData.name} />
            <S.DescriptionContainer>
              <div>
                <div>
                  <S.DescriptionBox>
                    <div>
                      <S.DescriptionTitle>{productDetailData.name}</S.DescriptionTitle>
                      <S.DescriptionPrice>{productDetailData.price}</S.DescriptionPrice>
                    </div>
                    <S.SettingIcon onClick={toggleAccordion} />
                    <ProductDetailAccordian items={accordionItems} isOpen={isAccordionOpen} />
                  </S.DescriptionBox>
                  <S.IntroduceContainer>
                    <S.Title>상품 소개</S.Title>
                    <p>{productDetailData.description}</p>
                  </S.IntroduceContainer>
                </div>
                <div>
                  <S.Title>상품 태그</S.Title>
                  <S.TagUl>
                    {productDetailData.tags?.map((tag: string, index: number) => (
                      <S.TagLi key={index}>#{tag}</S.TagLi>
                    ))}
                  </S.TagUl>
                </div>
              </div>
              <S.HeartContainer>
                <HeartIcon />
                <S.HeartCount>123</S.HeartCount>
              </S.HeartContainer>
            </S.DescriptionContainer>
          </>
        )}
      </S.ProductDetailContainer>

      {/* 댓글 섹션 */}
      <S.CommentsContainer>
        <S.InputTitle>문의하기</S.InputTitle>
        <S.Input
          onChange={handleChange}
          value={content}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        />
        <S.SubmitButton type="button" disabled={!isFormValid()} onClick={handleSubmit}>
          등록
        </S.SubmitButton>
        {commentsData.list?.length === 0 ? (
          <S.InquireContainer>
            <InquireImg />
            <S.InquireDescription>아직 문의가 없습니다.</S.InquireDescription>
          </S.InquireContainer>
        ) : (
          <Comments comments={commentsData?.list} />
        )}
        <S.StyledLink to="/items">
          <S.BackButton>
            목록으로 돌아가기
            <BackIcon />
          </S.BackButton>
        </S.StyledLink>
      </S.CommentsContainer>
    </S.Wrapper>
  );
}

export default ProductDetailPage;
