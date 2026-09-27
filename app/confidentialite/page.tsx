import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confidentialité Ay-Habo au Niger et au Bénin",
  description:
    "Consultez la politique de confidentialité Ay-Habo au Niger et au Bénin : données collectées, usages, sécurité, droits et conservation.",
};

const sections = [
  {
    title: "Données collectées",
    content:
      "Nom, téléphone, ville, adresse ou point de repère, produits commandés, mode de paiement choisi, messages de support, statut de commande et données techniques ou comportementales nécessaires au fonctionnement et à la mesure du site.",
  },
  {
    title: "Mesure du parcours",
    content:
      "Ay-Habo peut mesurer de manière proportionnée les pages vues, recherches, interactions produit, ajout au panier, étapes de commande, provenance de campagne et interactions avec les emplacements publicitaires afin d’améliorer la boutique et mesurer ses campagnes. Les champs sensibles des formulaires ne doivent pas être copiés dans les événements analytics.",
  },
  {
    title: "Données exclues des analytics",
    content:
      "Ay-Habo ne doit pas enregistrer dans les événements comportementaux les mots de passe, codes MFA, codes OTP, codes secrets de paiement, preuves de paiement complètes ou autres secrets d’authentification.",
  },
  {
    title: "Finalités",
    content:
      "Créer et confirmer la commande, organiser la livraison, traiter le paiement, prévenir la fraude, assurer le suivi, traiter les réclamations, mesurer les campagnes et améliorer le service.",
  },
  {
    title: "Destinataires",
    content:
      "Les informations sont accessibles aux personnes autorisées de Ay-Habo et, dans la mesure nécessaire, au partenaire de réception, au transporteur, au prestataire de paiement ou aux prestataires techniques concernés. Ay-Habo ne vend pas les données personnelles.",
  },
  {
    title: "Droits et conservation",
    content:
      "Le client peut demander l’accès, la correction ou l’effacement de ses données, ou s’opposer à certains usages non nécessaires, selon les règles applicables. Les données sont conservées pendant une durée proportionnée aux finalités, aux besoins de preuve et aux obligations légales ou comptables.",
  },
  {
    title: "Sécurité",
    content:
      "Ay-Habo applique une séparation des rôles, des règles d’accès, des journaux d’activité, une collecte minimale et des mesures de sauvegarde et de sécurité adaptées à l’exploitation.",
  },
] as const;

export default function ConfidentialitePage() {
  return (
    <section className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#0A2342] sm:text-4xl">
            Politique de confidentialité
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Ay-Habo limite la collecte aux informations nécessaires à la
            commande, au service client, à la sécurité et à l’amélioration du
            service.
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
