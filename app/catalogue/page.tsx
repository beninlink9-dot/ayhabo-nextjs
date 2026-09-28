import type { Metadata } from "next";

import CatalogFilters from "@/components/CatalogFilters";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Catalogue Ay-Habo — Tous nos produits disponibles",
  description:
    "Découvrez le catalogue complet Ay-Habo : cuisine, maison, solaire, électronique. Livraison 4-6 jours au Niger et Bénin.",
};

type CataloguePageProps = {
  searchParams: Promise<{
    cat?: string;
    q?: string;
    sort?: string;
  }>;
};

type SortOption = "relevance" | "price-asc" | "price-desc";

function getSortOption(value?: string): SortOption {
  if (value === "price-asc" || value === "price-desc") {
    return value;
  }

  return "relevance";
}

export default async function CataloguePage({
  searchParams,
}: CataloguePageProps) {
  const params = await searchParams;
  const products = await getAllProducts();

  return (
    <section className="bg-slate-50 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-500">
            Ay-Habo
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#0A2342] sm:text-4xl">
            Catalogue
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Découvrez les produits actuellement disponibles et filtrez la sélection selon vos besoins.
          </p>
        </header>

        <CatalogFilters
          products={products}
          initialQuery={params.q ?? ""}
          initialCategory={params.cat ?? ""}
          initialSort={getSortOption(params.sort)}
        />
      </div>
    </section>
  );
}
