import { useState } from 'react'
import Header from '../../components/HeaderForMember'
import './AddItemPage.css'
import FileInput from './FileInput'

function AddItemForm() {
  const [tags, setTags] = useState([])

  const [values, setValues] = useState({
    imgFile: null,
    title: '',
    content: '',
    price: '',
    tag: '',
  })

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    handleChange(name, value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('submit~!')
  }

  const addTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag])
    }
  }

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div className="AddItemPage">
      <form onSubmit={handleSubmit}>
        <div className="AddItemPageHeader">
          <h1>상품 등록하기</h1>
          <button className="register-button" type="submit">
            등록
          </button>
        </div>

        <div className="AddItemPageMain">
          <div className="itemImgFile mainSection">
            <FileInput
              name="imgFile"
              value={values.imgFile}
              onChange={handleChange}
            />
          </div>
          <div className="itemTitle mainSection">
            <p className="sectionTitle">상품명</p>
            <input
              className="addItemInput"
              name="title"
              value={values.title}
              onChange={handleInputChange}
              placeholder="상품명을 입력해주세요"
            />
          </div>
          <div className="itemContent mainSection">
            <p className="sectionTitle">상품 소개</p>
            <textarea
              name="content"
              value={values.content}
              onChange={handleInputChange}
              placeholder="상품 소개를 입력해주세요"
            />
          </div>
          <div className="itemPrice mainSection">
            <p className="sectionTitle">판매 가격</p>
            <input
              className="addItemInput"
              name="price"
              type="number"
              value={values.price}
              onChange={handleInputChange}
              placeholder="판매 가격을 입력해주세요"
            />
          </div>
          <div className="itemTag mainSection">
            <p>Tag 자리</p>
          </div>
        </div>
      </form>
    </div>
  )
}

function AddItemPage() {
  return (
    <>
      <Header />
      <AddItemForm />
    </>
  )
}

export default AddItemPage
