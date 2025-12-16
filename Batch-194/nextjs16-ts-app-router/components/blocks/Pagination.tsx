'use client'
import { useState } from "react";

interface PaginationProps {
  totalPage: number;
  totalRecords: number;
  onPageChange?: (page: number) => void;
}

const Pagination = ({ totalPage, totalRecords, onPageChange }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (page: number) => {
    if (page < 1 || page > totalPage) return;
    setCurrentPage(page);
    if (onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex  items-center gap-3 mt-4">
      {/* Tổng số record */}
      <p className="text-sm text-gray-600">
        Tổng cộng <span className="font-semibold">{totalRecords}</span> bản ghi
      </p>

      {/* Pagination */}
      <div className="flex items-center gap-1">
        {/* Prev */}
        <button
          onClick={() => handleChangePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
        >
          Prev
        </button>

        {/* Page numbers */}
        {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handleChangePage(page)}
            className={`px-3 py-1 border rounded cursor-pointer
              ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => handleChangePage(currentPage + 1)}
          disabled={currentPage === totalPage}
          className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
