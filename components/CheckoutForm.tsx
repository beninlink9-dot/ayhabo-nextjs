"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { useCart } from "@/lib/cart-context";
import { whatsappLinkForCity } from "@/lib/whatsapp";

const CITIES = [
  "Niamey",
  "Maradi",
  "Zinder",
  "Tahoua",
  "Agadez",
  "Dosso",
  "Tillabéri",
  "Diffa",
  "Cotonou",
  "Porto-Novo",
  "Parakou",
  "Abomey-Calavi",
  "Bohicon",
  "Natitingou",
  "Djougou",
  "Autre ville (préciser)",
] as const;

type City = (typeof CITIES)[number];
type ReceptionMode =
  | "Livraison à domicile"
  | "Retrait"
  | "Retrait agence de transport";
type PaymentMode =
  | "Espèces à la livraison"
  | "MyNITA"
  | "Amana"
  | "Mobile Money Bénin (MTN MoMo, Moov Money)"
  | "Espèces (à confirmer sur WhatsApp)";

const NIGER_CITIES = new Set([
  "Niamey",
  "Maradi",
  "Zinder",
  "Tahoua",
  "Agadez",
  "Dosso",
  "Tillabéri",
  "Diffa",
]);

const BENIN_CITIES = new Set([
  "Cotonou",
  "Porto-Novo",
  "Parakou",
  "Abomey-Calavi",
  "Bohicon",
  "Natitingou",
  "Djougou",
]);

function formatPrice(value: number) {
  return new Intl.NumberFormat("fr-FR").format(value);
}

function getCountry(city: City): "niger" | "benin" | "other" {
  if (NIGER_CITIES.has(city)) return "niger";
  if (BENIN_CITIES.has(city)) return "benin";
  return "other";
}

function getReceptionOptions(city: City): ReceptionMode[] {
  return city === "Niamey"
    ? ["Livraison à domicile", "Retrait"]
    : ["Retrait agence de transport"];
}

function getPaymentOptions(city: City): PaymentMode[] {
  if (city === "Niamey") {
    return ["Espèces à la livraison", "MyNITA", "Amana"];
  }

  if (BENIN_CITIES.has(city)) {
    return [
      "Mobile Money Bénin (MTN MoMo, Moov Money)",
      "Espèces (à confirmer sur WhatsApp)",
    ];
  }

  return ["MyNITA", "Amana"];
}

