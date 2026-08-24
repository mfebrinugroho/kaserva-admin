import ComponentCard from "@/components/common/ComponentCard";
import UserCreateForm from "@/components/form/users/UserCreateForm";
import PageHeader from "@/components/common/PageHeader";

const CreateUserPage = () => {
  return (
    <>
      <PageHeader title="Tambah User" />
      <div className="space-y-6">
        <ComponentCard title="Tambah Data User">
          <UserCreateForm />
        </ComponentCard>
      </div>
    </>
  );
};

export default CreateUserPage;
