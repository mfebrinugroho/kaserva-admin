import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronsUpDown,
  LoaderCircle,
  Pencil,
  Trash2,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router";
import InputSearch from "@/components/ui/table/InputSearch";
import PerPage from "@/components/ui/table/PerPage";
import type { Store } from "@/types/store";
import { getRowNumber } from "@/utils/rowNumber";
import { cn } from "@/libs/utils";
import Pagination from "@/components/ui/table/Pagination";
import Badge from "@/components/ui/badge/Badge";
import { PATH } from "@/routes/path";
import Button from "@/components/ui/button/Button";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useAuth } from "@/contexts/AuthContext";
import { useStores } from "@/hooks/queries/useStores";
import Switch from "@/components/ui/input/Switch";
import { useUpdateStoreStatus } from "@/hooks/mutations/useUpdateStoreStatus";
import { toast } from "sonner";

type Props = {
  onDelete: (store: Store) => void;
  onAddOwner: (data: boolean) => void;
};

const TableStore = ({ onDelete, onAddOwner }: Props) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const { user } = useAuth();

  const { data, isLoading } = useStores({
    page,
    limit,
    search: debouncedSearch,
  });

  const updateStoreStatus = useUpdateStoreStatus({
    page,
    limit,
    search: debouncedSearch,
  });

  const stores = data?.data || [];
  const meta = data?.meta;

  const handleUpdateStatus = (store: Store) => {
    updateStoreStatus.mutate(
      {
        id: store.id,
        is_active: !store.is_active,
      },
      {
        onSuccess: (response) => {
          toast.success(response.message);
        },
      },
    );
  };

  const isSuperAdmin = user?.role.slug === "super-admin";

  const superAdminColumns = [
    { key: "no", label: "No", sortable: false, className: "w-16" },
    { key: "name", label: "Nama", sortable: true, className: "min-w-64" },
    { key: "address", label: "Alamat", sortable: true, className: "min-w-64" },
    { key: "owner", label: "Owner", sortable: true, className: "w-44" },
    { key: "aktif", label: "Status", sortable: true, className: "w-44" },
    { key: "status", label: "Status", sortable: true, className: "min-w-36" },
    { key: "orders", label: "Order", sortable: true, className: "min-w-36" },
    { key: "aksi", label: "Aksi", sortable: false, className: "w-32" },
  ];

  const ownerColumns = [
    { key: "no", label: "No", sortable: false, className: "w-16" },
    { key: "name", label: "Nama", sortable: true, className: "min-w-64" },
    { key: "address", label: "Alamat", sortable: true, className: "min-w-64" },
    { key: "status", label: "Status", sortable: true, className: "min-w-36" },
    { key: "orders", label: "Order", sortable: true, className: "min-w-36" },
    { key: "aksi", label: "Aksi", sortable: false, className: "w-32" },
  ];

  const columns = isSuperAdmin ? superAdminColumns : ownerColumns;

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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClear={() => setSearch("")}
            />

            <Button
              size="sm"
              variant="outline"
              onClick={() => onAddOwner(true)}
              startIcon={<UserPlus size={18} />}
            >
              Tambah Owner
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader>
              <TableRow variant="header">
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    isHeader
                    className={column.className}
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

            {/* Table Body */}
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <div className="flex justify-center items-center">
                      <LoaderCircle
                        size={24}
                        className="animate-spin [animation-duration:1.2s] text-theme-sm text-gray-700 dark:text-gray-400"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ) : stores.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <p className="text-theme-sm text-gray-700 dark:text-gray-400 font-semibold">
                      Data resto/toko tidak ditemukan.
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                stores.map((store, index) => (
                  <TableRow key={store.id}>
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
                        {store.name}
                      </p>
                    </TableCell>

                    <TableCell>
                      <p className="text-theme-sm text-gray-700 dark:text-gray-400">
                        {store.address}
                      </p>
                    </TableCell>

                    <TableCell>
                      <div className="flex gap-2 text-theme-sm text-gray-700 dark:text-gray-400">
                        {store.owner ? (
                          <p>{store.owner?.name}</p>
                        ) : (
                          <p className="text-gray-400 dark:text-white/30">
                            -- Belum ada owner--{" "}
                          </p>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="text-theme-sm text-gray-700 dark:text-gray-400">
                        <Switch
                          activeLabel="Aktif"
                          inactiveLabel="Tidak Aktif"
                          checked={store.is_active}
                          onChange={() => handleUpdateStatus(store)}
                        />
                      </div>
                    </TableCell>

                    <TableCell>
                      <p className="text-theme-sm text-gray-700 dark:text-gray-400">
                        <Badge color={store.is_open ? "success" : "error"}>
                          {store.is_open ? "Buka" : "Tutup"}
                        </Badge>
                      </p>
                    </TableCell>

                    <TableCell>
                      <p className="text-theme-sm text-gray-700 dark:text-gray-400">
                        <Badge
                          color={store.is_accept_order ? "success" : "error"}
                        >
                          {store.is_accept_order ? "Ya" : "Tidak"}
                        </Badge>
                      </p>
                    </TableCell>

                    <TableCell>
                      <div className="flex w-full items-center gap-2">
                        <button
                          className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500"
                          onClick={() => onDelete(store)}
                        >
                          <Trash2 size={18} />
                        </button>

                        <Link
                          to={PATH.STORES_EDIT(store.id)}
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
    </>
  );
};

export default TableStore;
