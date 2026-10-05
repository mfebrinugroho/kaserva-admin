import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { User } from "@/types/user";
import { ChevronsUpDown, LoaderCircle, Pencil, Trash2 } from "lucide-react";
import { getRowNumber } from "@/utils/rowNumber";
import InputSearch from "@/components/ui/table/InputSearch";
import PerPage from "@/components/ui/table/PerPage";
import Pagination from "@/components/ui/table/Pagination";
import { Link } from "react-router";
import { PATH } from "@/routes/path";
import RoleBadge from "@/components/ui/badge/RoleBadge";
import { useUsers } from "@/hooks/queries/useUsers";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/libs/utils";
import { useAuth } from "@/contexts/AuthContext";

type Props = {
  onDelete: (user: User) => void;
};

const TableUser = ({ onDelete }: Props) => {
  const { user: me } = useAuth();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading } = useUsers({
    page,
    limit,
    search: debouncedSearch,
  });

  const users = data?.data || [];
  const meta = data?.meta;

  const headerColumns = [
    { key: "no", label: "No", sortable: true, className: "w-24" },
    { key: "name", label: "Nama", sortable: true, className: "min-w-64" },
    { key: "email", label: "Email", sortable: true, className: "min-w-64" },
    { key: "role", label: "Role", sortable: true, className: "w-64" },
    { key: "aksi", label: "Aksi", sortable: false, className: "w-32" },
  ];

  return (
    <>
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

            {/* Table Body */}
            <TableBody>
              {isLoading ? (
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
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={headerColumns.length}>
                    <p className="text-theme-sm text-gray-700 dark:text-gray-400 font-semibold">
                      Data user tidak ditemukan.
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user, index) => (
                  <TableRow key={user.id}>
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
                        {user.name}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="text-theme-sm text-gray-700 dark:text-gray-400">
                        {user.email}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="text-theme-sm text-gray-700 dark:text-gray-400">
                        <RoleBadge role={user.role?.slug}>
                          {user.role?.name}
                        </RoleBadge>
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex w-full items-center justify-center gap-2">
                        {me?.id !== user.id && (
                          <button
                            className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500"
                            onClick={() => onDelete(user)}
                          >
                            <Trash2 size={18} />
                          </button>
                        )}

                        <Link
                          to={PATH.USERS_EDIT(user.id)}
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

export default TableUser;
