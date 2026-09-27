"use client";

import { useState } from "react";

import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { whatsappLink } from "@/lib/whatsapp";

type ProductActionsProps = {
  product: Product;
};

export default function ProductActions({ product }: ProductActionsProps) {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.defaultVariant);
  const [quantity, setQuantity] = useState(1);
  const [toastVisible, setToastVisible] = useState(false);

  const message = `Bonjour Ay-Habo, je veux commander : ${product.name} (${selectedVariant}) à ${product.price} FCFA`;

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    setToastVisible(true);

    window.setTimeout(() => {
      setToastVisible(false);
    }, 2000);
  };

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  return (
    <div className="mt-7">
      <div>
        <p className="text-sm font-semibold text-[#0A2342]">Choisir une variante</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.variants.map((variant) => (
            <button
              key={variant}
              type="button"
              onClick={() => setSelectedVariant(variant)}
              aria-pressed={selectedVariant === variant}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                selectedVariant === variant
                  ? "border-[#0A2342] bg-[#0A2342] text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-[#0A2342]"
              }`}
            >
              {variant}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm font-semibold text-[#0A2342]">Quantité</p>
        <div className="mt-2 inline-flex items-center overflow-hidden rounded-xl border border-slate-300 bg-white">
          <button
            type="button"
            onClick={decreaseQuantity}
            aria-label="Diminuer la quantité"
            className="flex h-11 w-11 items-center justify-center text-xl font-semibold text-[#0A2342] transition hover:bg-slate-50"
          >
            −
          </button>
          <span className="flex h-11 min-w-12 items-center justify-center border-x border-slate-200 px-3 text-sm font-semibold text-slate-800">
            {quantity}
          </span>
          <button
            type="button"
            onClick={increaseQuantity}
            aria-label="Augmenter la quantité"
            className="flex h-11 w-11 items-center justify-center text-xl font-semibold text-[#0A2342] transition hover:bg-slate-50"
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={handleAddToCart}
          className="inline-flex items-center justify-center rounded-xl border border-[#0A2342] bg-white px-5 py-4 text-sm font-bold text-[#0A2342] transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0A2342] focus:ring-offset-2"
        >
          Ajouter au panier
        </button>

        <a
          href={whatsappLink(message, "niger")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Commander sur WhatsApp
        </a>
      </div>

      {toastVisible && (
        <div
          role="status"
          aria-live="polite"
          className="mt-3 rounded-xl bg-[#0A2342] px-4 py-3 text-center text-sm font-semibold text-white"
        >
          Produit ajouté au panier
        </div>
      )}
    </div>
  );
}
