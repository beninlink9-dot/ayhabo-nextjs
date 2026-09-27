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

async function blogRequest<T>(
  path: string,
  body: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(`${supabaseConfig.blogUrl}${path}`, {
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

  if (!response.ok) {
    throw new Error(`Blog API error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const data = await blogRequest<BlogListResponse>("/public/list", {
    limit: 50,
  });

  return (data.posts ?? []).map(mapBlogPost);
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
