import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import BackButton from "@/components/button/BackButton";
import SubmitButton from "@/components/button/SubmitButton";
import FormSkeleton from "@/components/loading/FormSkeleton";
import Input from "@/components/ui/input/Input";
import Label from "@/components/ui/input/Label";
import Select from "@/components/ui/input/Select";
import { useUpdateUser } from "@/hooks/mutations/useUpdateUser";
import { useRoles } from "@/hooks/queries/useRoles";
import { useUser } from "@/hooks/queries/useUser";
import { PATH } from "@/routes/path";
import {
  type UpdateUserFormInput,
  type UpdateUserFormOutput,
  updateUserSchema,
} from "@/schemas/updateUser.schema";
import { handleFormError } from "@/utils/handleFormError";

interface Props {
  userId: number;
}

const UserEditForm = ({ userId }: Props) => {
  const navigate = useNavigate();
  const { data: roles, isLoading: isLoadingRoles } = useRoles();
  const { data: user, isLoading: isLoadingUser } = useUser(userId);

  const updateUser = useUpdateUser();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isDirty },
  } = useForm<UpdateUserFormInput, unknown, UpdateUserFormOutput>({
    defaultValues: {
      name: "",
      email: "",
      role_id: "",
    },
    resolver: zodResolver(updateUserSchema),
  });

  useEffect(() => {
    if (!user) return;

    reset({
      name: user.data.name,
      email: user.data.email,
      role_id: String(user.data.role_id),
    });
  }, [user, reset]);

  const onSubmit = (data: UpdateUserFormOutput) => {
    updateUser.mutate(
      {
        userId,
        data,
      },
      {
        onSuccess: (response) => {
          toast.success(response.message);
          navigate(PATH.USERS);
        },
        onError: (error) => {
          const isValidationError = handleFormError<UpdateUserFormInput>(
            error,
            setError,
          );

          if (isValidationError) return;

          toast.error("Terjadi kesalahan.");
        },
      },
    );
  };

  if (isLoadingUser || !user) {
    return <FormSkeleton />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div>
          <Label htmlFor="name">Nama</Label>
          <Input
            type="text"
            id="name"
            placeholder="Nama User"
            error={!!errors.name}
            hint={errors.name?.message}
            {...register("name")}
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="text"
            id="email"
            placeholder="Email User"
            error={!!errors.email}
            hint={errors.email?.message}
            {...register("email")}
          />
        </div>

        <div>
          <Label htmlFor="role_id">Role</Label>
          <Select
            placeholder={
              isLoadingRoles ? "-- Memuat Role --" : "-- Pilih Role --"
            }
            className="dark:bg-dark-900"
            {...register("role_id")}
            error={!!errors.role_id}
            hint={errors.role_id?.message}
          >
            {roles?.data.map((role) => (
              <option
                key={role.id}
                value={role.id}
                className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
              >
                {role.name}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex justify-center sm:justify-end gap-4">
          <BackButton url={PATH.USERS} />
          <SubmitButton
            disabled={!isDirty || updateUser.isPending}
            text={updateUser.isPending ? "Menyimpan..." : "Simpan"}
          />
        </div>
      </div>
    </form>
  );
};

export default UserEditForm;
