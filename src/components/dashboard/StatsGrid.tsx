import { ShoppingBag, Wallet, Star, UtensilsCrossed } from "lucide-react";

import StatCard from "@/components/dashboard/StatCard";

export default function StatsGrid() {
  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Pesanan Hari Ini"
        value="24"
        change="+12%"
        positive
        icon={<ShoppingBag size={22} />}
      />

      <StatCard
        title="Pendapatan"
        value="Rp2.150.000"
        change="+18%"
        positive
        icon={<Wallet size={22} />}
      />

      <StatCard
        title="Menu Terjual"
        value="128"
        change="+9%"
        positive
        icon={<UtensilsCrossed size={22} />}
      />

      <StatCard
        title="Rating"
        value="4.9"
        change="+0.2"
        positive
        icon={<Star size={22} />}
      />
    </section>
  );
}
