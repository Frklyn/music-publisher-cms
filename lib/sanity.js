import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

// Helper function to fetch music data
export async function getMusic() {
  const music = await client.fetch(`
    *[_type == "music"] {
      _id,
      title,
      slug,
      "artist": artist->name,
      coverImage,
      releaseDate,
      genre,
      description,
      licenseType,
      royaltyRate
    }
  `);
  return music;
}

// Helper function to fetch a single music piece by slug
export async function getMusicBySlug(slug) {
  const music = await client.fetch(`
    *[_type == "music" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      "artist": artist->{
        name,
        bio,
        image
      },
      coverImage,
      releaseDate,
      genre,
      description,
      licenseType,
      royaltyRate
    }
  `, { slug });
  return music;
}

// Helper function to fetch artists
export async function getArtists() {
  const artists = await client.fetch(`
    *[_type == "artist"] {
      _id,
      name,
      slug,
      bio,
      image
    }
  `);
  return artists;
}
