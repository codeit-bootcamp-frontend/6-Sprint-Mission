import Image from 'next/image';
import Link from 'next/link';

import { List } from '@/app/apis/getArticle';
import heartIcon from '@/app/assets/images/ic_heart.svg';
import bestBadge from '@/app/assets/images/img_badgez.svg';
import { formatDate } from '@/app/utils/formateDate';

import BestListCss from './BestList.module.css';

interface Props {
  bestList: List[];
}

export default function BestList({ bestList }: Props) {
  return (
    <div className={BestListCss.bestListWrapper}>
      <div className={BestListCss.bestCardsWrapper}>
        {bestList.map((article) => (
          <div key={article.id} className={BestListCss.bestListCard}>
            <Link
              href={`/boards/${article.id}`}
              className={BestListCss.bestListLink}
            >
              <div className={BestListCss.bestListContainer}>
                <div className={BestListCss.bestBadge}>
                  <Image src={bestBadge} alt="Best Badge" />
                </div>
                <div className={BestListCss.bestListItems}>
                  <div className={BestListCss.bestTitle}>{article.title}</div>
                  {article.image && (
                    <div className={BestListCss.bestImageWrapper}>
                      <div className={BestListCss.bestImage}>
                        <Image
                          src={article.image}
                          alt="bestImage"
                          width={72}
                          height={72}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className={BestListCss.InfoWrapper}>
                  <div className={BestListCss.bestInfo}>
                    <div className={BestListCss.bestWriter}>
                      {article.writer.nickname}
                    </div>
                    <div className={BestListCss.bestLike}>
                      <Image
                        width={16}
                        height={16}
                        src={heartIcon}
                        alt="하트아이콘"
                      />
                      {article.likeCount}
                    </div>
                  </div>
                  <div className={BestListCss.bestDate}>
                    {formatDate(article.createdAt)}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
