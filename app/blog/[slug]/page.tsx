import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getBlogPostBySlug, getBlogPosts, getRelatedPosts } from "@/lib/blog";
import { products } from "@/lib/products";

const SITE_URL = "https://www.ayhabo.com";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function normalize(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function prepareBlogHtml(html: string): string {
  return html
    .replace(/href=(["'])\/produit\//g, 'href=$1/produits/')
    .replace(/href=(["'])https?:\/\/www\\.ayhabo\\.com\/produit\//g, 'href=$1https://www.ayhabo.com/produits/');
}


export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article introuvable | Ay-Habo",
      description: "Cet article Ay-Habo est introuvable.",
    };
  }

  return {
    title: `${post.title} | Ay-Habo`,
    description: `${post.excerpt} Conseils et guides pour le Niger et le Bénin.`,
  };
}

export default async function BlogArticlePage({
  params,
}: BlogArticlePageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post.id, 3);
  const recommendedProduct = products.find(
    (product) => normalize(product.category) === normalize(post.category),
  );

  const articleUrl = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = post.image
    ? new URL(post.image, SITE_URL).toString()
    : `${SITE_URL}/assets/logo.svg`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: "Ay-Habo",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Ay-Habo",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/logo.svg`,
      },
    },
    image: imageUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  };

  return (
    <article className="bg-slate-50 py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Fil d’Ariane" className="mb-8 text-sm text-slate-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-[#0A2342]">Accueil</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/blog" className="hover:text-[#0A2342]">Blog</Link></li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-slate-700">{post.title}</li>
          </ol>
        </nav>

        <header className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            {post.category && (
              <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-orange-600">
                {post.category}
              </span>
            )}
            <time dateTime={post.publishedAt} className="text-sm text-slate-500">
              {formatDate(post.publishedAt)}
            </time>
          </div>
          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-[#0A2342] sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
        </header>

        <div className="mt-6 overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200">
          {post.image ? (
            <img src={post.image} alt={post.title} className="max-h-[520px] w-full object-cover" />
          ) : (
            <div className="flex min-h-[260px] items-center justify-center bg-[#0A2342] px-8 text-center text-lg font-semibold text-white">
              Ay-Habo — Blog &amp; conseils
            </div>
          )}
        </div>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-10">
          <div
            className="prose prose-slate max-w-none prose-headings:text-[#0A2342] prose-a:text-[#0A2342] prose-strong:text-[#0A2342]"
            dangerouslySetInnerHTML={{ __html: prepareBlogHtml(post.content) }}
          />
        </div>

        {recommendedProduct && (
          <section className="mt-10 rounded-2xl bg-orange-50 p-6 ring-1 ring-orange-100 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-orange-600">
              🛒 Produit recommandé
            </p>
            <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#0A2342]">
                  {recommendedProduct.name}
                </h2>
                <p className="mt-2 text-slate-600">{recommendedProduct.benefit}</p>
                <p className="mt-3 text-lg font-bold text-[#0A2342]">
                  {new Intl.NumberFormat("fr-FR").format(recommendedProduct.price)} FCFA
                </p>
              </div>
              <Link
                href={`/produits/${recommendedProduct.slug}`}
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#0A2342] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#12365f]"
              >
                Découvrir le produit
              </Link>
            </div>
          </section>
        )}

        {relatedPosts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-[#0A2342]">Articles similaires</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost.id}
                  className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
                >
                  {relatedPost.category && (
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-orange-500">
                      {relatedPost.category}
                    </p>
                  )}
                  <h3 className="mt-2 text-lg font-bold leading-6 text-[#0A2342]">
                    <Link href={`/blog/${relatedPost.slug}`} className="hover:text-orange-600">
                      {relatedPost.title}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                    {relatedPost.excerpt}
                  </p>
                  <Link
                    href={`/blog/${relatedPost.slug}`}
                    className="mt-4 inline-flex text-sm font-semibold text-[#0A2342] underline underline-offset-2"
                  >
                    Lire la suite
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
