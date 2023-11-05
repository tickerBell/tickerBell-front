"use client";

import { HistoryTableBody } from "./HistoryTableBody";
import { HistoryTableHeader } from "./HistoryTableHeader";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import Pagination from "./Pagination";

import ReserveModal from "../portalModal/reserveModal/ReserveModal";

export const HistoryTable = ({
  columns,
  rows,
}: {
  columns: any[];
  rows: any[];
}) => {
  const [modal, setModal] = useState(false);
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
    setOnModal(true);
    setSelectedRow(row);
  };

  const closeModal = () => {
    setSelectedRow(null);
  };

  return (
    <div className="flex w-3/4 justify-center items-center">
      <div>
        {onModal && (
          <ReserveModal
            className="w-400"
            dimClick={true}
            setOnModal={() => setModal(false)}
          />
        )}
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <table className="min-w-full">
              {columns.map((column, key) => (
                <HistoryTableHeader key={key} column={column} />
              ))}
              {displayedRows.map((row, key) => (
                <HistoryTableBody
                  key={key}
                  row={row}
                  openModal={() => {
                    openModal(row);
                  }}
                />
              ))}
            </table>
          </div>
        </div>
        <Pagination
          pageCount={Math.ceil(rows.length / itemsPerPage)}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
