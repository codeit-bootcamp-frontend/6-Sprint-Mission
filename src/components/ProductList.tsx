import { Link } from 'react-router-dom'
import icon_favorite from '../assets/icon_favorite.png'

type Products = {
  id: string
  name: string
  images: string[]
  price: number
  favoriteCount: number
}

type ProductsProps = {
  products: Products[]
}

function ProductList({ products }: ProductsProps) {
  return (
    <div className="mb-8 grid h-[45rem] grid-cols-2 items-center justify-items-center gap-4 md:h-auto md:grid-cols-3 lg:grid-cols-5">
      {products.map((product) => (
        <Link
          key={product.id}
          className="flex flex-col items-center justify-center gap-2"
          to={`/items/${product.id}`}
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-[168px] w-[168px] rounded-lg md:h-[221px] md:w-[221px]"
          />
          <div className="float-start flex w-full flex-col items-start justify-start">
            <div className="text-sm">{product.name}</div>
            <div className="text-lg font-bold">
              {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
            </div>
            <div className="flex items-center gap-1">
              <img src={icon_favorite} className="h-4 w-4 cursor-pointer" />
              <div className="text-xs">{product.favoriteCount}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ProductList
