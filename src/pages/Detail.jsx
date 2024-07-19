import "./Detail.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import DetailProductView from "../components/DetailProductView";
import DetailProductComments from "../components/DetailProductComments";
import { getProductsComments } from "../api";

function Detail() {
  const [comments, setComments] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { productId } = location.state;
  const handleOnClick = () => {
    navigate(-1);
  };

  const handleLoad = async () => {
    try {
      const { list } = await getProductsComments({ productId });
      setComments(list);
    } catch (error) {
      console.error("Error: handleLoad from Detail.jsx", error);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  const userDate = (date) => {
    let userTime;
    const currentDate = new Date();
    const itemDate = new Date(date);
    const timeDiff = currentDate.getTime() - itemDate.getTime();
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    if (hours > 0 && hours < 24) {
      userTime = `${hours}시간 전`;
    } else if (hours >= 24) {
      const hour = Math.floor(hours / 24);
      userTime = `${hour}일 전`;
    } else {
      userTime = `${minutes}분 전`;
    }
    return userTime;
  };

  const onCreate = (content) => {
    const newComment = {
      writer: {
        image: comments[0]?.writer.image,
        nickname: "스프린터",
        id: Math.floor(Math.random() * 10),
      },
      updatedAt: new Date().getTime(),
      createdAt: new Date().getTime(),
      content,
      id: Math.floor(Math.random() * 10),
    };
    setComments([newComment, ...comments]);
  };

  return (
    <main className='detail-container'>
      <DetailProductView productsItems={{ ...location.state }} />
      <DetailProductComments
        comments={comments}
        handleOnClick={handleOnClick}
        userDate={userDate}
        onCreate={onCreate}
      />
    </main>
  );
}

export default Detail;
