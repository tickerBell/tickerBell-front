import React from "react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  pageCount: number;
  handlePageChange: (selectedPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  handlePageChange,
}) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={10}
      marginPagesDisplayed={2}
      onPageChange={({ selected }) => handlePageChange(selected)}
      containerClassName={
        "pagination flex justify-center mt-7 px-5 mx-1 space-x-8"
      }
      activeClassName={
        "active bg-pink-500 px-5 mx-1 flex items-center justify-center text-white rounded-full border border-blue-gray-100"
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
