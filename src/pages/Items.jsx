import AllProducts from "../components/AllProducts";
import BestProducts from "../components/BestProducts";
import "./Items.css";

function Items() {
  return (
    <div className='items'>
      <BestProducts />
      <AllProducts />
    </div>
  );
}

export default Items;
