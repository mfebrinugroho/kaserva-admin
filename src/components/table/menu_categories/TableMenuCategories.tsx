import Switch from "@/components/ui/input/Switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import InputSearch from "@/components/ui/table/InputSearch";
import Pagination from "@/components/ui/table/Pagination";
import PerPage from "@/components/ui/table/PerPage";
import { useMenuCategories } from "@/hooks/queries/useMenuCategories";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/libs/utils";
import type { MenuCategory } from "@/types/menuCategory";
import { getRowNumber } from "@/utils/rowNumber";
import { ChevronsUpDown, LoaderCircle, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

type Props = {
  onDelete: (menuCategory: MenuCategory) => void;
  onEdit: (menuCategory: MenuCategory) => void;
};

const TableMenuCategories = ({ onDelete, onEdit }: Props) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading } = useMenuCategories({
    page,
    limit,
    search: debouncedSearch,
  });

  const menuCategories = data?.data || [];
  const meta = data?.meta;

  const headerColumns = [
    { key: "no", label: "No", sortable: true, className: "w-24" },
    { key: "store", label: "Toko", sortable: true, className: "min-w-64" },
    {
      key: "name",
      label: "Nama Kategori",
      sortable: true,
      className: "min-w-64",
    },
    { key: "sort_order", label: "Urutan", sortable: true, className: "w-32" },
    { key: "is_active", label: "Aktif", sortable: true, className: "min-w-64" },
    { key: "aksi", label: "Aksi", sortable: false, className: "w-32" },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white pt-4 dark:border-white/5 dark:bg-white/3">
      <div className="mb-4 flex flex-col gap-2 px-4 sm:flex-row sm:items-center sm:justify-between">
        <PerPage
          onChange={(e) => setLimit(Number(e.target.value))}
          options={[10, 25, 50]}
        />
        <InputSearch
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
        />
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow variant="header">
              {headerColumns.map((column) => (
                <TableCell
                  key={column.key}
                  isHeader
                  className={column.className}
                  variant="header"
                >
                  <div
                    className={cn(
                      "flex w-full items-center justify-between ",
                      column.sortable && "cursor-pointer",
                    )}
                  >
                    <p className="text-theme-xs font-medium text-gray-700 dark:text-gray-400">
                      {column.label}
                    </p>
                    {column.sortable && (
                      <span className="flex flex-col gap-0.5">
                        <ChevronsUpDown
                          size={15}
                          className="text-gray-300 dark:text-gray-700"
                        />
                      </span>
                    )}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={headerColumns.length}>
                  <div className="flex justify-center items-center">
                    <LoaderCircle
                      size={24}
                      className="animate-spin [animation-duration:1.2s] text-theme-sm text-gray-700 dark:text-gray-400"
                    />
                  </div>
                </TableCell>
              </TableRow>
            )}

            {menuCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={headerColumns.length}>
                  <p className="text-theme-sm text-gray-700 dark:text-gray-400 font-semibold">
                    Data kategori tidak ditemukan.
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              menuCategories.map((category, index) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <p className="text-theme-sm text-gray-700 dark:text-gray-400">
                      {getRowNumber(
                        meta?.current_page ?? 1,
                        meta?.per_page ?? 1,
                        index,
                      )}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="text-theme-sm text-gray-700 dark:text-gray-400">
                      {category.store?.name}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="text-theme-sm text-gray-700 dark:text-gray-400">
                      {category.name}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="text-theme-sm text-gray-700 dark:text-gray-400">
                      {category.sort_order}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="text-theme-sm text-gray-700 dark:text-gray-400">
                      <Switch
                        activeLabel="Aktif"
                        inactiveLabel="Tidak Aktif"
                        checked={category.is_active}
                        onChange={() => {}}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex w-full items-center gap-2">
                      <button
                        className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500"
                        onClick={() => onDelete(category)}
                      >
                        <Trash2 size={18} />
                      </button>

                      <button
                        className="text-gray-500 hover:text-warning-500 dark:text-gray-400 dark:hover:text-warning-500"
                        onClick={() => onEdit(category)}
                      >
                        <Pencil size={18} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {meta && (
        <Pagination
          page={page}
          lastPage={meta.last_page}
          total={meta.total}
          perPage={meta.per_page}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default TableMenuCategories;
