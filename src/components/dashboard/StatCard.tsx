import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  title: string;
  value: string;
  change: string;
  icon: ReactNode;
  positive?: boolean;
};

export default function StatCard({
  title,
  value,
  change,
  icon,
  positive = true,
}: Props) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div className="rounded-2xl bg-indigo-100 p-3 text-indigo-600 transition group-hover:scale-110 dark:bg-indigo-500/10">
          {icon}
        </div>

        <div
          className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold ${
            positive
              ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10"
              : "bg-red-100 text-red-600 dark:bg-red-500/10"
          }`}
        >
          {positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}

          {change}
        </div>
      </div>

      <p className="mt-6 text-sm text-slate-500">{title}</p>

      <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        {value}
      </h2>
    </div>
  );
}
