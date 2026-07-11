import { ArrowRight, Clock3, CheckCircle2, ChefHat } from "lucide-react";

const orders = [
  {
    id: "INV-240601",
    customer: "Budi Santoso",
    total: "Rp82.000",
    status: "Diproses",
  },
  {
    id: "INV-240602",
    customer: "Andi",
    total: "Rp56.000",
    status: "Menunggu",
  },
  {
    id: "INV-240603",
    customer: "Rina",
    total: "Rp120.000",
    status: "Siap Diambil",
  },
  {
    id: "INV-240604",
    customer: "Salsa",
    total: "Rp45.000",
    status: "Selesai",
  },
];

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "Menunggu":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
          <Clock3 size={14} />
          {status}
        </span>
      );

    case "Diproses":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-500/10 dark:text-sky-400">
          <ChefHat size={14} />
          {status}
        </span>
      );

    default:
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
          <CheckCircle2 size={14} />
          {status}
        </span>
      );
  }
}

export default function RecentOrders() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-200 p-6 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-semibold dark:text-white">
            Pesanan Terbaru
          </h2>

          <p className="text-sm text-slate-500">Pesanan yang baru masuk</p>
        </div>

        <button className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700">
          Lihat Semua
          <ArrowRight size={18} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-800/40">
            <tr className="text-left">
              <th className="px-6 py-4 text-sm font-medium text-slate-500">
                Invoice
              </th>

              <th className="px-6 py-4 text-sm font-medium text-slate-500">
                Pelanggan
              </th>

              <th className="px-6 py-4 text-sm font-medium text-slate-500">
                Total
              </th>

              <th className="px-6 py-4 text-sm font-medium text-slate-500">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t border-slate-100 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/40"
              >
                <td className="px-6 py-5 font-semibold dark:text-white">
                  {order.id}
                </td>

                <td className="px-6 py-5 text-slate-600 dark:text-slate-300">
                  {order.customer}
                </td>

                <td className="px-6 py-5 font-medium dark:text-white">
                  {order.total}
                </td>

                <td className="px-6 py-5">
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
