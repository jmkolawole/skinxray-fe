import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: 'ny6ol74f',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Set to false for fresh data during development
});

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source) {
  return builder.image(source);
}

// GROQ Queries
export const queries = {
  // Get all posts
  allPosts: `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    readTime,
    featured,
    publishedAt,
    tags,
    "author": author->{
      name,
      initials,
      image
    },
    "category": category->{
      title,
      slug
    }
  }`,
  
  // Get featured post
  featuredPost: `*[_type == "post" && featured == true][0] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    readTime,
    featured,
    publishedAt,
    tags,
    "author": author->{
      name,
      initials,
      image
    },
    "category": category->{
      title,
      slug
    }
  }`,
  
  // Get single post by slug
  postBySlug: (slug) => `*[_type == "post" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    featuredImage,
    readTime,
    featured,
    publishedAt,
    tags,
    "author": author->{
      name,
      initials,
      image,
      bio
    },
    "category": category->{
      title,
      slug
    }
  }`,
  
  // Get related posts (same category, excluding current)
  relatedPosts: (categoryId, currentId) => `*[_type == "post" && category._ref == "${categoryId}" && _id != "${currentId}"][0...3] {
    _id,
    title,
    slug,
    featuredImage,
    readTime,
    "category": category->{
      title
    }
  }`,
  
  // Get all categories
  allCategories: `*[_type == "category"] {
    _id,
    title,
    slug,
    description
  }`,
};

// Fetch helper
export async function fetchFromSanity(query) {
  try {
    const data = await sanityClient.fetch(query);
    return data;
  } catch (error) {
    console.error('Error fetching from Sanity:', error);
    return null;
  }
}
