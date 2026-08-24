import { cn } from "@/libs/utils";
import type { ReactNode } from "react";

// Props for Table
interface TableProps {
  children: ReactNode; // Table content (thead, tbody, etc.)
  className?: string; // Optional className for styling
}

// Props for TableHeader
interface TableHeaderProps {
  children: ReactNode; // Header row(s)
  className?: string; // Optional className for styling
}

// Props for TableBody
interface TableBodyProps {
  children: ReactNode; // Body row(s)
  className?: string; // Optional className for styling
}

// Props for TableRow
interface TableRowProps {
  children: ReactNode; // Cells (th or td)
  className?: string; // Optional className for styling
  variant?: "header" | "body";
}

// Props for TableCell
interface TableCellProps {
  children: ReactNode; // Cell content
  isHeader?: boolean; // If true, renders as <th>, otherwise <td>
  className?: string; // Optional className for styling
  colSpan?: number; // Optional colSpan for the cell
  variant?: "header" | "body";
}

// Table Component
const Table: React.FC<TableProps> = ({ children, className }) => {
  return <table className={`min-w-full  ${className}`}>{children}</table>;
};

// TableHeader Component
const TableHeader: React.FC<TableHeaderProps> = ({ children, className }) => {
  return (
    <thead
      className={cn("border-b border-gray-200 dark:border-gray-800", className)}
    >
      {children}
    </thead>
  );
};

// TableBody Component
const TableBody: React.FC<TableBodyProps> = ({ children, className }) => {
  return (
    <tbody
      className={cn("divide-y divide-gray-100 dark:divide-white/5", className)}
    >
      {children}
    </tbody>
  );
};

// TableRow Component
const TableRow: React.FC<TableRowProps> = ({
  children,
  className,
  variant = "body",
}) => {
  const variantClass = {
    header: "border-t border-gray-200 dark:border-white/10",
    body: "border-t border-gray-100 dark:border-white/5",
  };

  return (
    <tr className={`${variantClass[variant]} ${className ?? ""}`}>
      {children}
    </tr>
  );
};

// TableCell Component
const TableCell: React.FC<TableCellProps> = ({
  children,
  isHeader = false,
  className,
  colSpan,
  variant = "body",
}) => {
  const CellTag = isHeader ? "th" : "td";

  const variantClass = {
    header: "border border-gray-200 px-4 py-3 dark:border-white/10",
    body: "border border-gray-100 px-4 py-[17.5px] dark:border-white/5",
  };
  return (
    <CellTag
      className={`${variantClass[variant]} ${className ?? ""}`}
      colSpan={colSpan}
    >
      {children}
    </CellTag>
  );
};

export { Table, TableHeader, TableBody, TableRow, TableCell };
