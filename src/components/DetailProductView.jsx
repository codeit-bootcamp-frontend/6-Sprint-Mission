import favoriteIcon from "../assets/detail-favorite-icon.png";
import "./DetailProductView.css";

function DetailProductView({ productsItems }) {
  return (
    <section className='detail-section-top'>
      <div className='detail-contents-wrap'>
        <div style={productsItems.productImage} className='detail-img'></div>
        <ul className='detail-contents'>
          <li className='description-wrap'>
            <div className='description-title'>
              <p className='title'>{productsItems.productTitle}</p>
              <h1 className='price'>{productsItems.productPrice}</h1>
              <ul className='settings'>
                <li className='setting'></li>
                <li className='setting'></li>
                <li className='setting'></li>
              </ul>
            </div>
            <hr className='description-hr'></hr>
            <ul className='description-introduction'>
              <li className='introduction-desc'>
                <p className='introduction-title'>상품 소개</p>
                <p className='introduction-user-desc'>
                  {productsItems.productDescription}
                </p>
              </li>
              <li className='introduction-tags'>
                <p className='introduction-tags-title'>상품 태그</p>
                <ul className='tag-list'>
                  {productsItems.productTags.map((tag) => (
                    <li className='tag' key={tag}>
                      <span>#{tag}</span>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </li>
          <li className='favorite-count-wrap'>
            <div className='favorite-background'>
              <div className='favorite-wrap'>
                <div className='icon-wrap'>
                  <img
                    className='favorite-icon'
                    src={favoriteIcon}
                    alt='하트 아이콘'
                  />
                </div>
                <div className='count-wrap'>
                  <span className='favorite-count'>
                    {productsItems.favoriteCount}
                  </span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default DetailProductView;
