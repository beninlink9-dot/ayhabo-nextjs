const WHATSAPP_NUMBERS = {
  niger: "22780244884",
  benin: "2290153636599",
} as const;

type WhatsAppCountry = keyof typeof WHATSAPP_NUMBERS;

const NIGER_CITIES = new Set([
  "niamey",
  "maradi",
  "zinder",
  "tahoua",
  "agadez",
  "dosso",
  "tillaberi",
  "tillabéri",
  "diffa",
]);

const BENIN_CITIES = new Set([
  "cotonou",
  "porto-novo",
  "parakou",
  "abomey-calavi",
  "abomey calavi",
  "bohicon",
  "natitingou",
  "djougou",
]);

function normalizeCity(city: string): string {
  return city
    .trim()
    .toLocaleLowerCase("fr-FR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function whatsappLink(
  text: string,
  country: WhatsAppCountry = "niger",
): string {
  const number = WHATSAPP_NUMBERS[country];

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function whatsappLinkForCity(text: string, city: string): string {
  const normalizedCity = normalizeCity(city);

  if (NIGER_CITIES.has(normalizedCity)) {
    return whatsappLink(text, "niger");
  }

  if (BENIN_CITIES.has(normalizedCity)) {
    return whatsappLink(text, "benin");
  }

  return whatsappLink(text, "benin");
}

export function getWhatsAppNumber(
  country: WhatsAppCountry = "niger",
): string {
  return WHATSAPP_NUMBERS[country];
}
