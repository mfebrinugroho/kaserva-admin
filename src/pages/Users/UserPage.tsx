import { useState } from "react";
import { toast } from "sonner";
import ComponentCard from "@/components/common/ComponentCard";
import PageHeader from "@/components/common/PageHeader";
import TableUser from "@/components/table/users/TableUser";
import ModalDelete from "@/components/ui/modal/ModalDelete";
import { useDeleteUser } from "@/hooks/mutations/useDeleteUser";
import { PATH } from "@/routes/path";
import type { User } from "@/types/user";

const UserPage = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const deleteUser = useDeleteUser();

  const handleDelete = () => {
    if (!selectedUser) return;

    deleteUser.mutate(Number(selectedUser.id), {
      onSuccess: (response) => {
        toast.success(response.message);
        setSelectedUser(null);
      },
    });
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
          <TableUser onDelete={setSelectedUser} />
        </ComponentCard>
      </div>

      <ModalDelete
        open={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        onConfirm={handleDelete}
        isDeleting={deleteUser.isPending}
      >
        Apakah Anda yakin ingin menghapus user{" "}
        <span className="font-semibold">{selectedUser?.name}</span>?
      </ModalDelete>
    </>
  );
};

export default UserPage;
