import { useState, useRef, useEffect } from 'react';

import Head from 'next/head';
import Image from 'next/image';

import Button from '@/components/Button';
import Container from '@/components/Container';

import ICON_PLUS from '@/public/icon-plus.svg';
import ICON_CANCEL_BTN from '@/public/icon-cancel-btn.svg';

import { IBoardValues } from '@/interface/interface';

export default function AddBoard() {
  const [values, setValues] = useState<IBoardValues>({
    title: '',
    content: '',
    imgFile: null,
  });
  const [preview, setPreview] = useState<string>('');
  const imgInputRef = useRef<HTMLInputElement | null>(null);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);

  function onChangeValues(
    key: keyof IBoardValues,
    value: string | File | null,
  ) {
    setValues((prevValues) => ({ ...prevValues, [key]: value }));
  }

  const handleImgClearClick = () => {
    const inputNode = imgInputRef.current;
    if (!inputNode) return;
    inputNode.value = '';
    onChangeValues('imgFile', null);
  };

  useEffect(() => {
    if (!values.imgFile) return;
    const previewImgString = URL.createObjectURL(values.imgFile);
    setPreview(previewImgString);

    return () => {
      setPreview('');
      URL.revokeObjectURL(previewImgString);
    };
  }, [values.imgFile]);

  useEffect(() => {
    if (values.content.length > 0 && values.title.length) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [values.content, values.title]);

  return (
    <>
      <Head>
        <title>판다마켓 - 게시글 쓰기</title>
      </Head>
      <div className="flex items-center justify-center">
        <Container>
          <div className="mb-[20px] flex justify-between items-center">
            <h1 className="font-bold text-[20px]">게시글 쓰기</h1>
            <div className="w-[88px] h-[42px] rounded-lg overflow-hidden">
              <Button disabled={!canSubmit}>등록</Button>
            </div>
          </div>
          <form className="w-[100%]">
            <div className="flex flex-col mb-[20px]">
              <label
                className="mb-[10px] font-bold text-[18px] text-[#1f2937]"
                htmlFor="title"
              >
                *제목
              </label>
              <input
                className="h-[56px] py-[16px] px-[24px] bg-[#f3f4f6] rounded-xl"
                id="title"
                type="text"
                value={values.title}
                onChange={(e) => {
                  onChangeValues('title', e.target.value);
                }}
                placeholder="제목을 입력해주세요"
              />
            </div>
            <div className="flex flex-col mb-[20px]">
              <label
                className="mb-[10px] font-bold text-[18px] text-[#1f2937]"
                htmlFor="content"
              >
                *내용
              </label>
              <textarea
                className="h-[282px] py-[16px] px-[24px] bg-[#f3f4f6] rounded-xl resize-none"
                id="content"
                value={values.content}
                onChange={(e) => {
                  onChangeValues('content', e.target.value);
                }}
                placeholder="내용을 입력해주세요"
              />
            </div>
            <div className="mb-[50px]">
              <label className="block mb-[10px] font-bold text-[18px] text-[#1f2937]">
                이미지
              </label>
              <div className="flex items-center gap-[20px]">
                <label className="w-[282px] h-[282px] bg-[#f3f4f6] rounded-xl flex flex-col items-center justify-center cursor-pointer">
                  <Image src={ICON_PLUS} alt="이미지 추가 아이콘" />
                  <p className="text-[16px] text-[#9Ca3af]">이미지 등록</p>
                  <input
                    className="hidden"
                    type="file"
                    ref={imgInputRef}
                    onChange={(e) => {
                      const file = e.target.files ? e.target.files[0] : null;
                      onChangeValues('imgFile', file);
                    }}
                  />
                </label>
                <div>
                  {preview && (
                    <div className="w-[282px] h-[282px] bg-[#f3f4f6] rounded-xl overflow-hidden relative">
                      <Image
                        src={preview}
                        width={282}
                        height={282}
                        alt="미리보기 이미지"
                      />
                      <Image
                        className="absolute top-[10px] right-[10px] cursor-pointer"
                        onClick={handleImgClearClick}
                        src={ICON_CANCEL_BTN}
                        width={25}
                        height={25}
                        alt="이미지 취소 버튼"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </Container>
      </div>
    </>
  );
}
