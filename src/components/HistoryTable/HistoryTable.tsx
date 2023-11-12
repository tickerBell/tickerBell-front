"use client";

import { HistoryTableBody } from "./HistoryTableBody";
import { HistoryTableHeader } from "./HistoryTableHeader";
import ReactPaginate from "react-paginate";
import { useMemo, useState } from "react";
import ReserveModal from "../portalModal/reserveModal/ReserveModal";
import { EventColumns, UserColumns } from "./TableData";
import { useRecoilValue } from "recoil";
import { userSelector } from "@/recoil/user";
import Pagination from "../pagination/Pagination";
import { useQuery } from "@tanstack/react-query";
import { userReserveApi } from "@/api/users";
import { getCookie } from "@/util/authCookie";

export const HistoryTable = () => {
  const getRole = useRecoilValue(userSelector("role"));
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const columns = getRole === "ROLE_REGISTRANT" ? EventColumns : UserColumns;

  // const rows = useMemo(() => {
  //   if (getRole === "ROLE_REGISTRANT") {
  //     return EventRows;
  //   } else {
  //     return UserRows;
  //   }
  // }, [getRole]);

  // const displayedRows = rows.slice(
  //   currentPage * itemsPerPage,
  //   (currentPage + 1) * itemsPerPage
  // );

  const handlePageChange = (selectedPage: any) => {
    setCurrentPage(selectedPage);
  };

  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ["event-reservelist"],
    queryFn: () => userReserveApi(getCookie('ticket-atk'), 0)
  });

  // const tablerows = data?.data.myPageResponse;
  console.log('예약 내역', data?.data.myPageResponse);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <table className="min-w-full">
            <thead className="bg-gray-200 border-b">
              {columns.map((column, key) => (
                <HistoryTableHeader key={key} column={column} />
              ))}
            </thead>
            <tbody>
              {data?.data.myPageResponse.map((row:any, key:any) => (
                <HistoryTableBody
                  key={key}
                  row={row}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        pageCount={Math.ceil(data?.data.myPageResponse.length / itemsPerPage)}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};
