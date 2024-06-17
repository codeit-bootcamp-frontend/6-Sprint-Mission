import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import Container from '@/components/Container';
import CommentsList from '@/components/CommentsList';
import Button from '@/components/Button';

import { IArticle, IArticleComment } from '@/interface/interface';
import { loadArticlesDetail, loadCommentsList } from '@/pages/api/apis';
import { formatDate } from '@/utils/utils';

import ICON_KEBAB from '@/public/icon-kebab.svg';
import IMG_PROFILE from '@/public/profile.svg';
import ICON_HEART from '@/public/icon-heart.svg';
import ICON_BACK from '@/public/icon-back.svg';
import AddComment from '@/components/AddComment';

export default function BoardDetail() {
  const router = useRouter();
  const [article, setArticle] = useState<IArticle>();
  const [comments, setComments] = useState<IArticleComment[]>([]);

  const fetchArticleDetail = async () => {
    if (typeof router.query.id === 'string') {
      const articleDetail: IArticle = await loadArticlesDetail(router.query.id);
      setArticle(articleDetail);
    }
  };

  const fetchCommentsList = async () => {
    if (typeof router.query.id === 'string') {
      const commentsList: IArticleComment[] = await loadCommentsList(
        router.query.id,
      );
      setComments(commentsList);
    }
  };

  useEffect(() => {
    fetchArticleDetail();
    fetchCommentsList();
  }, [router.query.id]);

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  return (
    <>
      <Head>
        <title>{`${article?.title}`}</title>
      </Head>
      <div className="mt-[100px] flex items-center justify-center">
        <Container>
          <div className="border-b pb-[20px]">
            <div className="flex justify-between mb-[20px]">
              <h1 className="text-[20px] text-[#1f2937] font-bold">
                {article?.title}
              </h1>
              <Image
                className="cursor-pointer"
                src={ICON_KEBAB}
                alt="더보기 아이콘"
              />
            </div>
            <div className="flex items-center gap-[10px]">
              <Image src={IMG_PROFILE} alt="프로필 이미지" />
              <p className="text-[#4B5563] text-[14px]">
                {article?.writer.nickname}
              </p>
              <p className="text-[#9CA3AF] text-[12px]">
                {formatDate(article ? article?.updatedAt : '')}
              </p>
              <div className="bg-[#E5E7EB] w-[1px] h-[24px]"></div>
              <Image src={ICON_HEART} alt="좋아요 아이콘" />
              <p className="text-[14px] text-[#6B7280]">{article?.likeCount}</p>
            </div>
          </div>
          <div className="py-[20px]">{article?.content}</div>
          <div>
            <AddComment
              articleId={
                typeof router.query.id === 'string' ? router.query.id : ''
              }
              onCommentAdded={fetchCommentsList}
            />
          </div>
          <div>
            <CommentsList commentsList={comments} />
          </div>
          <div>
            <div className="w-[240px] h-[48px] rounded-[40px] overflow-hidden mx-auto mt-[40px] mb-[40px]">
              <Link href="/board">
                <Button>목록으로 돌아가기</Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
