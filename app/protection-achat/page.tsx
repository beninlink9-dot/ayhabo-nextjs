import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Protection achat Ay-Habo au Niger et au Bénin",
  description:
    "Découvrez la protection commerciale Ay-Habo au Niger et au Bénin : contrôles, réception, signalement, exclusions et garantie fabricant.",
};

const sections = [
  {
    title: "Double contrôle",
    content:
      "Lorsque le produit s’y prête, Ay-Habo contrôle la référence, la quantité, les accessoires, l’état apparent et le fonctionnement avant expédition depuis le Bénin. Un second contrôle est effectué ou organisé au Niger avant remise au client. Les contrôles peuvent être documentés par photo, vidéo, date et identité de l’opérateur.",
  },
  {
    title: "Contrôle à la remise",
    content:
      "Le client est invité à vérifier le produit au moment de la réception. Pour les appareils, un test rapide de fonctionnement est réalisé lorsque les conditions le permettent. Le client doit signaler immédiatement toute anomalie visible constatée pendant cette vérification.",
  },
  {
    title: "Durée de la protection commerciale",
    content:
      "Pour les anomalies visibles, la procédure commerciale accélérée prévoit un signalement dans les 24 heures. Pour un défaut fonctionnel non raisonnablement détectable lors de la remise, le signalement doit intervenir dans les 48 heures. Passé ce délai, Ay-Habo ne fournit pas de garantie commerciale supplémentaire sauf engagement écrit propre au produit ou au fournisseur, sans préjudice d’un droit impératif qui resterait applicable.",
  },
  {
    title: "Conservation obligatoire pendant 48 h",
    content:
      "Le client doit conserver pendant au moins 48 heures le carton ou emballage d’origine, les protections, accessoires, notices et étiquettes, et garder le produit dans un état permettant son diagnostic. Il ne doit pas démonter, modifier ou faire réparer le produit avant instruction de Ay-Habo.",
  },
  {
    title: "Problèmes couverts",
    content:
      "La protection commerciale examine notamment le produit incorrect, la quantité manquante, l’accessoire essentiel absent, le dommage antérieur à la réception, le défaut technique admissible ou une différence importante par rapport à la commande confirmée.",
  },
  {
    title: "Problèmes non couverts",
    content:
      "Les dommages apparus après réception du fait d’une chute, d’un choc, d’eau, d’une mauvaise tension, d’un branchement incorrect, d’une surcharge, d’une mauvaise utilisation, d’une modification, d’une réparation non autorisée, d’une négligence ou de l’usure normale sont exclus de la protection commerciale Ay-Habo lorsqu’ils sont établis.",
  },
  {
    title: "Garantie fabricant",
    content:
      "Ay-Habo n’est pas le fabricant. Lorsqu’une garantie fabricant ou fournisseur existe réellement, ses conditions sont indiquées séparément. L’absence de garantie fabricant annoncée ne crée pas une garantie longue durée implicite de Ay-Habo.",
  },
  {
    title: "Droits obligatoires",
    content:
      "La durée de la protection commerciale Ay-Habo ne vise pas à supprimer un droit auquel le consommateur ne peut légalement renoncer. Les règles obligatoires applicables prévalent lorsqu’elles imposent une protection différente.",
  },
] as const;

export default function ProtectionAchatPage() {
  return (
    <section className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#0A2342] sm:text-4xl">
            Protection commerciale Ay-Habo
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Une procédure courte et documentée pour les anomalies qui subsistent
            malgré les contrôles avant remise.
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
