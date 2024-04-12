import "./style/DropDown.css";

function DropDown({ setOrder }) {
  return (
    <>
      <select onChange={(e) => setOrder(e.target.value)}>
        <option value="최신순">최신순</option>
        <option value="좋아요순">좋아요순</option>
      </select>
    </>
  );
}

export default DropDown;
