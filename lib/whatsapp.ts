const WHATSAPP_NUMBERS = {
  niger: "22780244884",
  benin: "2290153636599",
} as const;

type WhatsAppCountry = keyof typeof WHATSAPP_NUMBERS;

export function whatsappLink(
  text: string,
  country: WhatsAppCountry = "niger"
): string {
  const number = WHATSAPP_NUMBERS[country];

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function getWhatsAppNumber(
  country: WhatsAppCountry = "niger"
): string {
  return WHATSAPP_NUMBERS[country];
}
