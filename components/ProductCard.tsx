"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { whatsappLink } from "@/lib/whatsapp";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [toastVisible, setToastVisible] = useState(false);
  const message = "Bonjour Ay-Habo, je veux commander : " + product.name + " (" + product.defaultVariant + ") à " + product.price + " FCFA";

  const handleAddToCart = () => {
    addToCart(product, product.defaultVariant, 1);
    setToastVisible(true);
    window.setTimeout(() => setToastVisible(false), 2000);
  };

  return (
    <article className="relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      <Link href={"/produits/" + product.slug} className="block" aria-label={"Voir " + product.name}>
        <div className="relative aspect-square overflow-hidden bg-slate-100">
          {product.images[0] ? <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" loading="lazy" /> : <div className="flex h-full items-center justify-center p-6 text-center text-sm text-slate-500">Image produit indisponible</div>}
          <span className="absolute left-3 top-3 rounded-full bg-[#0A2342] px-3 py-1 text-xs font-semibold text-white">{product.badge}</span>
        </div>
      </Link>
      <div className="p-4 sm:p-5">
        <div className="text-sm font-medium text-emerald-700">✓ En stock</div>
        <h3 className="mt-2 text-lg font-semibold leading-snug text-[#0A2342]"><Link href={"/produits/" + product.slug}>{product.name}</Link></h3>
        <p className="mt-2 min-h-10 text-sm leading-5 text-slate-600">{product.benefit}</p>
        <p className="mt-4 text-xl font-bold text-[#0A2342]">{new Intl.NumberFormat("fr-FR").format(product.price)} FCFA</p>
        <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
          <a href={whatsappLink(message,"niger")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-xl bg-[#0A2342] px-3 py-3 text-center text-sm font-semibold text-white">Commander sur WhatsApp</a>
          <button type="button" onClick={handleAddToCart} className="inline-flex items-center justify-center rounded-xl border border-[#0A2342] bg-white px-3 py-3 text-sm font-semibold text-[#0A2342]" aria-label={"Ajouter " + product.name + " au panier"}>+ Ajouter</button>
        </div>
      </div>
      {toastVisible && <div role="status" aria-live="polite" className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-xl bg-[#0A2342] px-4 py-2 text-sm font-semibold text-white shadow-lg">Produit ajouté au panier</div>}
    </article>
  );
}
