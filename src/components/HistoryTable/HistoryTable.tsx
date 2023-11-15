"use client";

import { noneUserReserveApi, userReserveApi } from "@/api/users";
import { userSelector } from "@/recoil/user";
import { getCookie } from "@/util/authCookie";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import Tab from "../tab/Tab";
import { HistoryTableHeader } from "./HistoryTableHeader";
import { EventColumns, UserColumns } from "./TableData";

export const HistoryTable = () => {
  const getRole = useRecoilValue(userSelector("role"));
  const getIsLogin = useRecoilValue(userSelector("isLogin"));
  const getnonMemberatom = useRecoilValue(userSelector("nonMember"));
  const [currentPage, setCurrentPage] = useState(1);
  const [tabnumber, setTabnumber] = useState(0);

  const columns = getRole === "ROLE_REGISTRANT" ? EventColumns : UserColumns;

  const handlePageChange = (selectedPage: any) => {
    setCurrentPage(selectedPage);
  };

  // 회원 - 등록자, 예약자
  const { data: memberData, isSuccess: memberDataSuccess } = useQuery({
    queryKey: ["event-reservelist", currentPage],
    queryFn: () => userReserveApi(getCookie('ticket-atk'), 0),
    enabled: typeof getCookie('ticket-atk') === 'string'
  });

  // 비회원
  const { data: nonmemberData, isSuccess: nonmemberDataSuccess, isError, error } = useQuery({
    queryKey: ["event-reservelist", currentPage],
    queryFn: () => noneUserReserveApi(getCookie('ticket-atk')?.name, getCookie('ticket-atk')?.phone),
    enabled: typeof getCookie('ticket-atk') === 'object'
  });

  const data = typeof getCookie('ticket-atk') === 'string' ? memberData : nonmemberData

  // const tablerows = data?.data.myPageResponse;
  console.log('예약 내역', getnonMemberatom, nonmemberData);
  // console.log('cc', nonmemberData, isError, error, memberData);

  return (
    <>
      {
        getIsLogin &&
        <>
          <Tab tabName={"historyTable"} className="mb-20" tabNumber={setTabnumber} />
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
                    {/* {data && data?.data.myPageResponse.map((row: any, key: any) => (
                      <HistoryTableBody
                        key={key}
                        row={row}
                      />
                    ))} */}
                  </tbody>
                </table>
              </div>
            </div>
            {/* <Pagination
                            pageCount={data?.data.totalCount / 10}
              handlePageChange={handlePageChange}
            /> */}
          </div>
        </>
      }
    </>
  );
};
