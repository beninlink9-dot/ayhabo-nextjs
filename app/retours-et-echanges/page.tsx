import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retours et échanges Ay-Habo au Niger et au Bénin",
  description:
    "Consultez la politique de retour et d’échange Ay-Habo au Niger et au Bénin : conditions, signalement, diagnostic, emballage et frais de retour.",
};

const sections = [
  {
    title: "Situations examinées",
    content:
      "Ay-Habo examine notamment les demandes concernant un produit incorrect, incomplet, endommagé avant réception, présentant un défaut admissible ou une non-conformité importante par rapport à la commande confirmée.",
  },
  {
    title: "Signalement prioritaire",
    content:
      "Une anomalie visible doit être signalée idéalement dans les 24 heures suivant la réception. Un défaut fonctionnel qui n’était pas raisonnablement visible lors de la remise doit être signalé idéalement dans les 48 heures. Ces délais définissent la procédure accélérée de protection commerciale Ay-Habo et ne suppriment pas un droit obligatoire qui resterait applicable au-delà.",
  },
  {
    title: "Emballage d’origine",
    content:
      "Pendant toute la période de protection commerciale Ay-Habo, le client doit conserver le carton ou emballage d’origine, les protections intérieures, notices, accessoires, pièces et étiquettes. Pour un retour commercial, un échange de convenance ou toute reprise qui suppose une remise en vente, l’absence ou la détérioration importante de l’emballage peut justifier le refus de la reprise ou une réduction correspondant à la perte de valeur réellement causée, lorsque la réglementation le permet.",
  },
  {
    title: "Produit complet et non altéré",
    content:
      "Le client doit cesser toute utilisation susceptible d’aggraver le problème. Le produit ne doit être ni démonté, ni réparé, ni modifié, ni confié à un tiers avant les instructions de Ay-Habo. Le non-respect de cette obligation peut conduire au refus de la protection commerciale lorsqu’il empêche le diagnostic, modifie l’état du produit ou aggrave le dommage.",
  },
  {
    title: "Preuves et diagnostic",
    content:
      "Ay-Habo peut demander la référence de commande, des photos, une courte vidéo, la description du problème et la présentation du produit complet. La décision tient compte des contrôles réalisés avant remise, de l’état constaté à la réception et des éléments fournis par le client.",
  },
  {
    title: "Mauvaise manipulation exclue",
    content:
      "La protection commerciale Ay-Habo ne couvre pas les dommages causés après réception par chute, choc, eau ou humidité, mauvaise alimentation électrique, branchement inadapté, surcharge, utilisation contraire aux instructions, démontage, modification, réparation non autorisée, perte de pièce, défaut d’entretien, négligence ou usure normale.",
  },
  {
    title: "Exception de sécurité",
    content:
      "Si le produit présente un danger, le client doit immédiatement cesser de l’utiliser, l’isoler sans manipulation risquée et contacter Ay-Habo. Il ne doit pas tenter de le remettre en service.",
  },
  {
    title: "Frais de retour",
    content:
      "Lorsque l’erreur ou la non-conformité est imputable à Ay-Habo et que le retour est validé, Ay-Habo indique la procédure et la prise en charge applicable. Aucun colis ne doit être renvoyé sans autorisation préalable.",
  },
] as const;

export default function RetoursEtEchangesPage() {
  return (
    <section className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#0A2342] sm:text-4xl">
            Politique de retour et d’échange
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Tout retour nécessite une autorisation préalable et un diagnostic
            fondé sur l’état de la commande et du produit.
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
