import type { Metadata } from "next";
import Link from "next/link";

import CheckoutForm from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Finaliser ma commande — Ay-Habo",
  description:
    "Finalisez votre commande Ay-Habo. Confirmation sur WhatsApp, livraison 4-6 jours en Afrique de l'Ouest.",
};

export default function CheckoutPage() {
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
            <li>
              <Link href="/panier" className="hover:text-[#0A2342]">
                Panier
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-slate-700">Commande</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold tracking-tight text-[#0A2342] sm:text-4xl">
          Finaliser ma commande
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          Renseignez vos informations. Votre commande sera préparée dans un
          message WhatsApp pour confirmation.
        </p>

        <CheckoutForm />
      </div>
    </section>
  );
}
