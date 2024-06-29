import React from "react";
import './OptionToggle.css'

function OptionToggle({
  setFavorite,
  setLatest,
  handleSortSelection,
  itemList,
}) {
  const handleSortLatest = (itemList) => {
    itemList.sort((a, b) => b["createdAt"] - a["createdAt"]);
  };

  const handleSortFavorite = () => {
    itemList.sort((a, b) => b["favoriteCount"] - a["favoriteCount"]);
  };
  return (
    <div>
      <button onClick={handleSortLatest}>최신순</button>
      <button onClick={handleSortFavorite}>좋아요순</button>
    </div>
  );
}

export default OptionToggle;
