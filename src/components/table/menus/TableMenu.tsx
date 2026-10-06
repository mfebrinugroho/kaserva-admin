import { ChevronsUpDown, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
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
import TableStateRow from "@/components/ui/table/TableStateRow";
import { useUpdateMenuStatus } from "@/hooks/mutations/useUpdateMenuStatus";
import { useMenus } from "@/hooks/queries/useMenus";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/libs/utils";
import { PATH } from "@/routes/path";
import type { Menu } from "@/types/menu";
import { getRowNumber } from "@/utils/rowNumber";

type Props = {
  onDelete: (menu: Menu) => void;
};

const TableMenu = ({ onDelete }: Props) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading } = useMenus({
    page,
    limit,
    search: debouncedSearch,
  });

  const menus = data?.data || [];
  const meta = data?.meta;

  const updateMenuStatus = useUpdateMenuStatus({
    page,
    limit,
    search: debouncedSearch,
  });

  const handleUpdateStatus = (menu: Menu) => {
    updateMenuStatus.mutate(
      {
        id: menu.id,
        is_available: !menu.is_available,
      },
      {
        onSuccess: (response) => {
          toast.success(response.message);
        },
      },
    );
  };

  const superAdminColumns = [
    { key: "no", label: "No", sortable: false, className: "w-16" },
    {
      key: "store_id",
      label: "Resto/Toko",
      sortable: true,
      className: "min-w-44",
    },
    {
      key: "menu_category_id",
      label: "Kategori",
      sortable: true,
      className: "w-44",
    },
    { key: "name", label: "Nama Menu", sortable: true, className: "min-w-64" },
    {
      key: "description",
      label: "Deskripsi",
      sortable: true,
      className: "min-w-64",
    },
    {
      key: "price",
      label: "Harga",
      sortable: true,
      className: "w-44",
    },
    {
      key: "is_available",
      label: "Ketersediaan",
      sortable: true,
      className: "w-44",
    },
    { key: "action", label: "Aksi", sortable: false, className: "w-32" },
  ];

  const columns = superAdminColumns;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white pt-4 dark:border-white/5 dark:bg-white/3">
      <div className="mb-4 flex flex-col gap-2 px-4 sm:flex-row sm:items-center sm:justify-between">
        <PerPage
          onChange={(e) => setLimit(Number(e.target.value))}
          options={[10, 25, 50]}
        />

        <InputSearch
          value={search}
          placeholder="Cari menu..."
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
        />
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow variant="header">
              {columns.map((column) => (
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
            {isLoading ? (
              <TableStateRow type="loading" colSpan={columns.length} />
            ) : menus.length === 0 ? (
              <TableStateRow
                type="empty"
                colSpan={columns.length}
                message="Data menu tidak ditemukan."
              />
            ) : (
              menus.map((menu, index) => (
                <TableRow key={menu.id}>
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
                      {menu.store?.name}
                    </p>
                  </TableCell>

                  <TableCell>
                    <p className="text-theme-sm text-gray-700 dark:text-gray-400">
                      {menu.category?.name}
                    </p>
                  </TableCell>

                  <TableCell>
                    <p className="text-theme-sm text-gray-700 dark:text-gray-400">
                      {menu.name}
                    </p>
                  </TableCell>

                  <TableCell>
                    <p className="text-theme-sm text-gray-700 dark:text-gray-400">
                      {menu.description}
                    </p>
                  </TableCell>

                  <TableCell>
                    <p className="text-theme-sm text-gray-700 dark:text-gray-400">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(menu.price)}
                    </p>
                  </TableCell>

                  <TableCell>
                    <div className="text-theme-sm text-gray-700 dark:text-gray-400">
                      <Switch
                        activeLabel="Tersedia"
                        inactiveLabel="Tidak Tersedia"
                        checked={menu.is_available}
                        onChange={() => handleUpdateStatus(menu)}
                      />
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex w-full items-center gap-2">
                      <button
                        type="button"
                        className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500"
                        onClick={() => onDelete(menu)}
                      >
                        <Trash2 size={18} />
                      </button>

                      <Link
                        to={PATH.MENUS_EDIT(menu.id)}
                        className="text-gray-500 hover:text-warning-500 dark:text-gray-400 dark:hover:text-warning-500"
                      >
                        <Pencil size={18} />
                      </Link>
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

export default TableMenu;
