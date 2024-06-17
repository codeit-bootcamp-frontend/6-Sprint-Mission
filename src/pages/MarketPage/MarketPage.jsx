import Header from '../../components/Header'
import BestItemsSection from './components/BestItemsSection'
import AllItemsSection from './components/AllItemsSection'
import styles from './MarketPage.module.css'

function MarketPage() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <BestItemsSection />
        <AllItemsSection />
      </div>
    </>
  )
}

export default MarketPage
