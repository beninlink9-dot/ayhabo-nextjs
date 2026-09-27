"use client";

import { useState } from "react";

import type { Product } from "@/lib/products";
import { whatsappLink } from "@/lib/whatsapp";

type ProductGalleryProps = {
  product: Product;
};

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product.defaultVariant);

  const message = `Bonjour Ay-Habo, je veux commander : ${product.name} (${selectedVariant}) à ${product.price} FCFA`;

  return (
    <div>
      <div className="overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200">
        <div className="aspect-square">
          <img
            src={`/${product.images[selectedImage]}`}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {product.images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {product.images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setSelectedImage(index)}
              aria-label={`Afficher l'image ${index + 1}`}
              aria-pressed={selectedImage === index}
              className={`aspect-square overflow-hidden rounded-xl bg-slate-100 ring-2 transition ${
                selectedImage === index
                  ? "ring-[#0A2342]"
                  : "ring-transparent hover:ring-slate-300"
              }`}
            >
              <img
                src={`/${image}`}
                alt=""
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <div className="mt-7">
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

      <a
        href={whatsappLink(message, "niger")}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex w-full items-center justify-center rounded-xl bg-emerald-600 px-5 py-4 text-base font-bold uppercase tracking-wide text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        Commander sur WhatsApp
      </a>
    </div>
  );
}
