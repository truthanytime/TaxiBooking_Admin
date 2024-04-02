import React, { useEffect, useState } from "react";
import { Pagination, PaginationLink, PaginationItem } from "reactstrap";
import Icon from "../icon/Icon";

const PaginationComponent = ({ itemPerPage, totalItems, paginate, currentPage }) => {

  const [pageNumbers, setPageNumbers]  = useState([]); 
  const nextPage = () => {
    paginate(currentPage + 1);
  };

  const prevPage = () => {
    paginate(currentPage - 1);
  };
  useEffect(()=>{
    const start = Math.max(1, Math.floor(currentPage/10) *10 +1); 
    const end = Math.min( (Math.floor(currentPage/10) + 1)*10  , Math.ceil(totalItems / itemPerPage))
    const _pageNumbers = [];
    console.log(itemPerPage); 
    for (let i = start; i <= end; i++) {
      _pageNumbers.push(i);
    }
    setPageNumbers([..._pageNumbers]); 
  }, [itemPerPage, totalItems,  currentPage])
  return (
    <Pagination aria-label="Page navigation example">
      <PaginationItem disabled={currentPage - 1 === 0 ? true : false}>
        <PaginationLink
          className="page-link-prev"
          onClick={(ev) => {
            ev.preventDefault();
            prevPage();
          }}
          href="#prev"
        >
          <Icon name="chevrons-left" />
          <span>Prev</span>
        </PaginationLink>
      </PaginationItem>
      {pageNumbers.map((item) => {
        return (
          <PaginationItem className={currentPage === item ? "active" : ""} key={item}>
            <PaginationLink
              tag="a"
              href="#pageitem"
              onClick={(ev) => {
                ev.preventDefault();
                paginate(item);
              }}
            >
              {item}
            </PaginationLink>
          </PaginationItem>
        );
      })}

      <PaginationItem disabled={pageNumbers[pageNumbers.length - 1] === currentPage}>
        <PaginationLink
          className="page-link-next"
          onClick={(ev) => {
            ev.preventDefault();
            nextPage();
          }}
          href="#next"
        >
          <span>Next</span>
          <Icon name="chevrons-right" />
        </PaginationLink>
      </PaginationItem>
    </Pagination>
  );
};
export default PaginationComponent;
