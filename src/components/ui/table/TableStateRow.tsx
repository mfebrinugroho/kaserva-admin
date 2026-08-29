import { LoaderCircle } from "lucide-react";
import { TableCell, TableRow } from ".";

interface TableStateRowProps {
  colSpan: number;
  type: "loading" | "empty";
  message?: string;
}

export default function TableStateRow({
  colSpan,
  type,
  message = "Data tidak ditemukan.",
}: TableStateRowProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan}>
        <div className="flex min-h-16 items-center justify-center">
          {type === "loading" ? (
            <LoaderCircle
              size={24}
              className="animate-spin [animation-duration:1.2s] text-gray-700 dark:text-gray-400"
            />
          ) : (
            <p className="text-theme-sm font-semibold text-gray-700 dark:text-gray-400">
              {message}
            </p>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
