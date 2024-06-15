import { useRouter } from 'next/router';

const BoardsDynamicPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <div>{id}번 게시글 페이지입니다.</div>;
};

export default BoardsDynamicPage;
