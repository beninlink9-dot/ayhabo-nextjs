import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import { getRelatedProducts, productBySlug, products } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);

  if (!product) {
    return {
      title: "Produit introuvable | Ay-Habo",
      description: "Ce produit n'est pas disponible.",
    };
  }

  return {
    title: `${product.name} — ${new Intl.NumberFormat("fr-FR").format(product.price)} FCFA | Ay-Habo`,
    description: `${product.benefit} Livraison 4-6 jours Niger/Bénin.`,
  };
}

const testimonials = [
  { name: "Aïcha M.", text: "Commande reçue comme prévu. Le produit correspondait à la présentation." },
  { name: "Moussa A.", text: "Échange simple sur WhatsApp et réception sans difficulté." },
  { name: "Fatou S.", text: "Produit bien emballé et conforme à ma commande." },
] as const;

function Stars() {
  return <span aria-label="5 étoiles" className="text-amber-500" aria-hidden="true">★★★★★</span>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = productBySlug(slug);

  if (!product) notFound();

  const relatedProducts = getRelatedProducts(product.id, 4);
  const price = new Intl.NumberFormat("fr-FR").format(product.price);
  const productUrl = `https://ayhabo.com/produits/${product.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((image) => `https://ayhabo.com/${image}`),
    description: product.description,
    brand: { "@type": "Brand", name: "Ay-Habo" },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "XOF",
      availability: "https://schema.org/InStock",
      url: productUrl,
      itemCondition: "https://schema.org/NewCondition",
    },
    areaServed: ["Niger", "Bénin", "Côte d’Ivoire", "Burkina Faso", "Mali", "Guinée", "Nigeria", "Togo", "Sénégal"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="bg-slate-50 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Fil d’Ariane" className="mb-6 text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-[#0A2342]">Accueil</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/catalogue" className="hover:text-[#0A2342]">Catalogue</Link></li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-slate-700">{product.name}</li>
            </ol>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
            <ProductGallery product={product} />
            <div>
              <div className="inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200">
                <span aria-hidden="true">✅ </span>En stock. Expédié sous 24h.
              </div>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#0A2342] sm:text-4xl">{product.name}</h1>
              <p className="mt-2 text-sm text-slate-500">Référence : {product.id}</p>
              <p className="mt-5 text-3xl font-bold text-[#0A2342]">{price} FCFA</p>
              <p className="mt-3 text-base leading-7 text-slate-700">{product.benefit}</p>

              <div className="mt-6 rounded-2xl bg-orange-50 p-4 ring-1 ring-orange-100">
                <p className="text-sm font-semibold leading-6 text-[#0A2342]">
                  🚚 Frais de livraison calculés selon votre ville et le poids du colis. Confirmation exacte sur WhatsApp avant paiement.
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  <span className="font-semibold text-[#0A2342]">Zones desservies :</span>{" "}
                  Niger, Bénin, Côte d’Ivoire, Burkina Faso, Mali, Guinée Conakry, Nigeria, Togo et Sénégal.
                </p>
                <Link href="/livraison" className="mt-3 inline-flex text-sm font-semibold text-[#0A2342] underline underline-offset-2 hover:text-orange-600">
                  Voir les conditions de livraison
                </Link>
              </div>

              <dl className="mt-6 grid grid-cols-1 gap-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:grid-cols-3">
                <div><dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Délai estimé</dt><dd className="mt-1 font-semibold text-[#0A2342]">4-6 jours</dd></div>
                <div><dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Garantie</dt><dd className="mt-1 font-semibold text-[#0A2342]">{product.warranty}</dd></div>
                <div><dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Stock</dt><dd className="mt-1 font-semibold text-[#0A2342]">{product.stock} disponible{product.stock > 1 ? "s" : ""}</dd></div>
              </dl>
            </div>
          </div>

          <div className="mt-12 space-y-4">
            <details open className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"><summary className="cursor-pointer font-semibold text-[#0A2342]">Description</summary><p className="mt-4 leading-7 text-slate-700">{product.description}</p></details>
            <details className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"><summary className="cursor-pointer font-semibold text-[#0A2342]">Caractéristiques</summary><ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">{product.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></details>
            <details className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"><summary className="cursor-pointer font-semibold text-[#0A2342]">Contenu du colis</summary><ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">{product.package.map((item) => <li key={item}>{item}</li>)}</ul></details>
            <details className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"><summary className="cursor-pointer font-semibold text-[#0A2342]">Garantie et retour</summary><p className="mt-4 leading-7 text-slate-700">{product.returnPolicy}</p></details>
          </div>

          <section className="mt-14">
            <div className="mb-6"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-500">Ils témoignent</p><h2 className="mt-2 text-2xl font-bold text-[#0A2342]">Avis clients</h2></div>
            <div className="grid gap-4 md:grid-cols-3">{testimonials.map((testimonial) => <article key={testimonial.name} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"><Stars /><p className="mt-3 text-sm leading-6 text-slate-700">“{testimonial.text}”</p><p className="mt-4 text-sm font-semibold text-[#0A2342]">{testimonial.name}</p></article>)}</div>
          </section>

          {relatedProducts.length > 0 && <section className="mt-14"><div className="mb-6"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-500">À découvrir</p><h2 className="mt-2 text-2xl font-bold text-[#0A2342]">Produits associés</h2></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{relatedProducts.map((relatedProduct) => <ProductCard key={relatedProduct.id} product={relatedProduct} />)}</div></section>}
        </div>
      </section>
    </>
  );
}
