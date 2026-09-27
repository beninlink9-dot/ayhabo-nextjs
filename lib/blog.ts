import { marked } from "marked";

import { supabaseConfig } from "@/lib/supabase";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string | null;
  publishedAt: string;
  updatedAt: string;
};

type BlogApiCategory = {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
};

type BlogApiPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body_markdown: string;
  featured_image_url: string | null;
  published_at: string;
  updated_at: string;
  category?: BlogApiCategory | null;
};

type BlogListResponse = {
  posts: BlogApiPost[];
  categories?: BlogApiCategory[];
};

type BlogListApiResponse =
  | BlogApiPost[]
  | BlogListResponse
  | { data: BlogApiPost[] }
  | { error: string; message?: string };

type BlogGetResponse = {
  post: BlogApiPost;
};

function mapBlogPost(post: BlogApiPost): BlogPost {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.body_markdown,
    category: post.category?.name ?? "",
    image: post.featured_image_url ?? null,
    publishedAt: post.published_at,
    updatedAt: post.updated_at,
  };
}

export function prepareBlogContent(raw: string): string {
  if (!raw) return "";

  let html = marked.parse(raw, { async: false }) as string;
  html = html.replace(/\\/produit\\//g, "/produits/");
  html = html.replace(
    /https:\\/\\/www\\.ayhabo\\.com\\/produit\\//g,
    "https://www.ayhabo.com/produits/",
  );

  return html;
}

async function blogRequest<T>(
  path: string,
  body: Record<string, unknown>,
): Promise<T> {
  const url = `${supabaseConfig.blogUrl}${path}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      next: {
        revalidate: 120,
      },
    });

    const rawBody = await response.text();

    console.log("[Ay-Habo Blog] URL:", url);
    console.log("[Ay-Habo Blog] HTTP status:", response.status);
    console.log("[Ay-Habo Blog] Raw response:", rawBody.slice(0, 500));

    if (!response.ok) {
      throw new Error(`Blog API error: ${response.status}`);
    }

    try {
      return JSON.parse(rawBody) as T;
    } catch {
      throw new Error("Blog API returned invalid JSON");
    }
  } catch (error) {
    console.error("[Ay-Habo Blog] Request failed:", error);
    throw error;
  }
}

function extractPosts(data: BlogListApiResponse): BlogApiPost[] {
  if (Array.isArray(data)) return data;
  if ("posts" in data && Array.isArray(data.posts)) return data.posts;
  if ("data" in data && Array.isArray(data.data)) return data.data;

  if ("error" in data) {
    console.error("[Ay-Habo Blog] API error:", data.error, data.message ?? "");
  }

  return [];
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const data = await blogRequest<BlogListApiResponse>("/public/list", {
      limit: 50,
    });

    return extractPosts(data).map(mapBlogPost);
  } catch (error) {
    console.error("[Ay-Habo Blog] getBlogPosts failed:", error);
    return [];
  }
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  try {
    const data = await blogRequest<BlogGetResponse>("/public/get", { slug });

    return data.post ? mapBlogPost(data.post) : null;
  } catch (error) {
    if (error instanceof Error && error.message.includes("404")) {
      return null;
    }

    throw error;
  }
}

export async function getRelatedPosts(
  postId: string,
  limit = 3,
): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  const currentPost = posts.find((post) => post.id === postId);

  if (!currentPost) {
    return posts.slice(0, Math.max(0, limit));
  }

  return posts
    .filter((post) => post.id !== postId)
    .filter((post) => post.category === currentPost.category)
    .slice(0, Math.max(0, limit));
}
