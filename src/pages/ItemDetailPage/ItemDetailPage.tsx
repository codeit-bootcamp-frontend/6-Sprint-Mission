import React, { ChangeEvent } from "react";
import { useState } from "react";
import ItemDetailCard from "./components/ItemDetailCard";
import ItemComments from "./components/ItemComments";
import { Button, Container } from "../../styles/CommonStyles";
import InputItem from "../../components/UI/InputItem";
import { Link } from "react-router-dom";
import "./ItemDetailPage.css";
import { ReactComponent as BackIcon } from "../../assets/images/icons/ic_back.svg";

function ItemDetailPage() {
  const [description, setDescription] = useState("");

  const isSubmitDisabled = !description;

  return (
    <>
      <Container>
        <ItemDetailCard />

        <form>
          <InputItem
            id="description"
            label="문의하기"
            value={description}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
            isTextArea
            onKeyDown={undefined}
          />
          <div className="submitBt">
            <Button type="submit" disabled={isSubmitDisabled}>
              등록
            </Button>
          </div>
        </form>
        <ItemComments />
        <div className="linkItemsBt">
          <button>
            <Link to="/items">목록으로 돌아가기</Link>
            <BackIcon />
          </button>
        </div>
      </Container>
    </>
  );
}

export default ItemDetailPage;
