import { supabaseConfig } from "@/lib/supabase";

export type Category =
  | "Cuisine"
  | "Maison"
  | "Solaire & énergie"
  | "Électronique"
  | "Accessoires mobiles"
  | "Beauté";

type JsonValue =
  | string | number | boolean | null
  | JsonValue[]
  | { [key: string]: JsonValue };

type SupabaseCategoryRow = { id: string; name: string; slug: string };

type SupabaseProductRow = {
  id: string; sku: string; slug: string; category_id: string | null;
  name: string; short_description: string | null; description: string | null;
  features: JsonValue; package_contents: JsonValue;
  primary_image_url: string | null; image_urls: JsonValue; badge: string | null;
  availability_label: string; delivery_label: string;
  sale_price: number | string; promo_price: number | string | null;
  compare_at_price: number | string | null; published: boolean; status: string;
  stock_quantity: number; featured: boolean; position: number;
  organization_id: string; category?: SupabaseCategoryRow | null;
};

export type Product = {
  id: string; sku: string; slug: string; name: string; category: Category;
  categoryId: string | null; price: number; oldPrice: number | null; stock: number;
  availability: string; delivery: string; benefit: string; variants: string[];
  defaultVariant: string; images: string[]; badge: string; warranty: string;
  description: string; features: string[]; package: string[]; returnPolicy: string;
  sale_price: number; promo_price: number | null; compare_at_price: number | null;
  published: boolean; status: string; featured: boolean; position: number;
  organization_id: string;
};

const PRODUCTS_ENDPOINT = supabaseConfig.projectUrl + "/rest/v1/products";
const PRODUCT_SELECT = [
  "id","sku","slug","category_id","name","short_description","description",
  "features","package_contents","primary_image_url","image_urls","badge",
  "availability_label","delivery_label","sale_price","promo_price",
  "compare_at_price","published","status","stock_quantity","featured","position",
  "organization_id","category:categories(id,name,slug)"
].join(",");

const CATEGORY_NAMES = new Set<Category>([
  "Cuisine","Maison","Solaire & énergie","Électronique","Accessoires mobiles","Beauté"
]);

function asStringArray(value: JsonValue): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string =>
    typeof item === "string" && item.trim().length > 0
  );
}

function normalizeImages(primaryImageUrl: string | null, imageUrls: JsonValue): string[] {
  const images = asStringArray(imageUrls).map((image) => image.trim());
  if (primaryImageUrl?.trim() && !images.includes(primaryImageUrl.trim())) {
    images.unshift(primaryImageUrl.trim());
  }
  return images;
}

function normalizeCategory(name?: string | null): Category {
  return name && CATEGORY_NAMES.has(name as Category) ? name as Category : "Maison";
}

function normalizeProduct(row: SupabaseProductRow): Product {
  const salePrice = Number(row.sale_price ?? 0);
  const promoPrice = row.promo_price === null ? null : Number(row.promo_price);
  const compareAtPrice = row.compare_at_price === null ? null : Number(row.compare_at_price);
  const price = promoPrice ?? salePrice;
  const features = asStringArray(row.features);
  const packageContents = asStringArray(row.package_contents);

  return {
    id: row.id, sku: row.sku, slug: row.slug, name: row.name,
    category: normalizeCategory(row.category?.name), categoryId: row.category_id,
    price, oldPrice: compareAtPrice, stock: Number(row.stock_quantity ?? 0),
    availability: row.availability_label || "Disponibilité à confirmer",
    delivery: row.delivery_label || "Délai confirmé avant expédition",
    benefit: row.short_description?.trim() || "Produit utile sélectionné par Ay-Habo.",
    variants: ["Standard"], defaultVariant: "Standard",
    images: normalizeImages(row.primary_image_url, row.image_urls),
    badge: row.badge?.trim() || "Disponible",
    warranty: "À confirmer avant expédition",
    description: row.description?.trim() || row.short_description?.trim() || "Produit disponible sur Ay-Habo.",
    features, package: packageContents,
    returnPolicy: "Vérifiez le produit à la réception et signalez rapidement tout défaut au service client.",
    sale_price: salePrice, promo_price: promoPrice, compare_at_price: compareAtPrice,
    published: row.published, status: row.status, featured: row.featured,
    position: row.position, organization_id: row.organization_id,
  };
}

async function fetchProducts(searchParams: URLSearchParams): Promise<Product[]> {
  try {
    if (!supabaseConfig.anonKey) {
      console.error("Supabase anon key is not configured.");
      return [];
    }
    const response = await fetch(
      PRODUCTS_ENDPOINT + "?" + searchParams.toString(),
      {
        headers: {
          Accept: "application/json",
          apikey: supabaseConfig.anonKey,
          Authorization: "Bearer " + supabaseConfig.anonKey,
        },
        cache: "no-store",
      },
    );
    if (!response.ok) {
      console.error("Supabase products request failed: " + response.status);
      return [];
    }
    const rows = await response.json() as SupabaseProductRow[];
    return Array.isArray(rows) ? rows.map(normalizeProduct) : [];
  } catch (error) {
    console.error("Supabase products request failed:", error);
    return [];
  }
}

export async function getAllProducts(): Promise<Product[]> {
  const params = new URLSearchParams();
  params.set("select", PRODUCT_SELECT);
  params.set("published", "eq.true");
  params.set("order", "position.asc");
  return fetchProducts(params);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const params = new URLSearchParams();
  params.set("select", PRODUCT_SELECT);
  params.set("slug", "eq." + slug);
  params.set("published", "eq.true");
  params.set("limit", "1");
  return (await fetchProducts(params))[0] ?? null;
}

export async function getRelatedProducts(productId: string, limit: number): Promise<Product[]> {
  if (limit <= 0) return [];
  const sourceParams = new URLSearchParams();
  sourceParams.set("select", "id,category_id");
  sourceParams.set("id", "eq." + productId);
  sourceParams.set("published", "eq.true");
  sourceParams.set("limit", "1");
  const source = await fetchProducts(sourceParams);
  const categoryId = source[0]?.categoryId;
  if (!categoryId) return [];

  const params = new URLSearchParams();
  params.set("select", PRODUCT_SELECT);
  params.set("category_id", "eq." + categoryId);
  params.set("published", "eq.true");
  params.set("id", "neq." + productId);
  params.set("order", "position.asc");
  params.set("limit", String(limit));
  return fetchProducts(params);
}

export async function getFeaturedProducts(limit: number): Promise<Product[]> {
  if (limit <= 0) return [];
  const params = new URLSearchParams();
  params.set("select", PRODUCT_SELECT);
  params.set("published", "eq.true");
  params.set("featured", "eq.true");
  params.set("order", "position.asc");
  params.set("limit", String(limit));
  return fetchProducts(params);
}

export async function productBySlug(slug: string): Promise<Product | null> {
  return getProductBySlug(slug);
}

export const products: Product[] = [];
