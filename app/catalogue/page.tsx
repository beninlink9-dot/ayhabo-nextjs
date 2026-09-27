import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { categories } from "@/lib/categories";
import { getAllProducts } from "@/lib/products";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Catalogue Ay-Habo — Tous nos produits disponibles",
  description: "Découvrez le catalogue complet Ay-Habo : cuisine, maison, solaire, électronique. Livraison 4-6 jours au Niger et Bénin.",
};

type CataloguePageProps = { searchParams: Promise<{ cat?: string; q?: string; sort?: string }> };
type SortOption = "relevance" | "price-asc" | "price-desc";

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function getSortOption(value?: string): SortOption {
  if (value === "price-asc" || value === "price-desc") return value;
  return "relevance";
}

export default async function CataloguePage({ searchParams }: CataloguePageProps) {
  const params = await searchParams;
  const products = await getAllProducts();
  const category = params.cat ?? "";
  const query = params.q ?? "";
  const sort = getSortOption(params.sort);
  const normalizedQuery = normalize(query);
  const normalizedCategory = normalize(category);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = !normalizedCategory || normalizedCategory === "toutes" ||
      normalize(product.category) === normalizedCategory;
    const searchableText = normalize(
      [product.name, product.id, product.sku, product.slug, product.benefit, product.description].join(" ")
    );
    return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
  }).sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return a.position - b.position;
  });

  const emptyMessage = query
    ? "Aucun produit ne correspond à « " + query + " »."
    : category
      ? "Aucun produit disponible dans la catégorie « " + category + " »."
      : "Aucun produit ne correspond aux filtres sélectionnés.";

  const whatsappMessage = query
    ? "Bonjour Ay-Habo, je recherche : " + query
    : category
      ? "Bonjour Ay-Habo, je recherche un produit dans la catégorie : " + category
      : "Bonjour Ay-Habo, je souhaite demander un produit du catalogue.";

  return (
    <section className="bg-slate-50 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-500">Ay-Habo</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#0A2342] sm:text-4xl">Catalogue</h1>
          <p className="mt-3 max-w-2xl text-slate-600">Découvrez les produits actuellement disponibles et filtrez la sélection selon vos besoins.</p>
        </header>

        <form method="get" className="mb-8 grid gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-5 lg:grid-cols-[1.6fr_1fr_1fr_auto]">
          <label className="block"><span className="mb-2 block text-sm font-semibold text-[#0A2342]">Rechercher</span><input type="search" name="q" defaultValue={query} placeholder="Nom, référence ou bénéfice" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900" /></label>
          <label className="block"><span className="mb-2 block text-sm font-semibold text-[#0A2342]">Catégorie</span><select name="cat" defaultValue={category} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900"><option value="">Toutes</option>{categories.map((item) => <option key={item.name} value={item.name}>{item.name}</option>)}</select></label>
          <label className="block"><span className="mb-2 block text-sm font-semibold text-[#0A2342]">Trier par prix</span><select name="sort" defaultValue={sort} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900"><option value="relevance">Pertinence</option><option value="price-asc">Prix croissant</option><option value="price-desc">Prix décroissant</option></select></label>
          <button type="submit" className="self-end rounded-xl bg-[#0A2342] px-5 py-3 text-sm font-semibold text-white">Filtrer</button>
        </form>

        {filteredProducts.length > 0 ? (
          <>
            <p className="mb-5 text-sm text-slate-600">{filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""} disponible{filteredProducts.length > 1 ? "s" : ""}</p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
          </>
        ) : (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200 sm:p-12">
            <h2 className="text-2xl font-bold text-[#0A2342]">Aucun produit trouvé</h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-600">{emptyMessage} Vous pouvez nous demander directement ce que vous recherchez sur WhatsApp.</p>
            <a href={whatsappLink(whatsappMessage, "niger")} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-xl bg-[#0A2342] px-5 py-3 text-sm font-semibold text-white">Demander sur WhatsApp</a>
          </div>
        )}
      </div>
    </section>
  );
}
