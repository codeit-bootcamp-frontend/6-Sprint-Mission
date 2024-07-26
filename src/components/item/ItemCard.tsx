import { useState } from 'react'
import icon_favorite from '../../assets/icon_favorite.png'
import icon_optionbar from '../../assets/icon_optionbar.png'
import { deleteProducts, patchProducts } from '../../api/api.ts'
import { useNavigate } from 'react-router-dom'

type ItemData = {
  id: number
  name: string
  images: string[]
  price: number
  favoriteCount: number
  tags: string[]
  description: string
  createdAt: string
  ownerId: number
}

type CommentData = {
  id: number
  content: string
  createdAt: string
  writer: {
    id: number
    image: string
    nickname: string
  }
}

type ItemCardProps = {
  item: ItemData
  comments: CommentData[]
  myId: number | null
}

export default function ItemCard({ item, comments, myId }: ItemCardProps) {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null)
  const [editingProduct, setEditingProduct] = useState<number | null>(null)
  const [editContent, setEditContent] = useState('')

  const navigate = useNavigate()

  const handleOptionClick = (productIndex: number) => {
    setSelectedProduct((prev) => (prev === productIndex ? null : productIndex))
  }

  const handleDeleteProduct = async (productId: number) => {
    try {
      if (item.id) {
        await deleteProducts(productId)
        navigate('/items')
      }
    } catch (error) {
      console.error('상품 삭제 실패', error)
    }
  }

  const handleEditProduct = (productId: number, currentContent: string) => {
    setSelectedProduct(null)
    setEditingProduct(productId)
    setEditContent(currentContent)
  }

  const handleSaveEdit = async (productId: number) => {
    try {
      if (item.id) {
        await patchProducts(productId, editContent)
        setSelectedProduct(null)
        setEditContent('')
      }
    } catch (error) {
      console.error('상품 수정 실패', error)
    }
  }

  return (
    <div className="mb-8 flex flex-col items-stretch justify-center md:flex-row md:justify-between md:gap-8">
      <img
        src={item.images[0]}
        alt={item.name}
        className="h-80 w-80 rounded-lg shadow-sm md:h-96 md:w-96"
      />
      <div className="flex flex-col gap-1 md:flex-1">
        <div className="my-4 flex items-center justify-between">
          <p className="text-2xl font-semibold">{item.name}</p>
          {myId === item.ownerId && (
            <img
              src={icon_optionbar}
              className="h-6 w-6 cursor-pointer"
              onClick={() => handleOptionClick(item.id)}
            />
          )}
        </div>
        <h1 className="text-3xl font-bold">
          {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
        </h1>
        <div className="my-4 border-b border-gray-300"></div>
        <p className="detail-description mb-2 text-sm font-bold">상품소개</p>
        <p className="description mb-4 text-base">{item.description}</p>
        <p className="mb-2 text-sm font-bold">상품 태그</p>
        <div className="mb-4 flex flex-wrap gap-4">
          {item.tags.map((tag, index) => (
            <div
              key={index}
              className="rounded-full bg-gray-50 px-4 py-2 text-gray-800"
            >
              #{tag}
            </div>
          ))}
        </div>
        <div className="favoriteCount flex w-fit cursor-pointer items-center gap-2 rounded-full border bg-white px-4 py-2 text-gray-800">
          <img src={icon_favorite} className="h-6 w-6" alt="Favorite" />
          {item.favoriteCount}
        </div>
        <div className="relative">
          {selectedProduct === item.id && (
            <div className="absolute -top-[20rem] right-0 z-50 flex flex-col gap-1 rounded-xl bg-white shadow-md">
              <div
                onClick={() => handleEditProduct(item.id, item.description)}
                className="w-full cursor-pointer rounded-t-xl px-4 py-2 hover:bg-gray-100"
              >
                수정하기
              </div>
              <div
                onClick={() => handleDeleteProduct(item.id)}
                className="w-full cursor-pointer rounded-b-xl px-4 py-2 hover:bg-gray-100"
              >
                삭제하기
              </div>
            </div>
          )}
          {editingProduct === item.id && (
            <div className="mt-4 flex flex-col">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="mb-4 w-full resize-none rounded-md border-none bg-coolgray-100 px-3 py-2 text-sm focus:outline-main"
                rows={5}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setEditingProduct(null)}
                  className="rounded bg-gray-300 p-2 text-xs text-white"
                >
                  취소
                </button>
                <button
                  onClick={() => handleSaveEdit(item.id)}
                  className="rounded bg-main p-2 text-xs text-white"
                >
                  수정 완료
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
