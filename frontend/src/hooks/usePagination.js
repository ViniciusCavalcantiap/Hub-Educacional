import { useState } from "react";

export function usePagination(data, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPrevious = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const goToNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const resetPage = () => {
    setCurrentPage(1);
  };

  return {
    currentPage,
    totalPages,
    paginatedData,
    goToPrevious,
    goToNext,
    resetPage
  };
}