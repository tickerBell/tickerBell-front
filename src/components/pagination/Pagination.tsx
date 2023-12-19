import { paginateSelector } from "@/recoil/paginate";
import React from "react";
import ReactPaginate from "react-paginate";
import { useSetRecoilState } from "recoil";
import './pagination.scss';
// import {}

type PaginationProps = {
  pageCount: number;
  handlePageChange: (selectedPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pageCount = 10,
  handlePageChange
}) => {

  const setPaging = useSetRecoilState(paginateSelector);

  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={10}
      marginPagesDisplayed={2}
      onPageChange={({ selected }) => {
        handlePageChange(selected)
        setPaging(selected)
      }}
      containerClassName={
        "pagination"
      }
      activeClassName={
        "is_active"
      }
      previousLabel={"<"}
      nextLabel={">"}
      previousClassName={
        "px-5 mx-1 flex items-center justify-center rounded-full border border-blue-gray-100 cursor-pointer"
      }
      nextClassName={
        "px-5 mx-1 flex items-center justify-center rounded-full border border-blue-gray-100 cursor-pointer"
      }
    />
  );
};

export default Pagination;
