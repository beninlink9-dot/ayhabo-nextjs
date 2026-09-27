"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, Truck, MessageCircle } from "lucide-react";

import { useCart } from "@/lib/cart-context";
import { whatsappLink } from "@/lib/whatsapp";

export default function Header() {
  const { cartCount } = useCart();
  const assistanceUrl = whatsappLink(
    "Bonjour Ay-Habo, j’ai besoin d’assistance."
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center gap-4">
          <Link href="/" className="shrink-0" aria-label="Ay-Habo — Accueil">
            <Image
              src="/assets/logo.svg"
              alt="Ay-Habo"
              width={150}
              height={48}
              priority
              className="h-auto w-[130px] sm:w-[150px]"
            />
          </Link>

          <div className="hidden flex-1 md:block">
            <form action="/catalogue" method="GET" className="mx-auto max-w-xl">
              <label htmlFor="header-search" className="sr-only">
                Rechercher un produit
              </label>
              <div className="relative">
                <Search
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="header-search"
                  name="q"
                  type="search"
                  placeholder="Rechercher un produit..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0A2342] focus:bg-white focus:ring-2 focus:ring-[#0A2342]/10"
                />
              </div>
            </form>
          </div>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <Link
              href="/suivi"
              className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-[#0A2342] transition hover:bg-slate-100 lg:flex"
            >
              <Truck className="h-5 w-5" aria-hidden="true" />
              <span>Suivre ma commande</span>
            </Link>

            <Link
              href="/panier"
              aria-label="Panier"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-[#0A2342] transition hover:bg-slate-100"
            >
              <ShoppingCart className="h-5 w-5" aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[11px] font-bold text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            <a
              href={assistanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-xl bg-[#0A2342] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0A2342]/90 sm:flex"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              <span>Assistance</span>
            </a>
          </div>
        </div>

        <nav
          aria-label="Navigation principale"
          className="hidden h-12 items-center gap-8 border-t border-slate-100 md:flex"
        >
          <Link href="/catalogue" className="text-sm font-medium text-slate-700 transition hover:text-[#0A2342]">
            Catalogue
          </Link>
          <Link href="/suivi" className="text-sm font-medium text-slate-700 transition hover:text-[#0A2342]">
            Suivre ma commande
          </Link>
          <a href={assistanceUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-700 transition hover:text-[#0A2342]">
            Assistance
          </a>
        </nav>
      </div>

      <div className="border-t border-slate-100 px-4 py-3 md:hidden">
        <form action="/catalogue" method="GET">
          <label htmlFor="mobile-header-search" className="sr-only">
            Rechercher un produit
          </label>
          <div className="relative">
            <Search
              aria-hidden="true"
              className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            />
            <input
              id="mobile-header-search"
              name="q"
              type="search"
              placeholder="Rechercher un produit..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#0A2342] focus:bg-white focus:ring-2 focus:ring-[#0A2342]/10"
            />
          </div>
        </form>
      </div>
    </header>
  );
}
