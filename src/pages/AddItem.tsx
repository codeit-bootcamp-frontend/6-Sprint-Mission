import React, { KeyboardEvent, useState } from 'react'
import icon_tag_remove from '../assets/icon_tag_remove.png'
import { postImages, postProducts } from '../api/api'
import FileInput from '../components/FileInput'
import { useNavigate } from 'react-router-dom'

const INITIAL_VALUES = {
  title: '',
  content: '',
  price: '',
  image: null as File | null,
}

type AddItemProps = {
  initialValues?: typeof INITIAL_VALUES
  initialPreview?: string
}

type PostProductData = {
  name: string
  description: string
  price: number
  tags: string[]
  images?: string
}

function AddItem({
  initialValues = INITIAL_VALUES,
  initialPreview,
}: AddItemProps) {
  const [values, setValues] = useState<typeof INITIAL_VALUES>(initialValues)
  const [tags, setTags] = useState<string[]>([])
  const [inputTag, setInputTag] = useState('')

  const isDisabled = !values.title || !values.content || !values.price

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTag(e.target.value)
  }

  const inputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputTag) {
      if (!tags.includes(inputTag)) {
        setTags([...tags, inputTag])
      }
      setInputTag('')
      e.preventDefault()
    }
  }

  const removeTag = (removeTagIndex: number) => {
    const newTags = tags.filter((tag, index) => index !== removeTagIndex)
    setTags(newTags)
  }

  const handleChange = (name: string, value: any) => {
    if (name === 'image' && value instanceof File) {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }))
    } else {
      if (name === 'price') {
      }
      const numericValue = value.replace(/[^0-9]/g, '')
      setValues((prevValues) => ({
        ...prevValues,
        [name]: name === 'price' ? Number(numericValue) : value,
      }))
    }
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
      if (values.image) {
        const formData = new FormData()
        formData.append('image', values.image)

        if (token !== null) {
          const imageResponse = await postImages(formData)
          imageUrl = imageResponse
        }
      }

      const postData: PostProductData = {
        name: values.title,
        description: values.content,
        price: values.price,
        tags: tags,
      }
      if (imageUrl) {
        postData.images = imageUrl
      }
      if (token !== null) {
        const response = await postProducts(postData)
        return response.id
      }
    } catch (error) {
      console.log('데이터 전송 실패', error)
    }
  }

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const productId = await handleFormSubmit()
    alert('상품 등록이 완료되었습니다!')
    navigate(`/items/${productId}`)
    setValues(INITIAL_VALUES)
  }

  return (
    <div className="container mx-auto my-16 flex flex-col items-center px-8 pt-8">
      <div className="mb-8 flex w-full items-center justify-between">
        <h3 className="text-left text-2xl font-bold">상품 등록하기</h3>
        <button
          className={`rounded-md px-4 py-2 text-white ${
            isDisabled
              ? 'cursor-not-allowed bg-gray-400'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={isDisabled}
          onClick={handleSubmit}
        >
          등록
        </button>
      </div>

      <form onSubmit={handleSubmit} className="w-full">
        <h4 className="text-lg font-semibold">상품 이미지</h4>
        <FileInput
          name="image"
          value={values.image}
          initialPreview={initialPreview}
          onChange={(name, file) => handleChange(name, file)}
        />

        <h4 className="text-lg font-semibold">상품명</h4>
        <input
          type="text"
          name="title"
          value={values.title}
          placeholder="상품명을 입력해주세요"
          onChange={handleInputChange}
          className="my-4 mt-2 w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm focus:outline-main"
        />

        <h4 className="text-lg font-semibold">상품 소개</h4>
        <textarea
          name="content"
          value={values.content}
          placeholder="상품 소개를 입력해주세요"
          onChange={handleInputChange}
          className="my-4 mt-2 w-full resize-none rounded-md border-none bg-gray-50 px-3 py-2 text-sm focus:outline-main"
          rows={5}
        />

        <h4 className="text-lg font-semibold">판매가격</h4>
        <input
          type="text"
          name="price"
          value={values.price}
          placeholder="판매 가격을 입력해주세요"
          onChange={handleInputChange}
          className="my-4 mt-2 w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm focus:outline-main"
        />

        <h4 className="text-lg font-semibold">태그</h4>
        <input
          type="text"
          value={inputTag}
          onChange={handleTagInput}
          onKeyDown={inputKeyDown}
          placeholder="태그를 입력해주세요 (엔터를 누르면 태그가 적용돼요)"
          className="my-4 mt-2 w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm focus:outline-main"
        />
        <div className="mt-2 flex gap-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-gray-800"
            >
              {tag}
              <img
                src={icon_tag_remove}
                onClick={() => removeTag(index)}
                className="h-5 w-5 cursor-pointer"
                alt="Remove tag"
              />
            </div>
          ))}
        </div>
      </form>
    </div>
  )
}

export default AddItem
