import Label from "@/components/Label";
import styles from "./style.module.css";
import Input from "@/components/Input";
import Image from "next/image";

import plusIcon from "@/public/ic_plus.png";

// const INITIAL_VALES = {
//   title: "",
//   description: "",
//   imgFile: null,
// };

// interface INITIAL_VALES_PROPS {
//   title: string;
//   description: string;
//   imgFile: readonly string[] | null;
// }

export default function AddBoardPage() {
  // const [values, setValues] = useState<INITIAL_VALES_PROPS>(INITIAL_VALES);

  // const handleChange = (name: string, value: string) => {
  //   setValues((prevValue) => ({
  //     ...prevValue,
  //     [name]: value,
  //   }));
  // };

  // const handleInputChange = (e: React.ChangeEvent<InputEvent>) => {
  //   const { name, value } = e.target;
  //   handleChange(name, value);
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setValues(INITIAL_VALUES);
  // };

  return (
    <main className={styles.container}>
      <div className={styles.titleAndBtnWrap}>
        <h1 className={styles.pageTitle}>게시글 쓰기</h1>
        <button className={styles.addButton}>등록</button>
      </div>
      <form className={styles.addBoardForm}>
        <div className={styles.inputWrap}>
          <Label htmlFor='title' className={styles.label}>
            *제목
          </Label>
          <Input
            id='title'
            className={styles.titleInput}
            // value={values.title}
            type='text'
            placeholder='제목을 입력해주세요'
          />
        </div>
        <div className={styles.inputWrap}>
          <Label htmlFor='description' className={styles.label}>
            *내용
          </Label>
          <Input
            id='description'
            className={styles.descriptionInput}
            type='text'
            placeholder='내용을 입력해주세요'
          />
        </div>
        <div className={styles.inputWrap}>
          <Label
            htmlFor='file'
            className={`${styles.label} ${styles.fileInputLabel}`}
          >
            <Image src={plusIcon} alt='이미지 등록' />
            <p>이미지 등록</p>
          </Label>
          <Input
            id='file'
            className={styles.fileInput}
            type='file'
            placeholder='이미지 등록'
          />
        </div>
      </form>
    </main>
  );
}
