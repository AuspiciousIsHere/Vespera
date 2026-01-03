import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface DataTablePaginationProps {
  totalCount: number;
  pageSize: number;
  pageIndex: number;
  setPagination: (val: any) => void;
  delta?: number;
}

export default function TablePagination({ totalCount, pageSize, pageIndex, setPagination, delta = 1 }: DataTablePaginationProps) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const currentPage = pageIndex + 1;

  const getPaginationRange = () => {
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined;

    for (let i = 1; i <= totalPages; i++) {
      // Logic: Always show first 2, last 2, and current +/- delta
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta) || i <= 1 || i >= totalPages) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const paginationRange = getPaginationRange();

  if (totalPages <= 1) return null;

  return (
    <div className="py-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (pageIndex > 0) setPagination((prev: any) => ({ ...prev, pageIndex: prev.pageIndex - 1 }));
              }}
              className={pageIndex === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>

          {paginationRange.map((page, index) => (
            <PaginationItem key={index}>
              {page === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPagination((prev: any) => ({ ...prev, pageIndex: (page as number) - 1 }));
                  }}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) setPagination((prev: any) => ({ ...prev, pageIndex: prev.pageIndex + 1 }));
              }}
              className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
