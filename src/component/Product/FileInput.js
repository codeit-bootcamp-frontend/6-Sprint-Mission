import { useEffect, useRef, useState } from "react";
import imgPlaceHolder from "../../images/imgPlaceHolder.png";
import imgDelete from "../../images/itemImgDeleteBtn.png";

function FormInput({ name, value, onChange }) {
  //파일 미리보기 주소를 문자열로 저장
  const [preview, setPreview] = useState();

  //Ref객체 생성 - Ref: 원하는 시점에 DOM Node에 접근할 때 사용
  const inputRef = useRef();

  const handleChange = (e) => {
    //files는 배열이기 때문에 배열의 첫번째 값을 가져옴
    const nextValue = e.target.files[0];

    //onChange에 name값과 files의 0번째 value값을 아규먼트로 넘겨줌
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    //current는 현재 화면에 렌더링된 파일 인풋을 가르킴
    const inputNode = inputRef.current;

    //inputNode가 없으면 종료
    if (!inputNode) return;

    //inputNode의 value값을 초기화
    inputNode.value = "";

    //onChange에 name값과 null값을 아규먼트로 넘겨줌
    onChange(name, null);
  };

  useEffect(() => {
    //value 값이 없으면 useEffect 종료
    if (!value) return;

    //createObjectURL 문자열을 리턴하고 이 문자열은 해당 파일의 주소처럼 쓸 수 있는 값 -> 사이드 이펙트 발생
    const nextPrevValue = URL.createObjectURL(value);

    //value prop이 바뀌면 preview의 값이 변경
    setPreview(nextPrevValue);

    //콜백함수는 마지막으로 정리함수를 리턴
    return () => {
      //사이드 이펙트 정리
      setPreview();
      //object URL을 해제
      URL.revokeObjectURL(nextPrevValue);
    };
  }, [value]); //value prop이 바뀔때마다 preview의 값이 변경

  return (
    <div className="FileInput">
      <label htmlFor="imgInput">
        <img
          src={imgPlaceHolder}
          alt="이미지 등록 이미지"
          className="img_placeholder"
        />
      </label>
      {preview && (
        <div className="preview_area">
          <img
            src={preview}
            accept="image/png, image/jpeg"
            alt="상품 이미지 미리보기"
            className="itemPreview"
          />
          <button onClick={handleClearClick}>
            <img src={imgDelete} alt="상품 이미지 미리보기 삭제" />
          </button>
        </div>
      )}

      <input
        type="file"
        name={name}
        onChange={handleChange}
        id="imgInput"
        ref={inputRef}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default FormInput;
