import { postArticle, postImage } from "@/shared/api";
import { useScreenDetector } from "@/shared/lib/hooks";
import { SubmitButton } from "@/shared/ui/button";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  title: string;
  content: string;
  image?: File;
}

export default function Addboard() {
  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm<IFormInput>();
  const router = useRouter();
  const onSubmit: SubmitHandler<IFormInput> = (d) => {
    postArticle(image !== null ? { ...d, image } : { ...d });
    router.push("/boards");
  };
  const { isDesktop } = useScreenDetector();
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files?.[0];
      setImage(file);
      const data = URL.createObjectURL(file);
      setPreview(data);
    }
  };

  return (
    <form
      className="mb-[410px] flex flex-col gap-6 lg:mb-[153px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <header className="mb-6 mt-4 flex items-center lg:mt-6">
        <h2 className="flex-grow text-xl font-bold">
          {isDesktop ? "게시글 쓰기" : "상품 등록하기"}
        </h2>
        <SubmitButton
          className="h-[42px] w-[74px]"
          value="등록"
          disabled={!isDirty || !isValid}
        />
      </header>
      <section className="flex flex-col gap-3 font-bold">
        <h2 className="text-sm md:text-lg">*제목</h2>
        <input
          {...register("title", { required: true })}
          placeholder="제목을 입력해주세요"
          type="text"
          className="flex-grow rounded-xl bg-[#f3f4f6] px-6 py-4"
        />
        {errors.title?.type === "required" && (
          <p role="alert" className="text-[#ff0000]">
            제목을 입력해주세요!
          </p>
        )}
      </section>
      <section className="flex flex-col gap-3 font-bold">
        <h2 className="text-sm md:text-lg">*내용</h2>
        <textarea
          {...register("content", { required: true })}
          placeholder="내용을 입력해주세요"
          className="h-[200px] flex-grow resize-none rounded-xl bg-[#f3f4f6] px-6 py-4 lg:h-[200px]"
        />
        {errors.content?.type === "required" && (
          <p role="alert" className="text-[#ff0000]">
            내용을 입력해주세요!
          </p>
        )}
      </section>
      <section className="flex flex-col gap-3 font-bold">
        <h2 className="text-sm md:text-lg">이미지</h2>
        <figure className="flex gap-3">
          <label
            htmlFor="image"
            className="flex h-[168px] w-[168px] cursor-pointer items-center justify-center bg-[#f3f4f6] text-[#9CA3AF] md:h-[162px] md:w-[162px] lg:h-[282px] lg:w-[282px]"
          >
            <figure className="flex h-[84px] w-[74px] flex-col items-center gap-3">
              <div className="relative h-12 w-12">
                <Image fill src="/icons/plusButton.png" alt="plusButton" />
              </div>
              <p>이미지 등록</p>
            </figure>
          </label>
          <input
            id="image"
            type="file"
            className="hidden"
            onChange={handleUpload}
          />
          {preview && (
            <div className="relative h-[168px] w-[168px] md:h-[162px] md:w-[162px] lg:h-[282px] lg:w-[282px]">
              <Image fill src={preview} alt={preview} />
            </div>
          )}
        </figure>
      </section>
    </form>
  );
}
