"use client";

import Link from "next/link";

import { useCart } from "@/lib/cart-context";

export default function CartContent() {
  const {
    cartItems,
    cartSubtotal,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const formattedSubtotal = new Intl.NumberFormat("fr-FR").format(cartSubtotal);

  if (cartItems.length === 0) {
    return (
      <div className="mt-8 rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200 sm:p-12">
        <p className="text-lg font-semibold text-[#0A2342]">
          Votre panier est vide.
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Découvrez nos produits et ajoutez vos articles au panier.
        </p>
        <Link
          href="/catalogue"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#0A2342] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#12365f] focus:outline-none focus:ring-2 focus:ring-[#0A2342] focus:ring-offset-2"
        >
          Voir le catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
      <div className="space-y-4">
        {cartItems.map((item, index) => {
          const unitPrice = new Intl.NumberFormat("fr-FR").format(
            item.product.price,
          );

          return (
            <article
              key={`${item.product.id}-${item.variant}-${index}`}
              className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-5"
            >
              <div className="flex gap-4">
                <Link
                  href={`/produits/${item.product.slug}`}
                  className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200 sm:h-28 sm:w-28"
                >
                  <img
                    src={`/${item.product.images[0]}`}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </Link>

                <div className="min-w-0 flex-1">
                  <Link
                    href={`/produits/${item.product.slug}`}
                    className="font-semibold leading-6 text-[#0A2342] hover:underline"
                  >
                    {item.product.name}
                  </Link>

                  <p className="mt-1 text-sm text-slate-600">
                    Variante : {item.variant}
                  </p>

                  <p className="mt-2 text-sm font-semibold text-[#0A2342]">
                    {unitPrice} FCFA / unité
                  </p>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="inline-flex items-center overflow-hidden rounded-xl border border-slate-300 bg-white">
                      <button
                        type="button"
                        onClick={() => updateQuantity(index, item.quantity - 1)}
                        aria-label={`Diminuer la quantité de ${item.product.name}`}
                        className="flex h-10 w-10 items-center justify-center text-xl font-semibold text-[#0A2342] transition hover:bg-slate-50"
                      >
                        −
                      </button>
                      <span className="flex h-10 min-w-12 items-center justify-center border-x border-slate-200 px-3 text-sm font-semibold text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(index, item.quantity + 1)}
                        aria-label={`Augmenter la quantité de ${item.product.name}`}
                        className="flex h-10 w-10 items-center justify-center text-xl font-semibold text-[#0A2342] transition hover:bg-slate-50"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(index)}
                      className="text-sm font-semibold text-red-600 underline underline-offset-2 hover:text-red-700"
                    >
                      Retirer
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <aside className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 lg:sticky lg:top-24">
        <h2 className="text-xl font-bold text-[#0A2342]">Récapitulatif</h2>

        <dl className="mt-5 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-sm text-slate-600">Total produits hors livraison</dt>
            <dd className="text-sm font-bold text-[#0A2342]">
              {formattedSubtotal} FCFA
            </dd>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <p className="text-sm leading-6 text-slate-600">
              Livraison calculée à l'étape suivante
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-4">
            <dt className="font-semibold text-[#0A2342]">Total provisoire</dt>
            <dd className="text-xl font-bold text-[#0A2342]">
              {formattedSubtotal} FCFA
            </dd>
          </div>
        </dl>

        <div className="mt-6 space-y-3">
          <Link
            href="/commande"
            className="flex w-full items-center justify-center rounded-xl bg-[#0A2342] px-5 py-4 text-center text-sm font-bold text-white transition hover:bg-[#12365f] focus:outline-none focus:ring-2 focus:ring-[#0A2342] focus:ring-offset-2"
          >
            Continuer la commande
          </Link>

          <Link
            href="/catalogue"
            className="flex w-full items-center justify-center rounded-xl border border-[#0A2342] bg-white px-5 py-4 text-center text-sm font-bold text-[#0A2342] transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0A2342] focus:ring-offset-2"
          >
            Continuer mes achats
          </Link>
        </div>
      </aside>
    </div>
  );
}
