export type Category = 
  | "Cuisine"
  | "Maison"
  | "Solaire & énergie"
  | "Électronique"
  | "Accessoires mobiles"
  | "Beauté";

export const categories: Array<{
  name: Category;
  icon: string;
  desc: string;
}> = [
  {name:'Cuisine',icon:'🍲',desc:'Préparation et petits appareils'},
  {name:'Maison',icon:'🏠',desc:'Confort et accessoires utiles'},
  {name:'Solaire & énergie',icon:'☀️',desc:'Produits bientôt disponibles'},
  {name:'Électronique',icon:'🔌',desc:'Sélection en préparation'},
  {name:'Accessoires mobiles',icon:'📱',desc:'Sélection en préparation'},
  {name:'Beauté',icon:'✨',desc:'Sélection en préparation'}
];;
