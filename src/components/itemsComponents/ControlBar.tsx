import SearchBar from "../shared/SearchBar";
import SortBy from "../shared/SortBy";

function ControlBar() {
  return (
    <div>
      <SearchBar />
      <button>상품 등록하기</button>
      <SortBy sortByText="최애순" />
    </div>
  );
}

export default ControlBar;
