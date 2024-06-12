import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "@/utils/axios";
import getUser from "@/utils/getUser";
import styles from "@/styles/addArticle.module.css";
import ic_x_gray from "@/public/icon/ic_x_gray.svg";
import ic_x_blue from "@/public/icon/ic_x_blue.svg";
import { getUserMessage } from "@/types";

export default function AddArticlePage() {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [imageHovered, setImageHovered] = useState<boolean>(false);
  const [inputTitle, setInputTitle] = useState<string>("");
  const [inputDes, setInputDes] = useState<string>("");
  const [isAllInputFilled, setIsAllInputFilled] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string>("");

  const router = useRouter();
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  useEffect(() => {
    setIsAllInputFilled(inputTitle.trim() !== "" && inputDes.trim() !== "");
  }, [inputTitle, inputDes]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
  };

  const handleDesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputDes(e.target.value);
  };

  const getImageUrl = async (file: File) => {
    if (!accessToken) {
      alert("로그인 해주세요.");
      return router.push("/signin");
    }

    try {
      const userData = await getUser(accessToken);

      if (!userData || (userData as getUserMessage).message) {
        alert("다시 로그인 해주세요.");
        return router.push("/mypage");
      }

      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post(`/images/upload`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setImgUrl(res.data.url);
    } catch (e) {
      console.error("이미지 업로드 실패:", e);
      alert(`이미지 업로드 실패: ${e}`);
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      await getImageUrl(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result?.toString() || "");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setImageSrc("");
    setImgUrl("");
  };

  const handleSubmitClick = async () => {
    if (!accessToken) {
      return alert("로그인 해주세요.");
    }

    try {
      const userData = await getUser(accessToken);

      if (!userData || (userData as getUserMessage).message) {
        alert("다시 로그인 해주세요.");
        router.push("/mypage");
        return;
      }

      const postData: any = {
        content: inputDes,
        title: inputTitle,
        image: imgUrl || undefined,
      };

      const res = await axios.post("/articles", postData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      router.push(`/boards/${res.data.id}`);
    } catch (error) {
      console.error("게시글 등록 실패:", error);
      alert("다시 로그인 해주세요.");
    }
  };

  return (
    <div className={styles.addArticleContainer}>
      <div className={styles.header}>
        <span className={styles.header_text}>게시글 쓰기</span>
        <button
          className={`${styles.header_btn} ${
            isAllInputFilled ? styles.filled : ""
          }`}
          disabled={!isAllInputFilled}
          onClick={handleSubmitClick}
        >
          등록
        </button>
      </div>
      <div className={styles.title}>
        <span className={styles.title_text}>제목</span>
        <input
          className={styles.title_input}
          type="text"
          value={inputTitle}
          onChange={handleTitleChange}
          placeholder="제목을 입력해주세요"
        ></input>
      </div>
      <div className={styles.des}>
        <span className={styles.des_text}>내용</span>
        <textarea
          className={styles.des_textarea}
          value={inputDes}
          onChange={handleDesChange}
          placeholder="내용을 입력해주세요"
        ></textarea>
      </div>
      <div className={styles.imageArea}>
        <span className={styles.imageArea_text}>이미지</span>
        <div className={styles.imageArea_addZone}>
          <div className={styles.addZone_Images}>
            <div className={styles.addZone_addImg}>
              <label className={styles.addZone_btn} htmlFor="imageInput">
                <span className={styles.addZone_plus}>+</span>
                <br />
                <span>이미지 등록</span>
                <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <div>
              <div className={styles.inputImgArea}>
                {imageSrc && (
                  <>
                    <Image
                      width={282}
                      height={282}
                      src={imageSrc}
                      className={styles.inputImg}
                      alt="add img"
                    />
                    <Image
                      width={24}
                      height={24}
                      src={imageHovered ? ic_x_blue : ic_x_gray}
                      alt="delete img"
                      className={styles.inputImg_delBtn}
                      onClick={handleImageDelete}
                      onMouseEnter={() => setImageHovered(true)}
                      onMouseLeave={() => setImageHovered(false)}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
