import { cn } from "@/libs/utils";

const RoleBadge = ({
  role,
  children,
  className,
}: {
  role: string;
  children: React.ReactNode;
  className?: string;
}) => {
  let classRole = "";

  switch (role) {
    case "super-admin":
      classRole =
        "bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400";
      break;
    case "admin":
      classRole =
        "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400";
      break;
    case "owner":
      classRole =
        "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400";
      break;
    case "customer":
      classRole =
        "bg-gray-100 text-gray-700 dark:bg-gray-500/15 dark:text-gray-400";
      break;
    case "cashier":
      classRole =
        "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400";
      break;
    case "kitchen":
      classRole =
        "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400";
      break;
  }
  return (
    <>
      <span
        className={cn(
          "inline-flex items-center justify-center gap-1 rounded-full px-2.5 py-0.5 text-sm font-medium ",
          classRole,
          className,
        )}
      >
        {children}
      </span>
    </>
  );
};

export default RoleBadge;
