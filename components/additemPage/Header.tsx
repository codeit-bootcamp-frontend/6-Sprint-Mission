const Header = ({ validateButton }: { validateButton: boolean }) => {
  return (
    <div className="flex items-center justify-between mx-auto mb-16 mt-94">
      <h1 className="text-#1f2937 text-28 font-bold">상품 등록하기</h1>
      <button
        disabled={validateButton}
        className={`${validateButton ? "bg-gray-400" : "bg-blue"} flex h-42 w-88 cursor-pointer items-center justify-center rounded-8 px-23 py-12 text-16 font-semibold leading-[26px] text-white`}
      >
        등록
      </button>
    </div>
  );
};

export default Header;
