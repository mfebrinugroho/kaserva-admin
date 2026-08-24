import Switch from "@/components/ui/input/Switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import InputSearch from "@/components/ui/table/InputSearch";
import PerPage from "@/components/ui/table/PerPage";
import { useAuth } from "@/contexts/AuthContext";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/libs/utils";
import { menuService } from "@/services/menus.service";
import { getRowNumber } from "@/utils/rowNumber";
import { useQuery } from "@tanstack/react-query";
import { ChevronsUpDown, LoaderCircle } from "lucide-react";
import { useState } from "react";

const TableMenu = () => {
  const { user } = useAuth();

  // const queryClient = useQueryClient();

  // const [page, setPage] = useState(1);
  const page = 1;
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const queryKey = ["menus", user?.id, page, limit, debouncedSearch];

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => await menuService.list(page, limit, debouncedSearch),
    enabled: !!user,
  });

  const menus = data?.data || [];
  const meta = data?.meta;

  // const isSuperAdmin = user?.role.slug === "super-admin";

  const superAdminColumns = [
    { key: "no", label: "No", sortable: false, className: "w-16" },
    { key: "name", label: "Nama", sortable: true, className: "min-w-64" },
    { key: "category", label: "Kategori", sortable: true, className: "w-44" },
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
      key: "available",
      label: "Ketersediaan",
      sortable: true,
      className: "w-44",
    },
    { key: "action", label: "Aksi", sortable: false, className: "w-32" },
  ];

  // const ownerColumns = [
  //   { key: "no", label: "No", sortable: false, className: "w-16" },
  //   { key: "name", label: "Nama", sortable: true, className: "min-w-64" },
  //   { key: "category", label: "Kategori", sortable: true, className: "w-44" },
  //   {
  //     key: "description",
  //     label: "Deskripsi",
  //     sortable: true,
  //     className: "min-w-64",
  //   },
  //   {
  //     key: "price",
  //     label: "Harga",
  //     sortable: true,
  //     className: "w-44",
  //   },
  //   {
  //     key: "available",
  //     label: "Ketersediaan",
  //     sortable: true,
  //     className: "w-44",
  //   },
  //   { key: "action", label: "Aksi", sortable: false, className: "w-32" },
  // ];

  const columns = superAdminColumns;
  // const columns = isSuperAdmin ? superAdminColumns : ownerColumns;

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white pt-4 dark:border-white/5 dark:bg-white/3">
        <div className="mb-4 flex flex-col gap-2 px-4 sm:flex-row sm:items-center sm:justify-between">
          <PerPage
            onChange={(e) => setLimit(Number(e.target.value))}
            options={[10, 25, 50]}
          />

          <div className="flex flex-col sm:flex-row sm:justify-center gap-2">
            <InputSearch
              placeholder="Cari resto/toko..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClear={() => setSearch("")}
            />
          </div>
        </div>

        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-200 dark:border-gray-800 ">
              <TableRow className="border-t border-gray-200 dark:border-gray-800">
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    isHeader
                    className={cn(
                      "border-r border-gray-200 px-4 py-3 dark:border-gray-800",
                      column.className,
                    )}
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

            <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
              {isLoading ? (
                <TableRow className=" border-t border-gray-100 dark:border-gray-800">
                  <TableCell
                    colSpan={columns.length}
                    className="border border-gray-100 px-4 py-[17.5px] dark:border-gray-800"
                  >
                    <div className="flex justify-center items-center">
                      <LoaderCircle
                        size={24}
                        className="animate-spin [animation-duration:1.2s] text-theme-sm text-gray-700 dark:text-gray-400"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ) : menus.length === 0 ? (
                <TableRow className=" border-t border-gray-100 dark:border-gray-800">
                  <TableCell
                    colSpan={columns.length}
                    className="border border-gray-100 px-4 py-[17.5px] dark:border-gray-800 text-center"
                  >
                    <p className="text-theme-sm text-gray-700 dark:text-gray-400 font-semibold">
                      Data menu tidak ditemukan.
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                menus.map((menu, index) => (
                  <TableRow
                    key={menu.id}
                    className="border-t border-gray-100 dark:border-gray-800"
                  >
                    <TableCell className="border-r border-gray-100 px-4 py-[17.5px] dark:border-gray-800">
                      <p className="text-theme-sm text-gray-700 dark:text-gray-400">
                        {getRowNumber(
                          meta?.current_page ?? 1,
                          meta?.per_page ?? 1,
                          index,
                        )}
                      </p>
                    </TableCell>
                    <TableCell className="border-r border-gray-100 px-4 py-[17.5px] dark:border-gray-800">
                      <p className="text-theme-sm text-gray-700 dark:text-gray-400">
                        {menu.name}
                      </p>
                    </TableCell>

                    <TableCell className="border-r border-gray-100 px-4 py-[17.5px] dark:border-gray-800">
                      <p className="text-theme-sm text-gray-700 dark:text-gray-400">
                        {menu.category.name}
                      </p>
                    </TableCell>

                    <TableCell className="border-r border-gray-100 px-4 py-[17.5px] dark:border-gray-800">
                      <p className="text-theme-sm text-gray-700 dark:text-gray-400">
                        {menu.description}
                      </p>
                    </TableCell>

                    <TableCell className="border-r border-gray-100 px-4 py-[17.5px] dark:border-gray-800">
                      <p className="text-theme-sm text-gray-700 dark:text-gray-400">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(menu.price)}
                      </p>
                    </TableCell>

                    <TableCell className="border-r border-gray-100 px-4 py-[17.5px] dark:border-gray-800">
                      <div className="text-theme-sm text-gray-700 dark:text-gray-400">
                        <Switch
                          activeLabel="Aktif"
                          inactiveLabel="Tidak Aktif"
                          checked={menu.is_available}
                          // onChange={(value) =>
                          //   updateStoreStatus.mutate({
                          //     id: store.id,
                          //     is_active: value,
                          //   })
                          // }
                        />
                      </div>
                    </TableCell>

                    <TableCell className="border-r border-gray-100 px-4 py-[17.5px] dark:border-gray-800">
                      <div className="flex w-full items-center gap-2">
                        {/* {hasPermission("store.delete") && (
                          <button
                            className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500"
                            onClick={() => openDeleteModal(store)}
                          >
                            <Trash2 size={18} />
                          </button>
                        )} */}

                        {/* <Link
                          to={PATH.STORES_EDIT(store.id)}
                          className="text-gray-500 hover:text-warning-500 dark:text-gray-400 dark:hover:text-warning-500"
                        >
                          <Pencil size={18} />
                        </Link> */}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default TableMenu;
