import ComponentCard from "@/components/common/ComponentCard";
import PageHeader from "@/components/common/PageHeader";
import CreateMenuForm from "@/components/form/menus/CreateMenuForm";
import {
  createMenuSchema,
  type CreateMenuFormData,
} from "@/schemas/createMenus.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const CreateMenuPage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateMenuFormData>({
    defaultValues: {
      name: "",
      description: "",
      price: undefined,
      categories: undefined,
    },
    resolver: zodResolver(createMenuSchema),
  });

  const onSubmit = (data: CreateMenuFormData) => {
    console.log(data);
  };

  return (
    <>
      <PageHeader title="Tambah Menu" />
      <div className="space-y-6">
        <ComponentCard title="Tambah Menu">
          <CreateMenuForm
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            control={control}
          />
        </ComponentCard>
      </div>
    </>
  );
};

export default CreateMenuPage;
