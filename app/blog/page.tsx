import type { Metadata } from "next";
import Link from "next/link";

import { getBlogPosts } from "@/lib/blog";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Blog & conseils Ay-Habo — Guides d’achat et astuces",
  description:
    "Découvrez nos guides d’achat et conseils pour bien choisir vos produits au Niger et au Bénin. Livraison 4-6 jours.",
};

type BlogPageProps = {
  searchParams: Promise<{
    cat?: string;
  }>;
};

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const selectedCategory = params.cat?.trim() ?? "";
  const posts = await getBlogPosts();

  const categories = Array.from(
    new Set(
      posts.map((post) => post.category).filter((category) => category.trim().length > 0),
    ),
  ).sort((a, b) => a.localeCompare(b, "fr"));

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts;

  const whatsappUrl = whatsappLink(
    "Bonjour Ay-Habo, je souhaite obtenir des conseils pour choisir un produit.",
    "niger",
  );

  return (
    <section className="bg-slate-50 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-500">Ay-Habo</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#0A2342] sm:text-4xl">Blog &amp; conseils Ay-Habo</h1>
          <p className="mt-3 max-w-2xl text-slate-600">Guides d’achat et conseils pratiques pour bien choisir vos produits au Niger et au Bénin.</p>
        </header>

        {categories.length > 0 && (
          <nav aria-label="Filtrer les articles par catégorie" className="mb-8 flex flex-wrap gap-2">
            <Link href="/blog" className={`rounded-full px-4 py-2 text-sm font-semibold transition ${!selectedCategory ? "bg-[#0A2342] text-white" : "bg-white text-[#0A2342] ring-1 ring-slate-200 hover:bg-slate-100"}`}>Toutes</Link>
            {categories.map((category) => (
              <Link key={category} href={`/blog?cat=${encodeURIComponent(category)}`} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${selectedCategory === category ? "bg-[#0A2342] text-white" : "bg-white text-[#0A2342] ring-1 ring-slate-200 hover:bg-slate-100"}`}>{category}</Link>
            ))}
          </nav>
        )}

        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article key={post.id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                <Link href={`/blog/${post.slug}`} className="block focus:outline-none focus:ring-2 focus:ring-[#0A2342] focus:ring-inset">
                  <div className="aspect-[16/9] bg-slate-100">
                    {post.image ? <img src={post.image} alt={post.title} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center bg-[#0A2342] px-6 text-center text-sm font-semibold text-white">Ay-Habo — Blog &amp; conseils</div>}
                  </div>
                </Link>
                <div className="p-5">
                  {post.category && <p className="text-xs font-semibold uppercase tracking-[0.12em] text-orange-500">{post.category}</p>}
                  <h2 className="mt-2 text-xl font-bold leading-7 text-[#0A2342]"><Link href={`/blog/${post.slug}`} className="hover:text-orange-600">{post.title}</Link></h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{post.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <time dateTime={post.publishedAt} className="text-xs text-slate-500">{formatDate(post.publishedAt)}</time>
                    <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-[#0A2342] underline underline-offset-2 hover:text-orange-600">Lire la suite</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200 sm:p-12">
            <h2 className="text-2xl font-bold text-[#0A2342]">Aucun article disponible</h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-600">{selectedCategory ? `Aucun article n’est disponible dans la catégorie « ${selectedCategory} ». ` : "Les articles du blog seront bientôt disponibles. "}Vous pouvez aussi nous demander directement un conseil sur WhatsApp.</p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#0A2342] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#12365f] focus:outline-none focus:ring-2 focus:ring-[#0A2342] focus:ring-offset-2">Demander conseil sur WhatsApp</a>
          </div>
        )}
      </div>
    </section>
  );
}