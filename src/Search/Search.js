import React, { useState } from "react";
import "./Search.css";

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const onInputChange = (value) => {
    setSearch(value);
    onSearch(value);
  };

  return (
    <div>
      <input
        className="searchInput"
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => {
          onInputChange(e.target.value);
        }}
      />
    </div>
  );
};

export default Search;
