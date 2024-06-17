import './ProductList.module.css'
import HeartIcon from './images/ic_heart.png'
import SearchIcon from './images/ic_search.png'

function ProductListItem({ item }) {
  return (
    <div className="ProductListItem">
      <div>
        <img
          className="ProductListItem-img"
          src={item.images}
          alt={item.name}
        ></img>
      </div>
      <div className="Product-detail">
        <p className="Title">{item.name}</p>
        <p className="Price">{item.price}원</p>
        <div className="FavoriteCount">
          <img src={HeartIcon} alt="하트"></img>
          <p>{item.favoriteCount}</p>
        </div>
      </div>
    </div>
  )
}

function ProductList({ items }) {
  return (
    <div className="AllProducts">
      <div className="AllProductsMenu">
        <p className="AllProductsTitle">전체 상품</p>
        <div className="Search">
          <img className="SearchIcon" src={SearchIcon} alt="돋보기"></img>
          <input
            className="SearchInput"
            placeholder="검색할 상품을 입력해주세요"
          />
          <button className="ProductRegistrationButton">상품 등록하기</button>
        </div>
      </div>
      <div className="Grid-container">
        {items.map((item) => {
          return (
            <div className="Grid-item">
              <ProductListItem item={item} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProductList
