import { getPaginationRange } from "@/utils/pagination";

type Props = {
  page: number;
  lastPage: number;
  total: number;
  perPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  page,
  lastPage,
  total,
  perPage,
  onPageChange,
}: Props) {
  const pages = getPaginationRange(page, lastPage);

  const from = (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);

  return (
    <div className="border-t border-gray-100 py-4 pl-4.5 pr-4 dark:border-gray-800">
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
        {/* PAGINATION BUTTONS */}
        <div className="flex items-center justify-center gap-0.5 pb-4 xl:justify-normal xl:pt-0">
          {/* PREV */}
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="mr-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
          >
            Previous
          </button>

          {/* PAGES */}
          {pages.map((p) =>
            p === "..." ? (
              <span
                key={`ellipsis-${p}`}
                className="flex h-10 w-10 items-center justify-center text-gray-400"
              >
                ...
              </span>
            ) : (
              <button
                type="button"
                key={p}
                onClick={() => onPageChange(p)}
                className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition
                  ${
                    p === page
                      ? "bg-blue-500/10 text-brand-500"
                      : "text-gray-700 hover:bg-blue-500/8 dark:text-gray-400"
                  }`}
              >
                {p}
              </button>
            ),
          )}

          {/* NEXT */}
          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page === lastPage}
            className="ml-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
          >
            Next
          </button>
        </div>

        {/* INFO TEXT */}
        <p className="border-t border-gray-100 pt-3 text-center text-sm font-medium text-gray-500 dark:border-gray-800 xl:border-t-0 xl:pt-0 xl:text-left">
          Showing <span className="font-semibold">{from}</span> to{" "}
          <span className="font-semibold">{to}</span> of{" "}
          <span className="font-semibold">{total}</span> entries
        </p>
      </div>
    </div>
  );
}
