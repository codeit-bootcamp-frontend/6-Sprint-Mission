import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  getProductsComments,
  getProductsDetail,
  postProductsComments,
  patchComments,
  deleteComments,
} from '../api/api'
import { CommentNotFound } from '../components'
import icon_optionbar from '../assets/icon_optionbar.png'
import icon_profile from '../assets/icon_profile.png'
import { displayTime } from '../utils/displayTime.ts'
import { getUsersMe } from '../api/users/index.ts'
import ItemCard from '../components/item/ItemCard.tsx'
import icon_back from '../assets/icon_back.png'

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
  map(
    arg0: (comment: any, index: any) => import('react/jsx-runtime').JSX.Element,
  ): import('react').ReactNode
  length: number
  content: string
  createdAt: string
  writer: {
    id: number
    image: string
    nickname: string
  }
}

function ItemsDetail() {
  const { id } = useParams<{ id: string }>()
  const [item, setItem] = useState<ItemData | null>(null)
  const [content, setContent] = useState('')
  const [comments, setComments] = useState<CommentData[]>([])
  const [myId, setMyId] = useState<number | null>(null)
  const [selectedComment, setSelectedComment] = useState<number | null>(null)
  const [editingComment, setEditingComment] = useState<number | null>(null)
  const [editContent, setEditContent] = useState('')

  const fetchProductDetail = async () => {
    try {
      if (!id) return
      const data = await getProductsDetail(id)
      setItem(data)
    } catch (error) {
      console.error('상품 가져오기 실패', error)
    }
  }

  const fetchProductComments = async () => {
    try {
      if (!id) return
      const data = await getProductsComments(id)
      setComments(data)
    } catch (error) {
      console.error('댓글 가져오기 실패', error)
    }
  }

  const fetchMyId = async () => {
    try {
      const data = await getUsersMe()
      console.log(data)
      setMyId(data.id)
    } catch (error) {
      console.error('사용자 id 가져오기 실패', error)
    }
  }

  useEffect(() => {
    fetchProductDetail()
    fetchProductComments()
    fetchMyId()
  }, [id])

  if (!item || !comments) {
    return <div>Loading...</div>
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const handleSubmitComment = async () => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      alert('로그인이 필요합니다.')
      return
    }

    try {
      if (!id) return

      await postProductsComments(id, content, token)
      setContent('')
      fetchProductComments()
    } catch (error) {
      console.error('댓글 등록 실패', error)
    }
  }

  const handleOptionClick = (commentIndex: number) => {
    setSelectedComment((prev) => (prev === commentIndex ? null : commentIndex))
  }

  const handleEditComment = (commentIndex: number, currentContent: string) => {
    setEditingComment(commentIndex)
    setEditContent(currentContent)
  }

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComments(commentId)
      fetchProductComments()
    } catch (error) {
      console.error('댓글 삭제 실패', error)
    }
  }

  const handleSaveEdit = async (commentId: number) => {
    try {
      await patchComments(commentId, editContent)
      setEditingComment(null)
      setEditContent('')
      fetchProductComments()
    } catch (error) {
      console.error('댓글 수정 실패', error)
    }
  }

  return (
    <div className="container mx-auto my-32 flex max-w-[1200px] flex-col items-stretch justify-center px-8">
      <ItemCard item={item} myId={myId} comments={[]} />
      <div className="mb-8 flex flex-col">
        <div className="mb-4 border-b border-gray-300"></div>
        <h5 className="mb-4 text-lg font-semibold">문의하기</h5>
        <textarea
          value={content}
          onChange={handleInputChange}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          className="mb-4 w-full resize-none rounded-md border-none bg-coolgray-100 px-3 py-2 text-sm focus:outline-main"
          rows={5}
        />
        <button
          onClick={handleSubmitComment}
          className="self-end rounded bg-main px-6 py-2 text-white disabled:bg-gray-400"
          disabled={!content}
        >
          등록
        </button>
      </div>
      {comments.length === 0 ? (
        <CommentNotFound />
      ) : (
        <div className="flex flex-col gap-4">
          {comments.map((comment, index) => (
            <div key={index}>
              <div className="relative flex items-center justify-between">
                {editingComment === index ? (
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="mb-4 w-full resize-none rounded-md border-none bg-coolgray-100 px-3 py-2 text-sm focus:outline-main"
                  />
                ) : (
                  <p>{comment.content}</p>
                )}
                {myId === comment.writer.id && (
                  <img
                    src={icon_optionbar}
                    className="h-6 w-6 cursor-pointer"
                    onClick={() => handleOptionClick(index)}
                  />
                )}

                {selectedComment === index &&
                  editingComment !== index &&
                  myId === comment.writer.id && (
                    <div className="absolute right-0 top-5 z-50 flex flex-col gap-1 rounded-xl bg-white shadow-md">
                      <div
                        onClick={() =>
                          handleEditComment(index, comment.content)
                        }
                        className="w-full cursor-pointer rounded-t-xl px-4 py-2 hover:bg-gray-100"
                      >
                        수정하기
                      </div>
                      <div
                        onClick={() => handleDeleteComment(comment.id)}
                        className="w-full cursor-pointer rounded-b-xl px-4 py-2 hover:bg-gray-100"
                      >
                        삭제하기
                      </div>
                    </div>
                  )}
              </div>
              {editingComment === index && (
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setEditingComment(null)
                      setEditContent('')
                    }}
                    className="rounded bg-gray-300 p-2 text-xs text-white"
                  >
                    취소
                  </button>
                  <button
                    onClick={() => handleSaveEdit(comment.id)}
                    className="rounded bg-main p-2 text-xs text-white"
                  >
                    수정 완료
                  </button>
                </div>
              )}
              <div className="my-2 flex gap-4">
                <img
                  src={comment.writer.image || icon_profile}
                  alt="프로필"
                  width={42}
                  height={42}
                />
                <div className="flex flex-col">
                  <p className="text-[14px] text-gray-600">
                    {comment.writer.nickname}
                  </p>
                  <p className="text-[14px] text-gray-400">
                    {displayTime(comment.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Link
        to="/items"
        className="m-[3rem_auto_0] flex w-[240px] items-center justify-center gap-2 rounded-[5rem] bg-main px-4 py-3 text-[18px] text-white hover:bg-btn-2"
      >
        목록으로 돌아가기
        <img src={icon_back} alt="돌아가기" width={24} height={24} />
      </Link>
    </div>
  )
}

export default ItemsDetail
