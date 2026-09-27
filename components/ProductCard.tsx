import Link from "next/link";

import type { Product } from "@/lib/products";
import { whatsappLink } from "@/lib/whatsapp";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const message = `Bonjour Ay-Habo, je veux commander : ${product.name} (${product.defaultVariant}) à ${product.price} FCFA`;

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md">
      <Link href={`/produits/${product.slug}`} className="block" aria-label={`Voir ${product.name}`}>
        <div className="relative aspect-square overflow-hidden bg-slate-100">
          <img src={`/${product.images[0]}`} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
          <span className="absolute left-3 top-3 rounded-full bg-[#0A2342] px-3 py-1 text-xs font-semibold text-white">
            {product.badge}
          </span>
        </div>
      </Link>

      <div className="p-4 sm:p-5">
        <div className="text-sm font-medium text-emerald-700">
          <span aria-hidden="true">✅ </span>En stock
        </div>
        <h3 className="mt-2 text-lg font-semibold leading-snug text-[#0A2342]">
          <Link href={`/produits/${product.slug}`} className="hover:underline">{product.name}</Link>
        </h3>
        <p className="mt-2 min-h-10 text-sm leading-5 text-slate-600">{product.benefit}</p>
        <p className="mt-4 text-xl font-bold text-[#0A2342]">
          {new Intl.NumberFormat("fr-FR").format(product.price)} FCFA
        </p>
        <a
          href={whatsappLink(message, "niger")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[#0A2342] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#12365f] focus:outline-none focus:ring-2 focus:ring-[#0A2342] focus:ring-offset-2"
        >
          Commander sur WhatsApp
        </a>
      </div>
    </article>
  );
}
