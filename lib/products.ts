import { supabaseConfig } from "@/lib/supabase";

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export type Product = {
  id: string;
  sku: string;
  slug: string;
  name: string;
  short_description: string | null;
  description: string | null;
  features: JsonValue;
  package_contents: JsonValue;
  primary_image_url: string | null;
  image_urls: JsonValue;
  sale_price: number;
  promo_price: number | null;
  compare_at_price: number | null;
  published: boolean;
  status: string;
  stock_quantity: number;
  featured: boolean;
  position: number;
  category_id: string | null;
  delivery_label: string;
  availability_label: string;
  organization_id: string;
  images: string[];
};

type SupabaseProductRow = Omit<Product, "images">;

const PRODUCTS_ENDPOINT =
  `${supabaseConfig.projectUrl}/rest/v1/products`;

function normalizeImages(
  primaryImageUrl: string | null,
  imageUrls: JsonValue,
): string[] {
  const images: string[] = [];

  if (Array.isArray(imageUrls)) {
    for (const image of imageUrls) {
      if (typeof image === "string" && image.trim()) {
        images.push(image.trim());
      }
    }
  }

  if (primaryImageUrl?.trim() && !images.includes(primaryImageUrl.trim())) {
    images.unshift(primaryImageUrl.trim());
  }

  return images;
}

function normalizeProduct(row: SupabaseProductRow): Product {
  return {
    ...row,
    sale_price: Number(row.sale_price),
    promo_price: row.promo_price === null ? null : Number(row.promo_price),
    compare_at_price:
      row.compare_at_price === null ? null : Number(row.compare_at_price),
    images: normalizeImages(row.primary_image_url, row.image_urls),
  };
}

const PRODUCT_SELECT = [
  "id",
  "sku",
  "slug",
  "name",
  "short_description",
  "description",
  "features",
  "package_contents",
  "primary_image_url",
  "image_urls",
  "sale_price",
  "promo_price",
  "compare_at_price",
  "published",
  "status",
  "stock_quantity",
  "featured",
  "position",
  "category_id",
  "delivery_label",
  "availability_label",
  "organization_id",
].join(",");

async function fetchProducts(
  searchParams: URLSearchParams,
): Promise<Product[]> {
  try {
    if (!supabaseConfig.anonKey) {
      console.error("Supabase anon key is not configured.");
      return [];
    }

    const response = await fetch(
      `${PRODUCTS_ENDPOINT}?${searchParams.toString()}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          apikey: supabaseConfig.anonKey,
          Authorization: `Bearer ${supabaseConfig.anonKey}`,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.error(
        `Supabase products request failed: ${response.status}`,
      );
      return [];
    }

    const rows = (await response.json()) as SupabaseProductRow[];

    if (!Array.isArray(rows)) {
      return [];
    }

    return rows.map(normalizeProduct);
  } catch (error) {
    console.error("Supabase products request failed:", error);
    return [];
  }
}

export async function getAllProducts(): Promise<Product[]> {
  const searchParams = new URLSearchParams();

  searchParams.set("select", PRODUCT_SELECT);
  searchParams.set("published", "eq.true");
  searchParams.set("order", "position.asc");

  return fetchProducts(searchParams);
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | null> {
  try {
    const searchParams = new URLSearchParams();

    searchParams.set("select", PRODUCT_SELECT);
    searchParams.set("slug", `eq.${slug}`);
    searchParams.set("published", "eq.true");
    searchParams.set("limit", "1");

    const products = await fetchProducts(searchParams);

    return products[0] ?? null;
  } catch (error) {
    console.error("Supabase product lookup failed:", error);
    return null;
  }
}

export async function getRelatedProducts(
  productId: string,
  limit: number,
): Promise<Product[]> {
  if (limit <= 0) {
    return [];
  }

  try {
    const sourceSearchParams = new URLSearchParams();

    sourceSearchParams.set("select", "id,category_id");
    sourceSearchParams.set("id", `eq.${productId}`);
    sourceSearchParams.set("published", "eq.true");
    sourceSearchParams.set("limit", "1");

    const sourceProducts = await fetchProducts(sourceSearchParams);
    const sourceProduct = sourceProducts[0];

    if (!sourceProduct?.category_id) {
      return [];
    }

    const searchParams = new URLSearchParams();

    searchParams.set("select", PRODUCT_SELECT);
    searchParams.set("category_id", `eq.${sourceProduct.category_id}`);
    searchParams.set("published", "eq.true");
    searchParams.set("id", `neq.${productId}`);
    searchParams.set("order", "position.asc");
    searchParams.set("limit", String(limit));

    return fetchProducts(searchParams);
  } catch (error) {
    console.error(
      "Supabase related products request failed:",
      error,
    );
    return [];
  }
}

export async function getFeaturedProducts(
  limit: number,
): Promise<Product[]> {
  if (limit <= 0) {
    return [];
  }

  const searchParams = new URLSearchParams();

  searchParams.set("select", PRODUCT_SELECT);
  searchParams.set("published", "eq.true");
  searchParams.set("featured", "eq.true");
  searchParams.set("order", "position.asc");
  searchParams.set("limit", String(limit));

  return fetchProducts(searchParams);
}
