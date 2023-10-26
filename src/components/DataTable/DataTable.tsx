"use client";

import { DataTableBody } from "./DataTableBody";
import { DataTableHeader } from "./DataTableHeader";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import Pagination from "./Pagination";

export const DataTable = ({
  columns,
  rows,
}: {
  columns: any[];
  rows: any[];
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [onModal, setOnModal] = useState(false);
  const itemsPerPage = 10;

  const handlePageChange = (selectedPage: any) => {
    setCurrentPage(selectedPage);
  };

  const displayedRows = rows.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  const openModal = (row: any) => {
    setSelectedRow(row);
  };

  const closeModal = () => {
    setSelectedRow(null);
  };

  return (
    <div className="flex flex-col w-3/4 justify-center items-center">
      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <table className="min-w-full">
            {columns.map((column, key) => (
              <DataTableHeader key={key} column={column} />
            ))}
            {displayedRows.map((row, key) => (
              <DataTableBody
                key={key}
                row={row}
                openModal={() => {
                  openModal(row);
                }}
              />
            ))}
          </table>
          <Pagenation />
        </div>
      </div>
      <Pagination
        pageCount={Math.ceil(rows.length / itemsPerPage)}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};
