import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Livraison Ay-Habo au Niger et au Bénin",
  description:
    "Découvrez la politique de livraison Ay-Habo au Niger et au Bénin : contrôles, remise, vérification client et conservation de l’emballage.",
};

const sections = [
  {
    title: "Contrôle avant départ",
    important: false,
    content:
      "Lorsque la nature du produit le permet, Ay-Habo vérifie au Bénin la référence, la variante, la quantité, les accessoires, l’état apparent et le fonctionnement avant l’envoi vers le Niger. Une trace de ce contrôle peut être conservée.",
  },
  {
    title: "Contrôle au Niger",
    important: false,
    content:
      "À l’arrivée, le partenaire ou opérateur autorisé vérifie l’état du colis et, lorsque cela est possible, effectue un nouveau contrôle du produit avant sa remise au client.",
  },
  {
    title: "Niamey",
    important: false,
    content:
      "La livraison à domicile est proposée selon une zone standard ou éloignée. Le tarif indicatif est de 1 000 à 2 000 FCFA. Un retrait peut aussi être proposé.",
  },
  {
    title: "Autres villes",
    important: false,
    content:
      "La réception se fait par défaut auprès d’une agence de transport choisie ou validée avec le client. Une livraison locale n’est proposée que lorsqu’un partenaire fiable est disponible.",
  },
  {
    title: "Vérification à la remise",
    important: false,
    content:
      "Avant de confirmer la réception, le client doit vérifier l’identité du produit, l’état extérieur, les accessoires et, si possible, son fonctionnement. Toute anomalie visible doit être signalée immédiatement. La remise peut être confirmée par une preuve de livraison ou un code OTP.",
  },
  {
    title: "Conservez le carton 48 h",
    content:
      "Important : le client doit conserver l’emballage d’origine et tous les accessoires pendant au moins 48 heures après réception. Ils peuvent être nécessaires pour un diagnostic, un retour autorisé ou une réclamation.",
    important: true,
  },
  {
    title: "Colis non retiré ou refusé",
    important: false,
    content:
      "Ay-Habo tente de contacter le client. Les frais de transport, de nouvelle présentation ou de stockage réellement engagés peuvent rester dus lorsque le refus ou l’absence n’est pas imputable à Ay-Habo et lorsque la réglementation le permet. Des non-retraits répétés peuvent conduire à exiger un acompte ou un prépaiement pour une commande future.",
  },
] as const;

export default function LivraisonPage() {
  return (
    <section className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#0A2342] sm:text-4xl">
            Politique de livraison
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            La remise est organisée autour de contrôles successifs et d’une
            vérification client.
          </p>
        </header>

        <div className="space-y-5">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8"
            >
              <h2 className="text-xl font-semibold text-[#0A2342] sm:text-2xl">
                {section.title}
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-700">
                {section.important ? (
                  <>
                    <strong>Important :</strong> le client doit conserver
                    l’emballage d’origine et tous les accessoires pendant au
                    moins 48 heures après réception. Ils peuvent être
                    nécessaires pour un diagnostic, un retour autorisé ou une
                    réclamation.
                  </>
                ) : (
                  section.content
                )}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
