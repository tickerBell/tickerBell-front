"use client";

import { userSelector } from "@/recoil/user";
import { getCookie } from "@/util/authCookie";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import Pagination from "../pagination/Pagination";
import Tab from "../tab/Tab";
import { HistoryTableBody } from "./HistoryTableBody";
import { HistoryTableHeader } from "./HistoryTableHeader";
import { EventColumns, UserColumns } from "./TableData";
import { noneUserReserveListApi, userReserveListApi } from "@/api/ticketing";
import { paginateSelector } from "@/recoil/paginate";
import './historytable.scss';

export const HistoryTable = () => {
  const getRole = useRecoilValue(userSelector("role"));
  // const [getPaging, setPaging ]= useRecoilValue(paginateSelector);
  const [paging, setPaging] = useState(0);
  const refetchQuery = useRef(null);
  const [tabnumber, setTabnumber] = useState(0);
  const [filtered, setFiltered] = useState([]);

  const columns = getRole === "ROLE_REGISTRANT" ? EventColumns : UserColumns;
  const dataType = getRole === "ROLE_REGISTRANT" ? 'eventHistoryRegisterResponseList' : 'ticketingResponseList'

  // 회원 - 등록자, 예약자
  const { data: memberData, isSuccess: memberDataSuccess, refetch } = useQuery({
    queryKey: ["event-reservelist-member", paging],
    queryFn: () => userReserveListApi(paging),
    enabled: typeof getCookie('ticket-atk') === 'string'
  });

  // 비회원
  const { data: nonmemberData, isSuccess: nonmemberDataSuccess, isError, error, isFetched } = useQuery({
    queryKey: ["event-reservelist", paging],
    queryFn: () => noneUserReserveListApi(getCookie('ticket-atk')?.name, getCookie('ticket-atk')?.phone, paging),
    enabled: typeof getCookie('ticket-atk') === 'object',
  });
  const data = typeof getCookie('ticket-atk') === 'string' ? memberData : nonmemberData

  useEffect(() => {
    if (tabnumber === 0) {
      setFiltered(data?.data[dataType]?.content)
    }
    if (tabnumber === 1) {
      setFiltered(data?.data[dataType]?.content.filter((item: any) => item.isEventCancelled === true))
    }
    if (tabnumber === 2) {
      setFiltered(data?.data[dataType]?.content.filter((item: any) => item.isEventCancelled === false))
    }
  }, [tabnumber])
  // console.log('예약 내역', getnonMemberatom, nonmemberData);
  // console.log('rq error : ', data?.data, isFetched, columns);
  // console.log('getPaging', getPaging, data?.data[dataType]);
  const handlePageChange = (value: any) => {
    console.log('선택', value)
    setPaging(value);

  }

  return (
    <>
      {
        data && data?.data[dataType]?.totalElements > 0 ?
          <>
            <Tab tabName={"historyTable"} className="mb-20" tabNumber={setTabnumber} />
            <div className="historytable">
              <div className="min-h-460">
                <table className="table-fixed w-full">
                  <thead className="bg-gray-200 border-b">
                    {columns.map((column, key) => (
                      <HistoryTableHeader key={key} column={column} />
                    ))}
                  </thead>
                  <tbody>
                    {data && data?.data[dataType]?.content.map((row: any, key: any) => (
                      <HistoryTableBody
                        key={key}
                        row={row}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </> : "내역이 없습니다"
      }
      {
        data && data?.data[dataType]?.totalElements > 0 &&
        <Pagination
          pageCount={Math.ceil(data && data?.data[dataType]?.totalElements / 10)}
          handlePageChange={handlePageChange}
        // paginatekey="historyTable"
        />
      }
    </>
  );
};
