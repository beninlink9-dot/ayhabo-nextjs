import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Annulation Ay-Habo au Niger et au Bénin",
  description:
    "Consultez la politique d’annulation Ay-Habo au Niger et au Bénin selon l’état de la commande et les frais réellement engagés.",
};

const sections = [
  {
    title: "Avant engagement des frais",
    content:
      "Une demande d’annulation peut être acceptée lorsque la préparation, l’achat fournisseur ou le transport n’a pas encore créé de coût irréversible. Ay-Habo confirme au client l’état réel de la commande.",
  },
  {
    title: "Après achat, préparation ou expédition",
    content:
      "Lorsque des coûts ont déjà été réellement engagés, une annulation de convenance peut être refusée ou donner lieu à la prise en compte des coûts irréversibles lorsque la réglementation le permet. Ay-Habo ne facture pas de pénalité arbitraire : toute retenue doit correspondre à un coût ou à une perte de valeur identifiable.",
  },
  {
    title: "Commande remise au transporteur",
    content:
      "Après remise documentée au transporteur, Ay-Habo peut ne plus accepter une annulation commerciale pour simple changement d’avis, indisponibilité du client ou refus sans motif imputable à Ay-Habo, sous réserve des droits obligatoires applicables.",
  },
  {
    title: "Erreur ou impossibilité imputable à Ay-Habo",
    content:
      "En cas d’indisponibilité confirmée, d’erreur majeure, de risque de sécurité ou d’impossibilité d’exécuter la commande imputable à Ay-Habo, Ay-Habo propose la solution appropriée et restitue les sommes dues pour les prestations non exécutées.",
  },
  {
    title: "Droits maintenus",
    content:
      "Ces règles commerciales ne suppriment pas les droits impératifs éventuellement applicables, notamment lorsqu’un produit est incorrect, incomplet, endommagé avant réception, gravement non conforme ou lorsqu’une faute de Ay-Habo est établie.",
  },
] as const;

export default function AnnulationPage() {
  return (
    <section className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#0A2342] sm:text-4xl">
            Politique d’annulation
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Une annulation est traitée selon l’état réel de la commande et les
            frais déjà engagés.
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
                {section.content}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
