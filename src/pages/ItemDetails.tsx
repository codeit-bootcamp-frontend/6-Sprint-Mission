import { Link, useLocation } from 'react-router-dom';

import {
  CommentInput,
  CommentList,
  ItemIntroduction,
  Navbar,
} from '../components';
import { backIcon } from '../images';

export default function ItemDetails() {
  const location = useLocation();
  const postedItems = location.state?.post;

  return (
    <>
      <Navbar />
      <main className="my-6">
        <div className="mx-auto flex flex-col px-4 sm:px-6 lg:w-[1200px] lg:px-0">
          <ItemIntroduction postedItems={postedItems} />
          <CommentInput productId={postedItems.id} />
          <CommentList productId={postedItems.id} />
          <div className="my-10 flex justify-center">
            <Link
              to="/items"
              className="flex justify-between gap-x-2 rounded-[40px] bg-[var(--btn-blue1)] px-10 py-3 text-white"
            >
              목록으로 돌아가기
              <img src={backIcon} alt="backicon" />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
