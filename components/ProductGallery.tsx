"use client";
import { useState } from "react";
import type { Product } from "@/lib/products";

export default function ProductGallery({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const current = product.images[selectedImage];
  return (
    <div>
      <div className="overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200"><div className="aspect-square">{current ? <img src={current} alt={product.name} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center p-6 text-center text-slate-500">Image produit indisponible</div>}</div></div>
      {product.images.length > 1 && <div className="mt-3 grid grid-cols-5 gap-2">{product.images.map((image,index)=><button key={image} type="button" onClick={()=>setSelectedImage(index)} className={"aspect-square overflow-hidden rounded-xl bg-slate-100 ring-2 " + (selectedImage===index ? "ring-[#0A2342]" : "ring-transparent")}><img src={image} alt="" className="h-full w-full object-cover" /></button>)}</div>}
    </div>
  );
}
