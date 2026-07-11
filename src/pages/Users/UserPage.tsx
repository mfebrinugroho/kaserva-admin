import ComponentCard from "@/components/common/ComponentCard";
import PageHeader from "@/components/common/PageHeader";
import TableUser from "@/components/table/users/TableUser";
import ModalDelete from "@/components/ui/modal/ModalDelete";
import { useDebounce } from "@/hooks/useDebounce";
import { PATH } from "@/routes/path";
import { userService } from "@/services/user.service";
import type { PaginationMeta } from "@/types/api";
import type { User } from "@/types/user";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchUsers = useCallback(async () => {
    const res = await userService.list(page, limit, debouncedSearch);

    setUsers(res.data);
    setMeta(res.meta);
  }, [page, limit, debouncedSearch]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      try {
        await fetchUsers();
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [fetchUsers]);

  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedUser) return;

    try {
      setIsDeleting(true);

      const response = await userService.delete(Number(selectedUser.id));

      toast.success(response.message);

      setIsDeleteOpen(false);
      setSelectedUser(null);

      if (users.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        await fetchUsers();
      }
    } catch (error) {
      console.log(error);

      toast.error("Gagal menghapus user");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <PageHeader title="Kelola User" />
      <div className="space-y-6">
        <ComponentCard
          title="Kelola Data User"
          desc="Kelola dan pantau data user"
          addTitle="Tambah User"
          addUrl={PATH.USERS_CREATE}
          addButton
        >
          <TableUser
            users={users}
            meta={meta}
            page={page}
            setPage={setPage}
            setLimit={setLimit}
            search={search}
            setSearch={setSearch}
            loading={loading}
            openDeleteModal={openDeleteModal}
          />
        </ComponentCard>
      </div>

      {isDeleteOpen && (
        <ModalDelete
          open={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleDelete}
          isDeleting={isDeleting}
        >
          Apakah Anda yakin ingin menghapus user{" "}
          <span className="font-semibold">{selectedUser?.name}</span>?
        </ModalDelete>
      )}
    </>
  );
};

export default UserPage;
