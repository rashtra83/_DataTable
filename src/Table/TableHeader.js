import React, { useState } from "react";
import "./Table.css";

const TableHeader = ({ headers, onSorting }) => {
  const [sortingOrder, setSortingOrder] = useState("");
  const [sortingField, setSortingField] = useState("asc");

  const onSortingChange = (field) => {
    const order =
      field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

    setSortingField(field);
    setSortingOrder(order);
    onSorting({ field, order });
  };
  return (
    <thead>
      <tr>
        {headers.map(({ name, field, sortable }) => (
          <th
            key={field}
            onClick={() => (sortable ? onSortingChange(field) : null)}
          >
            {name}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
