import React from "react";
import "./Table.css";

function Body({ commentsData }) {
  return (
    <tbody>
      {commentsData.map((comment) => (
        <tr>
          <td>{comment.id}</td>
          <td>{comment.name}</td>
          <td>{comment.email}</td>
          <td>{comment.body}</td>
        </tr>
      ))}
    </tbody>
  );
}

export default Body;
