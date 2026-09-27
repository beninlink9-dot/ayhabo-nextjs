export type Category =
  | "Cuisine"
  | "Maison"
  | "Solaire & énergie"
  | "Électronique"
  | "Accessoires mobiles"
  | "Beauté";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  oldPrice?: number | null;
  stock: number;
  availability: string;
  delivery: string;
  benefit: string;
  variants: string[];
  defaultVariant: string;
  images: string[];
  badge: string;
  warranty: string;
  description: string;
  features: string[];
  package: string[];
  returnPolicy: string;
};

export const products: Product[] = [
  {
    id:'NX-CUI-001', slug:'hachoir-electrique-raf', name:'Hachoir électrique RAF 2-en-1',
    category:'Cuisine', price:14500, oldPrice:null, stock:10, availability:'Disponible immédiatement', delivery:'Livraison estimée sous 4 à 6 jours',
    benefit:'Hache rapidement légumes, viande et condiments.', variants:['Violet','Noir'], defaultVariant:'Violet',
    images:['assets/products/hachoir-raf.webp'], badge:'Produit vedette', warranty:'24 heures après réception',
    description:'Un hachoir compact de 1 litre pour faciliter les préparations quotidiennes. Deux accessoires sont présentés sur l’emballage pour hacher et mélanger.',
    features:['Capacité indiquée : 1 litre','Fonction 2-en-1','Lames en acier inoxydable selon l’emballage','Format compact'],
    package:['Bloc moteur RAF','Bol transparent','Lame de hachage','Accessoire mélangeur'],
    returnPolicy:'Signalez tout défaut avec photo ou vidéo dans les 24 heures suivant la réception.'
  },
  {
    id:'NX-CUI-002', slug:'batteur-electrique-raf', name:'Batteur électrique à main RAF',
    category:'Cuisine', price:8500, stock:15, availability:'Disponible immédiatement', delivery:'Livraison estimée sous 4 à 6 jours',
    benefit:'Pour œufs, crèmes, pâtes et préparations maison.', variants:['Blanc','Rouge','Jaune','Orange'], defaultVariant:'Blanc',
    images:['assets/products/batteur-raf.webp'], badge:'Petit prix', warranty:'24 heures après réception',
    description:'Batteur électrique portable livré avec fouets et crochets pétrisseurs. Son format à main facilite la préparation des gâteaux, crèmes et pâtes légères.',
    features:['Batteur électrique portable','Fouets métalliques','Crochets pétrisseurs','Plusieurs couleurs selon disponibilité'],
    package:['Batteur RAF','Deux fouets','Deux crochets pétrisseurs'],
    returnPolicy:'Signalez tout défaut avec photo ou vidéo dans les 24 heures suivant la réception.'
  },
  {
    id:'NX-MAI-001', slug:'matelas-gonflable-pompe-rechargeable', name:'Matelas gonflable avec pompe rechargeable',
    category:'Maison', price:42000, stock:15, availability:'Disponible immédiatement', delivery:'Livraison estimée sous 4 à 6 jours',
    benefit:'Un couchage d’appoint pratique pour maison et voyage.', variants:['Beige'], defaultVariant:'Beige',
    images:['assets/products/matelas-gonflable.webp'], badge:'Confort', warranty:'24 heures après réception',
    description:'Matelas gonflable une place avec pompe intégrée rechargeable, conçu pour un gonflage et un dégonflage rapides. Dimensions indiquées sur le visuel du produit : environ 190 cm de longueur et 25 cm de hauteur.',
    features:['Pompe intégrée rechargeable','Gonflage et dégonflage rapides','Format une place','Sac de rangement présenté'],
    package:['Matelas gonflable','Pompe intégrée','Coussin selon modèle','Sac de rangement'],
    returnPolicy:'Inspectez et testez le gonflage à la réception. Toute fuite ou défaillance doit être signalée sous 24 heures.'
  },
  {
    id:'NX-MAI-002', slug:'gourde-isotherme-inox-500ml', name:'Gourde isotherme inox 500 ml',
    category:'Maison', price:7500, stock:50, availability:'Disponible immédiatement', delivery:'Livraison estimée sous 4 à 6 jours',
    benefit:'Une gourde élégante pour boissons chaudes ou froides.', variants:['Noir','Bleu marine','Rose','Vert','Blanc','Rouge','Violet','Gris'], defaultVariant:'Noir',
    images:['assets/products/gourde-inox.webp'], badge:'Choix couleurs', warranty:'Inspection à la réception',
    description:'Gourde de 500 ml avec paroi en acier inoxydable et isolation sous vide indiquées sur les visuels. Plusieurs couleurs sont proposées selon le stock disponible.',
    features:['Capacité : 500 ml','Intérieur en acier inoxydable','Isolation sous vide selon le visuel du produit','Format facile à transporter'],
    package:['Gourde isotherme','Bouchon assorti'],
    returnPolicy:'Vérifiez l’état, la couleur et l’étanchéité au moment de la réception.'
  },
  {
    id:'NX-CUI-003', slug:'extracteur-jus-sokany', name:'Extracteur de jus SOKANY 800 W',
    category:'Cuisine', price:29000, stock:15, availability:'Disponible immédiatement', delivery:'Livraison estimée sous 4 à 6 jours',
    benefit:'Prépare rapidement des jus de fruits et légumes.', variants:['Noir / inox'], defaultVariant:'Noir / inox',
    images:['assets/products/extracteur-sokany.webp'], badge:'Puissant', warranty:'48 heures après réception',
    description:'Extracteur de jus SOKANY avec puissance annoncée de 800 W et deux vitesses. Il sépare le jus de la pulpe et dispose de récipients dédiés.',
    features:['Puissance annoncée : 800 W','Deux vitesses','Filtre en acier inoxydable selon l’emballage','Réservoir à pulpe et récipient à jus'],
    package:['Bloc extracteur','Poussoir','Filtre','Réservoir à pulpe','Récipient à jus'],
    returnPolicy:'Testez l’appareil à la réception. Signalez tout défaut avec photo ou vidéo dans un délai maximal de 48 heures.'
  }
];

export function productBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(
  productId: string,
  limit: number
): Product[] {
  const product = products.find((item) => item.id === productId);

  if (!product || limit <= 0) {
    return [];
  }

  return products
    .filter((item) => item.id !== productId && item.category === product.category)
    .slice(0, limit);
}
