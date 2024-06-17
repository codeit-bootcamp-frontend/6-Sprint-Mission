import { useParams, Link } from 'react-router-dom'
import { getItemDetail } from '../../api'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import ItemDetailSection from './components/ItemDetailSection'
import styles from './ItemDetailPage.module.css'
import HorizonLine from '../../components/HorizontalLine'
import CommentSection from './components/CommentSection'

function ItemDetail() {
  const [item, setItem] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const { productId } = useParams()

  useEffect(() => {
    async function fetchItem() {
      if (!productId) {
        setError('상품 아이디가 존재하지 않습니다.')
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      try {
        const data = await getItemDetail(productId)
        if (!data) {
          throw new Error('해당 상품의 데이터를 찾을 수 없습니다.')
        }
        setItem(data)
        console.log('data')
        console.log(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchItem()
  }, [productId])

  if (error) {
    alert(`오류 : ${error}`)
  }

  if (!productId || !item) return null

  return (
    <>
      <Header />
      <div className={styles.container}>
        <ItemDetailSection item={item} />
        <HorizonLine />
        <CommentSection productId={productId} />
        <Link to="/items" className={styles.button}>
          목록으로 돌아가기
        </Link>
      </div>
    </>
  )
}

export default ItemDetail
