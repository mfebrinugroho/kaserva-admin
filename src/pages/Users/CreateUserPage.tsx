import ComponentCard from "@/components/common/ComponentCard";
import PageHeader from "@/components/common/PageHeader";
import UserCreateForm from "@/components/form/users/UserCreateForm";

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
