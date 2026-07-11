import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { PaginationMeta } from "@/types/api";
import type { User } from "@/types/user";
import { ChevronsUpDown, LoaderCircle, Pencil, Trash2 } from "lucide-react";
import { getRowNumber } from "@/utils/rowNumber";
import InputSearch from "@/components/ui/table/InputSearch";
import PerPage from "@/components/ui/table/PerPage";
import Pagination from "@/components/ui/table/Pagination";
import { Link } from "react-router";
import { PATH } from "@/routes/path";
import RoleBadge from "@/components/ui/badge/RoleBadge";

type Props = {
  users: User[];
  meta?: PaginationMeta | null;
  page: number;
  search: string;
  setPage: (page: number) => void;
  setLimit: (perPage: number) => void;
  setSearch: (search: string) => void;
  loading: boolean;
  openDeleteModal: (user: User) => void;
};

const TableUser = ({
  users,
  meta,
  page,
  search,
  setPage,
  setLimit,
  setSearch,
  loading,
  openDeleteModal,
}: Props) => {
  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white pt-4 dark:border-white/5 dark:bg-white/3">
        <div className="mb-4 flex flex-col gap-2 px-4 sm:flex-row sm:items-center sm:justify-between">
          <PerPage onChange={(e) => setLimit(Number(e.target.value))}>
            <option
              value={10}
              className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
            >
              10
            </option>
            <option
              value={25}
              className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
            >
              25
            </option>
            <option
              value={50}
              className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
            >
              50
            </option>
          </PerPage>
          <InputSearch
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch("")}
          />
        </div>
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-200 dark:border-gray-800 ">
              <TableRow className="grid grid-cols-9 border-t border-gray-200 dark:border-gray-800">
                <TableCell
                  isHeader
                  className="col-span-1 flex items-center border-r border-gray-200 px-4 py-3 dark:border-gray-800"
                >
                  <div className="flex w-full cursor-pointer items-center justify-between">
                    <p className="text-theme-xs font-medium text-gray-700 dark:text-gray-400">
                      Nomor
                    </p>
                    <span className="flex flex-col gap-0.5">
                      <ChevronsUpDown
                        size={15}
                        className="text-gray-300 dark:text-gray-700"
                      />
                    </span>
                  </div>
                </TableCell>
                <TableCell
                  isHeader
                  className="col-span-2 flex items-center border-r border-gray-200 px-4 py-3 dark:border-gray-800"
                >
                  <div className="flex w-full cursor-pointer items-center justify-between">
                    <p className="text-theme-xs font-medium text-gray-700 dark:text-gray-400">
                      Nama
                    </p>
                    <span className="flex flex-col gap-0.5">
                      <ChevronsUpDown
                        size={15}
                        className="text-gray-300 dark:text-gray-700"
                      />
                    </span>
                  </div>
                </TableCell>
                <TableCell
                  isHeader
                  className="col-span-3 flex items-center border-r border-gray-200 px-4 py-3 dark:border-gray-800"
                >
                  <div className="flex w-full cursor-pointer items-center justify-between">
                    <p className="text-theme-xs font-medium text-gray-700 dark:text-gray-400">
                      Email
                    </p>
                    <span className="flex flex-col gap-0.5">
                      <ChevronsUpDown
                        size={15}
                        className="text-gray-300 dark:text-gray-700"
                      />
                    </span>
                  </div>
                </TableCell>
                <TableCell
                  isHeader
                  className="col-span-2 flex items-center border-r border-gray-200 px-4 py-3 dark:border-gray-800"
                >
                  <div className="flex w-full cursor-pointer items-center justify-between">
                    <p className="text-theme-xs font-medium text-gray-700 dark:text-gray-400">
                      Role
                    </p>
                    <span className="flex flex-col gap-0.5">
                      <ChevronsUpDown
                        size={15}
                        className="text-gray-300 dark:text-gray-700"
                      />
                    </span>
                  </div>
                </TableCell>

                <TableCell
                  isHeader
                  className="col-span-1 flex items-center border-r border-gray-200 px-4 py-3 dark:border-gray-800"
                >
                  <div className="flex w-full cursor-pointer items-center justify-between">
                    <p className="text-theme-xs font-medium text-gray-700 dark:text-gray-400">
                      Action
                    </p>
                    <span className="flex flex-col gap-0.5">
                      <ChevronsUpDown
                        size={15}
                        className="text-gray-300 dark:text-gray-700"
                      />
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
              {loading ? (
                <TableRow className=" border-t border-gray-100 dark:border-gray-800">
                  <TableCell className="flex items-center border border-gray-100 px-4 py-[17.5px] dark:border-gray-800 justify-center">
                    <p className="text-theme-sm text-gray-700 dark:text-gray-400">
                      <LoaderCircle
                        size={24}
                        className="animate-spin [animation-duration:1.2s]"
                      />
                    </p>
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow className=" border-t border-gray-100 dark:border-gray-800">
                  <TableCell className="flex items-center border border-gray-100 px-4 py-[17.5px] dark:border-gray-800 justify-center">
                    <p className="text-theme-sm text-gray-700 dark:text-gray-400 font-semibold">
                      Data user tidak ditemukan.
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user, index) => (
                  <TableRow
                    key={user.id}
                    className="grid grid-cols-9 border-t border-gray-100 dark:border-gray-800"
                  >
                    <TableCell className="col-span-1 flex items-center border-r border-gray-100 px-4 py-[17.5px] dark:border-gray-800">
                      <p className="text-theme-sm text-gray-700 dark:text-gray-400">
                        {getRowNumber(
                          meta?.current_page ?? 1,
                          meta?.per_page ?? 1,
                          index,
                        )}
                      </p>
                    </TableCell>
                    <TableCell className="col-span-2 flex items-center border-r border-gray-100 px-4 py-[17.5px] dark:border-gray-800">
                      <p className="text-theme-sm text-gray-700 dark:text-gray-400">
                        {user.name}
                      </p>
                    </TableCell>
                    <TableCell className="col-span-3 flex items-center border-r border-gray-100 px-4 py-[17.5px] dark:border-gray-800">
                      <p className="text-theme-sm text-gray-700 dark:text-gray-400">
                        {user.email}
                      </p>
                    </TableCell>
                    <TableCell className="col-span-2 flex items-center border-r border-gray-100 px-4 py-[17.5px] dark:border-gray-800">
                      <p className="text-theme-sm text-gray-700 dark:text-gray-400">
                        {/* {user.role.name} */}
                        <RoleBadge role={user.role.slug}>
                          {user.role.name}
                        </RoleBadge>
                      </p>
                    </TableCell>
                    <TableCell className="col-span-1 flex items-center border-r border-gray-100 px-4 py-[17.5px] dark:border-gray-800">
                      <div className="flex w-full items-center gap-2">
                        <button
                          className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500"
                          onClick={() => openDeleteModal(user)}
                        >
                          <Trash2 size={18} />
                        </button>

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
