"use client";

import { useEffect, useMemo, useState } from "react";

import ProductCard from "@/components/ProductCard";
import { categories } from "@/lib/categories";
import { whatsappLink } from "@/lib/whatsapp";
import type { Product } from "@/lib/products";

type SortOption = "relevance" | "price-asc" | "price-desc";

type Filters = {
  search: string;
  category: string;
  sort: SortOption;
};

type CatalogFiltersProps = {
  products: Product[];
  initialQuery?: string;
  initialCategory?: string;
  initialSort?: SortOption;
};

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function getSortOption(value?: string): SortOption {
  if (value === "price-asc" || value === "price-desc") return value;
  return "relevance";
}

export default function CatalogFilters({
  products,
  initialQuery = "",
  initialCategory = "",
  initialSort = "relevance",
}: CatalogFiltersProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<Filters>({
    search: initialQuery,
    category: initialCategory,
    sort: getSortOption(initialSort),
  });

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setFilters((previous) => ({
        ...previous,
        search: searchQuery,
      }));
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [searchQuery]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.search.trim()) params.set("q", filters.search.trim());
    if (filters.category) params.set("cat", filters.category);
    if (filters.sort !== "relevance") params.set("sort", filters.sort);

    const queryString = params.toString();
    const nextUrl = queryString ? `/catalogue?${queryString}` : "/catalogue";
    const currentUrl = window.location.pathname + window.location.search;

    if (nextUrl !== currentUrl) {
      window.history.replaceState(window.history.state, "", nextUrl);
    }
  }, [filters]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = normalize(filters.search);
    const normalizedCategory = normalize(filters.category);

    return products
      .filter((product) => {
        const categoryMatches =
          !normalizedCategory ||
          normalizedCategory === "toutes" ||
          normalize(product.category) === normalizedCategory;

        if (!categoryMatches) return false;
        if (!normalizedSearch) return true;

        const searchableText = normalize(
          [
            product.name,
            product.id,
            product.sku,
            product.slug,
            product.benefit,
            product.description,
          ].join(" "),
        );

        return searchableText.includes(normalizedSearch);
      })
      .sort((a, b) => {
        if (filters.sort === "price-asc") return a.price - b.price;
        if (filters.sort === "price-desc") return b.price - a.price;
        return a.position - b.position;
      });
  }, [products, filters]);

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    filters.category.length > 0 ||
    filters.sort !== "relevance";

  function handleCategoryChange(category: string) {
    setFilters((previous) => ({ ...previous, category }));
  }

  function handleSortChange(sort: SortOption) {
    setFilters((previous) => ({ ...previous, sort }));
  }

  function resetFilters() {
    setSearchQuery("");
    setFilters({
      search: "",
      category: "",
      sort: "relevance",
    });
    window.history.replaceState(window.history.state, "", "/catalogue");
  }

  const emptyMessage = filters.search
    ? `Aucun produit ne correspond à « ${filters.search} ».`
    : filters.category
      ? `Aucun produit disponible dans la catégorie « ${filters.category} ».`
      : "Aucun produit ne correspond aux filtres sélectionnés.";

  const whatsappMessage = filters.search
    ? `Bonjour Ay-Habo, je recherche : ${filters.search}`
    : filters.category
      ? `Bonjour Ay-Habo, je recherche un produit dans la catégorie : ${filters.category}`
      : "Bonjour Ay-Habo, je souhaite demander un produit du catalogue.";

  return (
    <>
      <div className="mb-8 grid gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-5 lg:grid-cols-[1.6fr_1fr_1fr_auto]">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#0A2342]">
            Rechercher
          </span>
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Nom, référence ou bénéfice"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#0A2342] focus:ring-2 focus:ring-[#0A2342]/10"
            aria-label="Rechercher un produit"
            autoComplete="off"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#0A2342]">
            Catégorie
          </span>
          <select
            value={filters.category}
            onChange={(event) => handleCategoryChange(event.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#0A2342] focus:ring-2 focus:ring-[#0A2342]/10"
            aria-label="Filtrer par catégorie"
          >
            <option value="">Toutes</option>
            {categories.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[#0A2342]">
            Trier par prix
          </span>
          <select
            value={filters.sort}
            onChange={(event) =>
              handleSortChange(getSortOption(event.target.value))
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#0A2342] focus:ring-2 focus:ring-[#0A2342]/10"
            aria-label="Trier les produits"
          >
            <option value="relevance">Pertinence</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
          </select>
        </label>

        <div className="flex items-end">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="w-full rounded-xl px-5 py-3 text-sm font-semibold text-[#0A2342] underline underline-offset-4 transition hover:text-orange-500 lg:w-auto"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>
      </div>

      <div className="mb-5" aria-live="polite">
        <p className="text-sm text-slate-600">
          {filteredProducts.length} produit
          {filteredProducts.length > 1 ? "s" : ""} trouvé
          {filteredProducts.length > 1 ? "s" : ""}
        </p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div
          className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200 sm:p-12"
          aria-live="polite"
        >
          <h2 className="text-2xl font-bold text-[#0A2342]">
            Aucun produit trouvé
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            {emptyMessage} Vous pouvez nous demander directement ce que vous recherchez sur WhatsApp.
          </p>
          <a
            href={whatsappLink(whatsappMessage, "niger")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex rounded-xl bg-[#0A2342] px-5 py-3 text-sm font-semibold text-white"
          >
            Demander sur WhatsApp
          </a>
        </div>
      )}
    </>
  );
}
