import ComponentCard from "@/components/common/ComponentCard";
import PageHeader from "@/components/common/PageHeader";
import UserEditForm from "@/components/form/users/UserEditForm";
import LoadingFetchData from "@/components/ui/loading/LoadingFetchData";
import { PATH } from "@/routes/path";
import {
  editUserSchema,
  type EditUserFormData,
} from "@/schemas/editUser.schema";
import { roleService } from "@/services/role.service";
import { userService } from "@/services/user.service";
import type { Role } from "@/types/role";
// import type { User } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const EditUserPage = () => {
  const { id } = useParams();
  // const [user, setUser] = useState<User>();
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EditUserFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role_id: 0,
    },
    resolver: zodResolver(editUserSchema),
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;

      setLoading(true);

      try {
        const res = await userService.show(Number(id));

        reset({
          name: res.data.name,
          email: res.data.email,
          password: "",
          password_confirmation: "",
          role_id: res.data.role_id,
        });
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, reset]);

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

  const onSubmit = async (payload: EditUserFormData) => {
    if (!id) return;

    try {
      if (!payload.password) {
        delete payload.password;
        delete payload.password_confirmation;
      }

      const response = await userService.update(Number(id), payload);

      toast.success(response.message);

      reset();

      navigate(PATH.USERS);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        const errors = error.response.data.errors;

        Object.entries(errors).forEach(([field, messages]) => {
          setError(field as keyof EditUserFormData, {
            type: "server",
            message: (messages as string[])[0],
          });
        });

        return;
      }

      toast.error("Terjadi kesalahan.");
    }
  };

  if (loading) return <LoadingFetchData />;

  return (
    <>
      <PageHeader title="Edit User" />
      <div className="space-y-6">
        <ComponentCard title="Edit Data User">
          <UserEditForm
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

export default EditUserPage;
