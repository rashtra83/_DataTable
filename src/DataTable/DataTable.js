import { useEffect, useMemo, useState } from "react";
import Search from "../Search/Search";
import Pagination from "../Pagination/Pagination";
import TableHeader from "../Table/TableHeader";
import TableBody from "../Table/TableBody";
import "./DataTable.css";
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./bootstrap.min.css";

function DataTable() {
  const [comments, setComments] = useState([]);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 50;

  const headers = [
    { name: "S.No", field: "id", sortable: false },
    { name: "Name", field: "name", sortable: true },
    { name: "Email", field: "email", sortable: true },
    { name: "Comment", field: "body", sortable: false },
  ];

  useEffect(() => {
    const getData = () => {
      fetch("https://jsonplaceholder.typicode.com/comments")
        .then((response) => response.json())
        .then((json) => {
          setComments(json);
        });
    };
    getData();
  }, []);

  const commentsData = useMemo(() => {
    let computedComments = comments;

    setTotalItems(computedComments.length);

    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    if (search) {
      computedComments = computedComments.filter(
        (comment) =>
          comment.name.toLowerCase().includes(search.toLowerCase()) ||
          comment.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    return computedComments.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
  }, [comments, search, sorting, currentPage]);
  return (
    <>
      <div className="header">
        <div className="header__left">
          <Search
            onSearch={(value) => {
              setSearch(value);
            }}
          />
        </div>
        <div className="header__right">
          <Pagination
            className="pagination"
            total={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>

      <table className="dataTable">
        <TableHeader
          headers={headers}
          onSorting={(field, order) => setSorting(field, order)}
        />
        <TableBody commentsData={commentsData} />
      </table>
    </>
  );
}

export default DataTable;
