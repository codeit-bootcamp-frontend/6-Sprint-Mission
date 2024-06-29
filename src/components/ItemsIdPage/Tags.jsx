import React from "react";
import "./Tags.css";

function Tags({ tags }) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="tagsDisplay">
      {tags.map((tag, index) => (
        <div className="sortTag" key={index}>
          #{tag}
        </div>
      ))}
    </div>
  );
}

export default Tags;
