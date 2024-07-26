import React, { useState } from 'react'
import FileInput from '../components/FileInput'
import { useNavigate } from 'react-router-dom'
import { postImages, postArticles } from '../api/api'

const INITIAL_VALUES = {
  title: '',
  content: '',
  image: null as File | null,
}

type AddPostProps = {
  initialValues?: typeof INITIAL_VALUES
  initialPreview?: string
}

type PostData = {
  title: string
  content: string
  image?: string
}

function AddBoards({
  initialValues = INITIAL_VALUES,
  initialPreview,
}: AddPostProps) {
  const [values, setValues] = useState<typeof INITIAL_VALUES>(initialValues)
  const navigate = useNavigate()

  const isDisabled = !values.title || !values.content

  const handleChange = (name: string, value: any) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    handleChange(name, value)
  }

  const handleFormSubmit = async () => {
    const token = localStorage.getItem('accessToken')

    try {
      let imageUrl = ''
      const formData = new FormData()
      if (values.image) {
        formData.append('image', values.image)

        const imageResponse = await postImages(formData)
        if (imageResponse) {
          imageUrl = imageResponse
        }
      }

      const postData: PostData = {
        title: values.title,
        content: values.content,
      }

      if (imageUrl) {
        postData.image = imageUrl
      }

      if (token !== null) {
        await postArticles(postData)
      }
    } catch (error) {
      console.log('데이터 전송 실패', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleFormSubmit()
    alert('게시글 등록이 완료되었습니다!')
    navigate('/boards')
    setValues(INITIAL_VALUES)
  }

  return (
    <div className="m-[8rem_auto_2rem] w-full max-w-[1200px] px-4 md:m-[0] md:p-[8rem_5rem_5rem] lg:m-[0_auto_5rem]">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-xl font-semibold">게시글 쓰기</h3>
        <button
          className={`rounded-md px-4 py-2 ${isDisabled ? 'cursor-not-allowed bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          disabled={isDisabled}
          onClick={handleSubmit}
        >
          등록
        </button>
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        <h4 className="font-semibold">*제목</h4>
        <input
          type="text"
          name="title"
          value={values.title}
          placeholder="제목을 입력해주세요"
          onChange={handleInputChange}
          className="my-4 mt-2 w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm focus:outline-main"
        />
        <h4 className="font-semibold">*내용</h4>
        <textarea
          name="content"
          value={values.content}
          placeholder="내용을 입력해주세요"
          onChange={handleInputChange}
          className="my-4 mt-2 w-full resize-none rounded-md border-none bg-gray-50 px-3 py-2 text-sm focus:outline-main"
          rows={5}
        />
        <h4 className="font-semibold">이미지</h4>
        <FileInput
          name="image"
          value={values.image}
          initialPreview={initialPreview}
          onChange={(name, file) => handleChange(name, file)}
        />
      </form>
    </div>
  )
}

export default AddBoards