export default function CheckoutForm() {
  const { cartItems, cartSubtotal, clearCart } = useCart();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState<City>("Niamey");
  const [otherCity, setOtherCity] = useState("");
  const [receptionMode, setReceptionMode] = useState<ReceptionMode>(
    "Livraison à domicile",
  );
  const [address, setAddress] = useState("");
  const [paymentMode, setPaymentMode] = useState<PaymentMode>(
    "Espèces à la livraison",
  );
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const country = getCountry(city);
  const isNiamey = city === "Niamey";
  const isOtherCity = city === "Autre ville (préciser)";
  const requiresAddress = isNiamey && receptionMode === "Livraison à domicile";
  const paymentBeforeShipping = city !== "Niamey";

  const receptionOptions = useMemo(
    () => getReceptionOptions(city),
    [city],
  );

  const paymentOptions = useMemo(
    () => getPaymentOptions(city),
    [city],
  );

  const handleCityChange = (nextCity: City) => {
    setCity(nextCity);
    setReceptionMode(getReceptionOptions(nextCity)[0]);
    setPaymentMode(getPaymentOptions(nextCity)[0]);
    setAddress("");
    setOtherCity("");
    setError("");
  };

  const handleReceptionChange = (nextMode: ReceptionMode) => {
    setReceptionMode(nextMode);
    if (nextMode !== "Livraison à domicile") {
      setAddress("");
    }
    setError("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    if (cartItems.length === 0) {
      setError(
        "Votre panier est vide. Ajoutez au moins un article avant de commander.",
      );
      return;
    }

    if (!fullName.trim() || !phone.trim() || !city || !receptionMode || !paymentMode) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (isOtherCity && !otherCity.trim()) {
      setError("Veuillez préciser votre ville.");
      return;
    }

    if (requiresAddress && !address.trim()) {
      setError(
        "Veuillez renseigner votre adresse ou quartier pour la livraison à domicile à Niamey.",
      );
      return;
    }

    const displayCity = isOtherCity
      ? otherCity.trim()
      : city;

    const lines = [
      "Bonjour Ay-Habo, je souhaite confirmer cette commande.",
      "",
      "INFORMATIONS CLIENT",
      `Nom complet : ${fullName.trim()}`,
      `Téléphone : ${phone.trim()}`,
      `Ville : ${displayCity}`,
      ...(isOtherCity ? ["Pays / zone : Autre pays desservi"] : []),
      `Mode de réception : ${receptionMode}`,
      ...(country !== "niger"
        ? ["Frais de livraison : à confirmer sur WhatsApp"]
        : []),
      ...(requiresAddress ? [`Adresse/quartier : ${address.trim()}`] : []),
      `Mode de paiement : ${paymentMode}`,
      ...(paymentBeforeShipping
        ? ["Paiement : avant expédition"]
        : ["Paiement : selon le mode sélectionné"]),
      ...(note.trim() ? [`Note : ${note.trim()}`] : []),
      "",
      "DÉTAIL DE LA COMMANDE",
      ...cartItems.map(
        (item, index) =>
          `${index + 1}. ${item.product.name} — Variante : ${item.variant} — ${item.quantity} x ${formatPrice(item.product.price)} FCFA = ${formatPrice(item.product.price * item.quantity)} FCFA`,
      ),
      "",
      `Total produits : ${formatPrice(cartSubtotal)} FCFA`,
      "Livraison : calculée à l'étape suivante",
      `Total provisoire : ${formatPrice(cartSubtotal)} FCFA`,
    ];

    const message = lines.join("\n");
    const url = whatsappLinkForCity(message, displayCity);

    window.open(url, "_blank", "noopener,noreferrer");
    clearCart();
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 sm:p-12">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-500">
            Commande préparée
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[#0A2342]">
            Votre commande est prête à être confirmée sur WhatsApp.
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            La fenêtre WhatsApp a été ouverte avec les informations de votre
            commande. Envoyez le message à Ay-Habo pour poursuivre la
            confirmation.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/catalogue"
              className="inline-flex items-center justify-center rounded-xl bg-[#0A2342] px-5 py-3 text-sm font-bold text-white hover:bg-[#12365f]"
            >
              Continuer mes achats
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-[#0A2342] bg-white px-5 py-3 text-sm font-bold text-[#0A2342] hover:bg-slate-50"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-7"
      >
        <h2 className="text-xl font-bold text-[#0A2342]">Vos informations</h2>

        <div className="mt-6 grid gap-5">
          <label className="block">
            <span className="text-sm font-semibold text-[#0A2342]">
              Nom complet <span className="text-red-600">*</span>
            </span>
            <input
              required
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              type="text"
              autoComplete="name"
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#0A2342] focus:ring-2 focus:ring-[#0A2342]/10"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-[#0A2342]">
              Téléphone <span className="text-red-600">*</span>
            </span>
            <input
              required
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              type="tel"
              autoComplete="tel"
              placeholder="+227..."
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#0A2342] focus:ring-2 focus:ring-[#0A2342]/10"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-[#0A2342]">
              Ville <span className="text-red-600">*</span>
            </span>
            <select
              required
              value={city}
              onChange={(event) => handleCityChange(event.target.value as City)}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#0A2342] focus:ring-2 focus:ring-[#0A2342]/10"
            >
              <optgroup label="Niger">
                {CITIES.filter((item) => NIGER_CITIES.has(item)).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Bénin">
                {CITIES.filter((item) => BENIN_CITIES.has(item)).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Autres pays desservis">
                <option value="Autre ville (préciser)">
                  Autre ville (préciser)
                </option>
              </optgroup>
            </select>
          </label>

          {isOtherCity && (
            <label className="block">
              <span className="text-sm font-semibold text-[#0A2342]">
                Ville à préciser <span className="text-red-600">*</span>
              </span>
              <input
                required
                value={otherCity}
                onChange={(event) => setOtherCity(event.target.value)}
                type="text"
                autoComplete="address-level2"
                placeholder="Ex. Lomé, Bamako, Abidjan..."
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#0A2342] focus:ring-2 focus:ring-[#0A2342]/10"
              />
              <p className="mt-2 text-xs leading-5 text-slate-500">
                Les frais de livraison seront confirmés sur WhatsApp.
              </p>
            </label>
          )}

          <fieldset>
            <legend className="text-sm font-semibold text-[#0A2342]">
              Mode de réception <span className="text-red-600">*</span>
            </legend>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              {city === "Niamey"
                ? "À Niamey : livraison à domicile ou retrait."
                : "Retrait en agence de transport. Les frais de livraison sont à confirmer sur WhatsApp."}
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {receptionOptions.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 has-[:checked]:border-[#0A2342] has-[:checked]:bg-slate-50"
                >
                  <input
                    required
                    type="radio"
                    name="receptionMode"
                    value={option}
                    checked={receptionMode === option}
                    onChange={() => handleReceptionChange(option)}
                    className="mt-1"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {requiresAddress && (
            <label className="block">
              <span className="text-sm font-semibold text-[#0A2342]">
                Adresse / quartier <span className="text-red-600">*</span>
              </span>
              <input
                required
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                type="text"
                autoComplete="street-address"
                placeholder="Ex. Yantala, près de..."
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#0A2342] focus:ring-2 focus:ring-[#0A2342]/10"
              />
            </label>
          )}

          <fieldset>
            <legend className="text-sm font-semibold text-[#0A2342]">
              Mode de paiement <span className="text-red-600">*</span>
            </legend>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              {city === "Niamey"
                ? "À Niamey : espèces à la livraison, MyNITA ou Amana."
                : BENIN_CITIES.has(city)
                  ? "Au Bénin : Mobile Money ou espèces, à confirmer sur WhatsApp."
                  : "Pour les autres villes : paiement avant expédition via MyNITA ou Amana."}
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {paymentOptions.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 has-[:checked]:border-[#0A2342] has-[:checked]:bg-slate-50"
                >
                  <input
                    required
                    type="radio"
                    name="paymentMode"
                    value={option}
                    checked={paymentMode === option}
                    onChange={() => setPaymentMode(option)}
                    className="mt-1"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="block">
            <span className="text-sm font-semibold text-[#0A2342]">
              Note <span className="font-normal text-slate-400">(facultative)</span>
            </span>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              rows={4}
              placeholder="Une précision pour votre commande..."
              className="mt-2 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#0A2342] focus:ring-2 focus:ring-[#0A2342]/10"
            />
          </label>
        </div>

        {error && (
          <p
            role="alert"
            className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold leading-6 text-red-700 ring-1 ring-red-100"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          className="mt-6 flex w-full items-center justify-center rounded-xl bg-[#0A2342] px-5 py-4 text-center text-sm font-bold text-white transition hover:bg-[#12365f] focus:outline-none focus:ring-2 focus:ring-[#0A2342] focus:ring-offset-2"
        >
          Envoyer la commande sur WhatsApp
        </button>
      </form>

      <aside className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 lg:sticky lg:top-24">
        <h2 className="text-xl font-bold text-[#0A2342]">Récapitulatif de la commande</h2>

        {cartItems.length === 0 ? (
          <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
            Votre panier est vide.{" "}
            <Link href="/catalogue" className="font-semibold text-[#0A2342] underline">
              Voir le catalogue
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-5 space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.variant}-${index}`}
                  className="flex gap-3 border-b border-slate-200 pb-4"
                >
                  <img
                    src={`/${item.product.images[0]}`}
                    alt=""
                    className="h-16 w-16 shrink-0 rounded-lg bg-slate-100 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold leading-5 text-[#0A2342]">
                      {item.product.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.variant} · {item.quantity} × {formatPrice(item.product.price)} FCFA
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#0A2342]">
                      {formatPrice(item.product.price * item.quantity)} FCFA
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <dl className="mt-5 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-sm text-slate-600">Total produits</dt>
                <dd className="text-sm font-bold text-[#0A2342]">
                  {formatPrice(cartSubtotal)} FCFA
                </dd>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <p className="text-sm leading-6 text-slate-600">
                  Livraison calculée à l'étape suivante
                </p>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-4">
                <dt className="font-semibold text-[#0A2342]">Total provisoire</dt>
                <dd className="text-xl font-bold text-[#0A2342]">
                  {formatPrice(cartSubtotal)} FCFA
                </dd>
              </div>
            </dl>
          </>
        )}
      </aside>
    </div>
  );
}
