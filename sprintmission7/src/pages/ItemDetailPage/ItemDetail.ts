import { useParams } from "react-router";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getProducts } from "../../api/itemApi";
import Container from "../../components/Layout/Container";

function ItemDetail() {
  const { itemSlug } = useParams();
  const item = getProducts(itemSlug);

  if (!item) {
    return <Navigate to="/items" />;
  }

  return (
    <>
      <Helmet>
        <title>판다마켓</title>
      </Helmet>
      <div>
        <Container>
          <getProducts value={product} />
        </Container>
      </div>
    </>
  );
}

export default ItemDetail;
