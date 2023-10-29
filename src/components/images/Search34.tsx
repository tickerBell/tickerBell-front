import React from "react";

type ImgTypes = {
  onClick?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

const Search34 = ({ onClick }: ImgTypes) => {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5 8C10.9101 8 8 10.9101 8 14.5C8 18.0899 10.9101 21 14.5 21C15.6759 21 16.7788 20.6878 17.7305 20.1417L23.6069 26.0182L25.0211 24.6039L19.3001 18.8829C20.356 17.7272 21 16.1888 21 14.5C21 10.9101 18.0899 8 14.5 8ZM10 14.5C10 12.0147 12.0147 10 14.5 10C16.9853 10 19 12.0147 19 14.5C19 16.9853 16.9853 19 14.5 19C12.0147 19 10 16.9853 10 14.5Z"
        fill="black"
      />
    </svg>
  );
};

export default Search34;
