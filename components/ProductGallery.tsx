"use client";

import { useState } from "react";

import type { Product } from "@/lib/products";

type ProductGalleryProps = {
  product: Product;
};

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

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
    </div>
  );
}
