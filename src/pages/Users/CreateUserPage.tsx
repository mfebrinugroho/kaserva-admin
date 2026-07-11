import ComponentCard from "@/components/common/ComponentCard";
import {
  createUserSchema,
  type CreateUserFormData,
} from "@/schemas/user.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { roleService } from "@/services/role.service";
import type { Role } from "@/types/role";
import { userService } from "@/services/user.service";
import axios from "axios";
import { toast } from "sonner";
import UserCreateForm from "@/components/form/users/UserCreateForm";
import { useNavigate } from "react-router";
import { PATH } from "@/routes/path";
import PageHeader from "@/components/common/PageHeader";

const CreateUserPage = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role_id: 0,
    },
    resolver: zodResolver(createUserSchema),
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await roleService.list();

        setRoles(res.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchRoles();
  }, []);

  const onSubmit = async (payload: CreateUserFormData) => {
    try {
      const response = await userService.create(payload);

      toast.success(response.message);

      reset();

      navigate(PATH.USERS);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        const validationErrors = error.response.data.errors;

        Object.entries(validationErrors).forEach(([field, messages]) => {
          setError(field as keyof CreateUserFormData, {
            type: "server",
            message: (messages as string[])[0],
          });
        });

        return;
      }

      toast.error("Terjadi kesalahan.");
    }
  };

  return (
    <>
      <PageHeader title="Tambah User" />
      <div className="space-y-6">
        <ComponentCard title="Tambah Data User">
          <UserCreateForm
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            roles={roles}
          />
        </ComponentCard>
      </div>
    </>
  );
};

export default CreateUserPage;
