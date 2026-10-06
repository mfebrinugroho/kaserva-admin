import { Link } from "react-router";
import { cn } from "@/libs/utils";

interface Props {
  url: string;
  text?: string;
  clasName?: string;
}

const BackButton = ({ url, text = "Kembali", clasName }: Props) => {
  return (
    <Link
      to={url}
      className={cn(
        "w-full sm:w-30 text-center rounded-lg bg-error-500 px-4 py-3 text-sm font-medium text-white transition shadow-theme-xs hover:bg-error-600",
        clasName,
      )}
    >
      {text}
    </Link>
  );
};

export default BackButton;
