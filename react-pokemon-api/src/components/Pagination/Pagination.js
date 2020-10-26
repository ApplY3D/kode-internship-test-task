import React from "react";
import { Button } from "../Button";
import "./Pagination.scss";

export const Pagination = ({
  page,
  disabled,
  pageCount = 1,
  setPage,
  pageRange = 4,
}) => {
  const usePageRange = () => {
    const arrOfPageNums = new Set([]);

    let rightAvailable = pageCount - page;
    let leftAvailable = page - 1;

    let tempPage = page;
    let half = Math.floor(pageRange / 2);

    if (pageRange % 2 === 0) {
      half--;
    }

    while (leftAvailable > 0 && half > 0) {
      arrOfPageNums.add(--tempPage);
      leftAvailable--;
      half--;
    }
    tempPage = page;
    half = half + Math.floor(pageRange / 2);
    while (rightAvailable > 0 && half > 0) {
      arrOfPageNums.add(++tempPage);
      rightAvailable--;
      half--;
    }
    tempPage = Math.min(...arrOfPageNums);
    while (leftAvailable > 0 && half > 0) {
      arrOfPageNums.add(--tempPage);
      leftAvailable--;
      half--;
    }

    arrOfPageNums.add(1);
    arrOfPageNums.add(pageCount);
    arrOfPageNums.add(page);

    return Array.from(arrOfPageNums).sort((a, b) => a - b);
  };

  return (
    <div className="pagination">
      <Button
        className="btn--prev"
        disabled={page === 1 || disabled}
        title="< Prev"
        onClick={setPage.bind(null, (v) => v - 1)}
      />

      <div className="pagination__page-nums">
        {usePageRange().map((num) => {
          return (
            num !== 0 && (
              <Button
                disabled={page === num || disabled}
                title={num}
                onClick={setPage.bind(null, num)}
              />
            )
          );
        })}
      </div>

      <Button
        className="btn--next"
        disabled={page === pageCount || pageCount === 0 || disabled}
        title="Next >"
        onClick={setPage.bind(null, (v) => v + 1)}
      />
    </div>
  );
};
