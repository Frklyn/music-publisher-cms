import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '../../components/Layout';
import { getMusicBySlug, urlFor } from '../../lib/sanity';

export default function MusicDetail({ music }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      </Layout>
    );
  }

  if (!music) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900">Music not found</h2>
          <p className="mt-2 text-gray-600">The music piece you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            Return to Home
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {/* Hero Section with Cover Image */}
        <div className="relative h-96">
          {music.coverImage ? (
            <Image
              src={urlFor(music.coverImage).url()}
              alt={music.title}
              layout="fill"
              objectFit="cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <svg 
                className="h-24 w-24 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" 
                />
              </svg>
            </div>
          )}
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-4xl font-bold mb-2">{music.title}</h1>
            <p className="text-xl opacity-90">{music.artist?.name}</p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About this Music</h2>
                <p className="text-gray-600">{music.description}</p>
              </div>

              {/* Artist Info */}
              {music.artist && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">About the Artist</h3>
                  <div className="flex items-start space-x-4">
                    {music.artist.image && (
                      <div className="flex-shrink-0">
                        <Image
                          src={urlFor(music.artist.image).url()}
                          alt={music.artist.name}
                          width={100}
                          height={100}
                          className="rounded-full"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{music.artist.name}</h4>
                      <p className="mt-1 text-gray-600">{music.artist.bio}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Music Details Card */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Music Details</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Genre</dt>
                    <dd className="mt-1 text-sm text-gray-900">{music.genre}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Release Date</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(music.releaseDate).toLocaleDateString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">License Type</dt>
                    <dd className="mt-1 text-sm text-gray-900">{music.licenseType}</dd>
                  </div>
                  {music.royaltyRate && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Royalty Rate</dt>
                      <dd className="mt-1 text-sm text-gray-900">{music.royaltyRate}%</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  // This can be optimized by only getting slugs instead of full music objects
  const music = await client.fetch(`*[_type == "music"]{ "slug": slug.current }`);
  
  return {
    paths: music.map((item) => ({
      params: { slug: item.slug },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const music = await getMusicBySlug(params.slug);
  
  return {
    props: {
      music,
    },
    revalidate: 60, // Revalidate every minute
  };
}
