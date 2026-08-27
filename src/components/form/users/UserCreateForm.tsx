import Input from "@/components/ui/input/Input";
import Label from "@/components/ui/input/Label";
import Select from "@/components/ui/input/Select";

import { useForm } from "react-hook-form";

import {
  userSchema,
  type UserFormInput,
  type UserFormOutput,
} from "@/schemas/user.schema";
import { PATH } from "@/routes/path";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRoles } from "@/hooks/queries/useRoles";
import BackButton from "@/components/button/BackButton";
import SubmitButton from "@/components/button/SubmitButton";
import { useCreateUser } from "@/hooks/mutations/useCreateUser";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import axios from "axios";
import { handleFormError } from "@/utils/handleFormError";

const UserCreateForm = () => {
  const navigate = useNavigate();
  const { data: roles, isLoading } = useRoles();

  const createUser = useCreateUser();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty },
  } = useForm<UserFormInput, unknown, UserFormOutput>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role_id: "",
    },
    resolver: zodResolver(userSchema),
  });

  const onSubmit = (data: UserFormOutput) => {
    createUser.mutate(data, {
      onSuccess: (response) => {
        toast.success(response.message);
        navigate(PATH.USERS);
      },

      onError: (error) => {
        const isValidationError = handleFormError<UserFormInput>(
          error,
          setError,
        );

        if (isValidationError) return;

        toast.error("Terjadi kesalahan.");
      },
    });
  };

  return (
    <>
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
              type="email"
              id="email"
              placeholder="Email"
              error={!!errors.email}
              hint={errors.email?.message}
              {...register("email")}
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              error={!!errors.password}
              hint={errors.password?.message}
              {...register("password")}
            />
          </div>

          <div>
            <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
            <Input
              type="password"
              id="password_confirmation"
              placeholder="Konfirmasi Password"
              error={!!errors.password_confirmation}
              hint={errors.password_confirmation?.message}
              {...register("password_confirmation")}
            />
          </div>

          <div>
            <Label htmlFor="role_id">Role</Label>
            <Select
              placeholder={isLoading ? "-- Memuat Role --" : "-- Pilih Role --"}
              className="dark:bg-dark-900"
              error={!!errors.role_id}
              hint={errors.role_id?.message}
              {...register("role_id")}
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
              disabled={!isDirty || createUser.isPending}
              text={createUser.isPending ? "Menyimpan..." : "Simpan"}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default UserCreateForm;
