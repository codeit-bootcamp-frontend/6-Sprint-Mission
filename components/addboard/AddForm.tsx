import styles from "./AddForm.module.scss";
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import ImageInput from "@/components/common/ImageInput";
import { useRouter } from "next/router";
import axios from "@/lib/axiosWithToken";
import { AxiosError, AxiosResponse } from "axios";
import { Article, ArticleData } from "@/interfaces/Article.interface";
import { uploadImage } from "@/utils/uploadImage";

interface FormData {
  title: string;
  content: string;
  image?: File;
}

function AddForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
  });
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleImageChange = (image: File) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image,
    }));
  };

  const handleImageDelete = () => {
    setFormData((prevFormData) => {
      delete prevFormData.image;
      return prevFormData;
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    const formArticleData = async () => {
      if (!formData.image) {
        return formData as ArticleData;
      }

      const image = await uploadImage(formData.image);
      return { ...formData, image };
    };

    const postData = async () => {
      try {
        const articleData = await formArticleData();
        const res: AxiosResponse<Article> = await axios.post(
          "/articles",
          articleData
        );
        const { id } = res.data;
        setErrorMessage("");
        router.replace(`/boards/${id}`);
      } catch (e) {
        if (e instanceof AxiosError) {
          const message = e.response?.data.hasOwnProperty("message")
            ? e.response?.data.message
            : e.message;
          setErrorMessage(message);
          console.log(e.response);
        }
      }
    };

    e.preventDefault();
    postData();
  };

  useEffect(() => {
    // NOTE - 기존에 로그인 되어있는지 확인
    if (!localStorage.getItem("accessToken")) {
      alert("로그인이 필요한 기능입니다!");
      router.replace("/login");
    }
  }, [router]);

  useEffect(() => {
    const checkFormFilled = () =>
      formData.title && formData.content ? true : false;
    setIsFormFilled(checkFormFilled());
  }, [formData.title, formData.content]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <header className={styles.header}>
        <h2 className={styles.title}>게시글 쓰기</h2>
        <button
          className={styles.button}
          type="submit"
          disabled={!isFormFilled}
        >
          등록
        </button>
      </header>

      <div className={styles.input_wrapper}>
        <label className={styles.label} htmlFor="title">
          *제목
        </label>
        <input
          id="title"
          value={formData.title}
          placeholder="제목을 입력해주세요"
          type="text"
          autoComplete="off"
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.input_wrapper}>
        <label className={styles.label} htmlFor="content">
          *내용
        </label>
        <textarea
          id="content"
          value={formData.content}
          placeholder="내용을 입력해주세요"
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.input_wrapper}>
        <label className={styles.label} htmlFor="image">
          이미지
        </label>
        <ImageInput
          name="image"
          onChange={handleImageChange}
          onDeleteClick={handleImageDelete}
        />
      </div>
      {errorMessage && <p className={styles.warning}>{errorMessage}</p>}
    </form>
  );
}

export default AddForm;
