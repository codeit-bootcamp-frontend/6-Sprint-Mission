import { useState } from 'react'
import { deleteComments } from '../../api/api'
import { getUsersMe } from '../../api/users'

type CommentData = {
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

type ItemOptionBoxProps = {
  comments: CommentData
}

export default function ItemOptionBox({ comments }: ItemOptionBoxProps) {
  const [myId, setMyId] = useState<number | null>(null)
  const [selectedComment, setSelectedComment] = useState<number | null>(null)
  const [editingComment, setEditingComment] = useState<number | null>(null)
  const [editContent, setEditContent] = useState('')

  const fetchMyId = async () => {
    try {
      const data = await getUsersMe()
      console.log(data)
      setMyId(data.id)
    } catch (error) {
      console.error('사용자 id 가져오기 실패', error)
    }
  }

  const handleOptionClick = (commentIndex: number) => {
    setSelectedComment((prev) => (prev === commentIndex ? null : commentIndex))
  }

  const handleEditComment = (commentIndex: number, currentContent: string) => {
    setEditingComment(commentIndex)
    setEditContent(currentContent)
  }

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComments(commentId)
      fetchProductComments()
    } catch (error) {
      console.error('댓글 삭제 실패', error)
    }
  }

  return (
    <div>
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
              onClick={() => handleEditComment(index, comment.content)}
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
  )
}
function fetchProductComments() {
  throw new Error('Function not implemented.')
}
