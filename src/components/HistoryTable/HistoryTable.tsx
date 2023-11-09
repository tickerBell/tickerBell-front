"use client";

import { HistoryTableBody } from "./HistoryTableBody";
import { HistoryTableHeader } from "./HistoryTableHeader";
import ReactPaginate from "react-paginate";
import { useMemo, useState } from "react";
import ReserveModal from "../portalModal/reserveModal/ReserveModal";
import { EventRows, UserRows } from "@/dummyData/DummyData";
import { EventColumns, UserColumns } from "./TableData";
import { useRecoilValue } from "recoil";
import { userSelector } from "@/recoil/user";
import Pagination from "../pagination/Pagination";

export const HistoryTable = () => {
  const [modal, setModal] = useState(false);
  const getRole = useRecoilValue(userSelector("role"));
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [onModal, setOnModal] = useState(false);
  const itemsPerPage = 10;

  const columns = getRole === "ROLE_REGISTRANT" ? EventColumns : UserColumns;

  const rows = useMemo(() => {
    if (getRole === "ROLE_REGISTRANT") {
      return EventRows;
    } else {
      return UserRows;
    }
  }, [getRole]);

  const displayedRows = rows.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageChange = (selectedPage: any) => {
    setCurrentPage(selectedPage);
  };

  const openModal = (row: any) => {
    setOnModal(true);
    setSelectedRow(row);
  };

  const closeModal = () => {
    setSelectedRow(null);
  };

  console.log('columns', columns);

  return (
    <div className="">
      {onModal && (
        <ReserveModal
          className="w-400"
          dimClick={true}
          setOnModal={() => setOnModal(false)}
        />
      )}
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
