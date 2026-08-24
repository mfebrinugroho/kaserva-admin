import ComponentCard from "@/components/common/ComponentCard";
import PageHeader from "@/components/common/PageHeader";
import UserEditForm from "@/components/form/users/UserEditForm";
import { useParams } from "react-router";

const EditUserPage = () => {
  const { id } = useParams();

  const userId = Number(id);

  return (
    <>
      <PageHeader title="Edit User" />
      <div className="space-y-6">
        <ComponentCard title="Edit Data User">
          <UserEditForm userId={userId} />
        </ComponentCard>
      </div>
    </>
  );
};

export default EditUserPage;
