import { useParams } from "react-router";
import Container from "../components/Container";
import Card from "../components/Card";
import styles from "./CoursePage.module.css";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";

function ItemDetail() {
  const { itemSlug } = useParams();
  const item = getItemDetail(itemSlug);

  if (!item) {
    return <Navigate to="/items" />;
  }

  const headerStyle = {
    borderTopColor: courseColor,
  };

  return (
    <>
      <Helmet>
        <title>판다마켓</title>
      </Helmet>
    </>
  );
}

export default ItemDetail;
