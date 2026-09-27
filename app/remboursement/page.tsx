import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remboursement Ay-Habo au Niger et au Bénin",
  description:
    "Consultez la politique de remboursement Ay-Habo au Niger et au Bénin : solutions, conditions, retenues, traçabilité et délais de remboursement.",
};

const sections = [
  {
    title: "Solutions possibles",
    content:
      "Selon le diagnostic et la situation, Ay-Habo peut proposer une assistance, une réparation simple, un remplacement, un échange équivalent accepté par le client, un avoir ou un remboursement lorsque cette solution est appropriée ou obligatoire.",
  },
  {
    title: "Remboursement total",
    content:
      "Un remboursement total peut notamment être accordé en cas d’indisponibilité après paiement, de double paiement, d’annulation imputable à Ay-Habo ou de non-conformité grave qui ne peut pas être corrigée, sous réserve de la situation concrète et des règles applicables.",
  },
  {
    title: "Remboursement partiel ou retenue",
    content:
      "Une réduction ne peut pas être arbitraire. Lorsqu’elle est permise, elle doit être expliquée et correspondre à un coût irréversible, une détérioration ou une perte de valeur objectivement identifiable. Aucune retenue n’est appliquée lorsqu’un remboursement intégral est légalement obligatoire.",
  },
  {
    title: "Traçabilité",
    content:
      "La décision de remboursement, son motif, le montant retenu ou remboursé et les principaux éléments de preuve sont enregistrés afin d’éviter les doubles remboursements et de permettre le suivi de la réclamation.",
  },
  {
    title: "Délai et méthode",
    content:
      "Après validation définitive, Ay-Habo vise l’exécution du remboursement dans un délai maximal de 7 jours ouvrables, sous réserve du délai propre au moyen de paiement. Le remboursement utilise un moyen convenu et traçable. Aucun agent ne doit demander le code secret, le mot de passe ou le code à usage unique du client.",
  },
] as const;

export default function RemboursementPage() {
  return (
    <section className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#0A2342] sm:text-4xl">
            Politique de remboursement
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Tout remboursement repose sur une réclamation validée, une décision
            documentée et un calcul traçable.
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
