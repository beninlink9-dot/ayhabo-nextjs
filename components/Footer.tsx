import Image from "next/image";
import Link from "next/link";

import { whatsappLink } from "@/lib/whatsapp";

export default function Footer() {
  const whatsappNigerUrl = whatsappLink(
    "Bonjour Ay-Habo, je souhaite obtenir des informations.",
    "niger",
  );
  const whatsappBeninUrl = whatsappLink(
    "Bonjour Ay-Habo, je souhaite obtenir des informations.",
    "benin",
  );

  return (
    <footer className="bg-[#0A2342] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-block" aria-label="Ay-Habo — Accueil">
              <Image
                src="/assets/logo.svg"
                alt="Ay-Habo"
                width={150}
                height={48}
                className="h-auto w-[150px]"
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-6 text-slate-200">
              Des produits utiles, livrés simplement au Niger.
            </p>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">
              Paiement Mobile Money (MyNITA, Amana) — Livraison suivie en
              Afrique de l&apos;Ouest.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              Navigation
            </h2>
            <nav className="mt-5 space-y-3" aria-label="Navigation footer">
              <Link href="/catalogue" className="block text-sm text-slate-300 transition hover:text-orange-400">Catalogue</Link>
              <Link href="/panier" className="block text-sm text-slate-300 transition hover:text-orange-400">Panier</Link>
              <Link href="/suivi" className="block text-sm text-slate-300 transition hover:text-orange-400">Suivre une commande</Link>
              <Link href="/conditions" className="block text-sm text-slate-300 transition hover:text-orange-400">Conditions générales</Link>
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              Aide et politiques
            </h2>
            <nav className="mt-5 space-y-3" aria-label="Aide et politiques">
              <Link href="/livraison" className="block text-sm text-slate-300 transition hover:text-orange-400">Livraison</Link>
              <Link href="/annulation" className="block text-sm text-slate-300 transition hover:text-orange-400">Annulation</Link>
              <Link href="/retours-et-echanges" className="block text-sm text-slate-300 transition hover:text-orange-400">Retours et échanges</Link>
              <Link href="/remboursement" className="block text-sm text-slate-300 transition hover:text-orange-400">Remboursement</Link>
              <Link href="/protection-achat" className="block text-sm text-slate-300 transition hover:text-orange-400">Protection achat</Link>
              <Link href="/confidentialite" className="block text-sm text-slate-300 transition hover:text-orange-400">Confidentialité</Link>
              <Link href="/faq" className="block text-sm text-slate-300 transition hover:text-orange-400">FAQ</Link>
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h2>
            <div className="mt-5 space-y-3">
              <a href={whatsappNigerUrl} target="_blank" rel="noopener noreferrer" className="block text-sm text-slate-300 transition hover:text-orange-400">
                📱 Niger : +227 80 24 48 84
              </a>
              <a href={whatsappBeninUrl} target="_blank" rel="noopener noreferrer" className="block text-sm text-slate-300 transition hover:text-orange-400">
                📱 Bénin : +229 01 53 63 65 99
              </a>
              <a href="mailto:contact@ayhabo.com" className="block text-sm text-slate-300 transition hover:text-orange-400">contact@ayhabo.com</a>
            </div>
            <h3 className="mt-7 text-sm font-semibold text-white">Suivez Ay-Habo</h3>
            <div className="mt-4 flex flex-wrap gap-4">
              <a href="#" aria-label="Ay-Habo sur Facebook" className="text-sm text-slate-300 transition hover:text-orange-400">Facebook</a>
              <a href="#" aria-label="Ay-Habo sur Instagram" className="text-sm text-slate-300 transition hover:text-orange-400">Instagram</a>
              <a href="#" aria-label="Ay-Habo sur TikTok" className="text-sm text-slate-300 transition hover:text-orange-400">TikTok</a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-center text-sm text-slate-400">
            © 2026 Ay-Habo. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
