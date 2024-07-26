/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
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

function BestProductList({ products }: ProductsProps) {
  return (
    <div className="grid grid-cols-1 items-center justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <Link
          key={product.id}
          className="flex flex-col gap-2"
          to={`/items/${product.id}`}
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="lg:w-84 lg:h-84 h-72 w-72 rounded-lg"
          />
          <div className="text-sm">{product.name}</div>
          <div className="text-lg font-bold">
            {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
          </div>
          <div className="flex items-center gap-1">
            <img src={icon_favorite} className="h-4 w-4 cursor-pointer" />
            <div className="text-xs">{product.favoriteCount}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default BestProductList
