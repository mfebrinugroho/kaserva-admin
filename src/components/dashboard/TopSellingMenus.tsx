import { Flame, Star, TrendingUp } from "lucide-react";

const menus = [
  {
    name: "Nasi Goreng Spesial",
    sold: 152,
    revenue: "Rp5.600.000",
  },
  {
    name: "Ayam Geprek",
    sold: 130,
    revenue: "Rp4.700.000",
  },
  {
    name: "Mie Goreng",
    sold: 98,
    revenue: "Rp3.200.000",
  },
  {
    name: "Es Teh Jumbo",
    sold: 86,
    revenue: "Rp1.000.000",
  },
];

export default function TopSellingMenus() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold dark:text-white">
            Menu Terlaris
          </h2>

          <p className="text-sm text-slate-500">Berdasarkan jumlah penjualan</p>
        </div>

        <TrendingUp className="text-emerald-500" />
      </div>

      <div className="space-y-5">
        {menus.map((menu, index) => (
          <div
            key={menu.name}
            className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/40"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 font-bold text-indigo-600 dark:bg-indigo-500/10">
              #{index + 1}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold dark:text-white">{menu.name}</h3>

                {index === 0 && <Flame size={18} className="text-orange-500" />}
              </div>

              <p className="mt-1 text-sm text-slate-500">{menu.sold} Terjual</p>
            </div>

            <div className="text-right">
              <h4 className="font-bold dark:text-white">{menu.revenue}</h4>

              <div className="mt-1 flex items-center justify-end gap-1 text-amber-500">
                <Star size={14} fill="currentColor" />

                <span className="text-xs font-semibold">Best Seller</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
