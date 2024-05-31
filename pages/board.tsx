import Header from '@/components/Header';
import SectionTitle from '@/components/SectionTitle';
import style from '@/styles/Board.module.css';
import axios from '@/lib/axios';
import { Article } from '@/types/Article.types';
import BestCardList from '@/components/BestCardList';

type props = {
  bestArticles: Article[];
};

export async function getStaticProps() {
  const res = await axios.get('/articles?page=1&pageSize=3&orderBy=like');
  const bestArticles = res.data.list;

  return {
    props: {
      bestArticles,
    },
  };
}

export default function Board({ bestArticles }: props) {
  console.log(bestArticles);
  return (
    <>
      <Header />
      <main className={style.main}>
        <section className={style.sectionBest}>
          <SectionTitle text="베스트 게시글" />
          <BestCardList articles={bestArticles} />
        </section>
        <section className={style.sectionBoard}>
          <SectionTitle text="게시글" />
        </section>
      </main>
    </>
  );
}
