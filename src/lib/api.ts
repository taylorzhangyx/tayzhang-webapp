/**
 * API client for communicating with the backend.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_KEY = process.env.API_KEY || '';

interface PostMetadata {
  title: string;
  slug: string;
  description: string | null;
  author: string | null;
  date: string | null;
  tags: string[];
  published: boolean;
}

interface Post extends PostMetadata {
  content: string;
  html_content: string;
}

interface PostListResponse {
  posts: PostMetadata[];
  total: number;
}

async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'X-API-Key': API_KEY,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function getPosts(): Promise<PostListResponse> {
  return fetchApi<PostListResponse>('/api/posts');
}

export async function getPost(slug: string): Promise<Post> {
  return fetchApi<Post>(`/api/posts/${slug}`);
}

export type { Post, PostMetadata, PostListResponse };
