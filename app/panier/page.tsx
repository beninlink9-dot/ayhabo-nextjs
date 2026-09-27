import type { Metadata } from "next";
import Link from "next/link";

import CartContent from "@/components/CartContent";

export const metadata: Metadata = {
  title: "Votre panier — Ay-Habo",
  description:
    "Vérifiez vos articles et finalisez votre commande Ay-Habo. Livraison 4-6 jours en Afrique de l'Ouest.",
};

export default function CartPage() {
  return (
    <section className="bg-slate-50 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Fil d’Ariane" className="mb-6 text-sm text-slate-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-[#0A2342]">
                Accueil
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-slate-700">Panier</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold tracking-tight text-[#0A2342] sm:text-4xl">
          Votre panier
        </h1>

        <CartContent />
      </div>
    </section>
  );
}
