function DropdownList({ onHandleSelection }) {
  return (
    <div className="absolute w-[150px] bg-white shadow-lg rounded-lg border border-gray-300 mt-2">
      <button
        className="w-full px-4 py-2 text-left hover:bg-gray-200 rounded-t-lg transition-colors"
        onClick={() => onHandleSelection("recent")}
      >
        최신순
      </button>
      <button
        className="w-full px-4 py-2 text-left hover:bg-gray-200 rounded-b-lg transition-colors"
        onClick={() => onHandleSelection("favorite")}
      >
        좋아요순
      </button>
    </div>
  );
}

export default DropdownList;
