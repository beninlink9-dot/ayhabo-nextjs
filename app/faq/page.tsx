import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ Ay-Habo au Niger et au Bénin",
  description:
    "Retrouvez les réponses aux questions fréquentes sur les commandes, livraisons, contrôles, paiements et protection commerciale Ay-Habo.",
};

const sections = [
  {
    title: "Ay-Habo fabrique-t-il les produits ?",
    content:
      "Non. Ay-Habo est une boutique en ligne de revente, sauf mention contraire sur un produit particulier. Ay-Habo sélectionne, commande, contrôle et organise la remise des produits proposés.",
  },
  {
    title: "Le produit est-il testé avant livraison ?",
    content:
      "Lorsque la nature du produit le permet, un contrôle est effectué avant expédition depuis le Bénin puis un second contrôle est organisé au Niger avant remise au client.",
  },
  {
    title: "Dois-je conserver le carton ?",
    content:
      "Oui. Conservez impérativement le carton ou emballage d’origine, les protections et tous les accessoires pendant au moins 48 heures après réception. Ils peuvent être nécessaires en cas de réclamation ou de retour autorisé.",
  },
  {
    title: "Combien de temps ai-je pour signaler un problème ?",
    content:
      "Signalez immédiatement toute anomalie visible et idéalement dans les 24 heures. Pour un défaut fonctionnel qui n’était pas raisonnablement détectable à la remise, contactez Ay-Habo dans les 48 heures afin de bénéficier de la procédure commerciale accélérée.",
  },
  {
    title: "Que se passe-t-il si le produit tombe ou est mal branché ?",
    content:
      "Les dommages causés après réception par chute, eau, mauvaise tension, branchement incorrect, démontage, modification ou mauvaise utilisation ne relèvent pas de la protection commerciale Ay-Habo lorsqu’ils sont établis.",
  },
  {
    title: "Puis-je payer à la livraison ?",
    content:
      "Oui, certaines commandes à Niamey peuvent être payées à la livraison. Pour les autres villes ou certains profils de risque, un paiement avant expédition ou un acompte peut être requis.",
  },
  {
    title: "Puis-je annuler ?",
    content:
      "Une demande peut être examinée avant que des coûts irréversibles soient engagés. Après achat, préparation ou expédition, les possibilités dépendent de l’état réel de la commande et des règles applicables.",
  },
  {
    title: "Comment suivre ma commande ?",
    content:
      "Utilisez la page de suivi et contactez Ay-Habo sur WhatsApp pour toute précision opérationnelle.",
  },
] as const;

export default function FaqPage() {
  return (
    <section className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#0A2342] sm:text-4xl">
            Questions fréquentes
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Réponses rapides sur la commande, les contrôles et la protection
            commerciale.
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
