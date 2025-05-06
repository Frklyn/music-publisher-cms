import { getMusic, getArtists } from '../lib/sanity';
import Link from 'next/link';

export default function DatabasePage({ music, artists }) {
  return (
    <div className="bg-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Database Overview</h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          {/* Music Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Music Records</h2>
            <div className="space-y-4">
              {music?.map((item) => (
                <div key={item._id} className="bg-white p-4 rounded-md shadow-sm">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.artist}</p>
                  <Link 
                    href={`/music/${item.slug.current}`}
                    className="text-primary-600 text-sm hover:underline mt-2 inline-block"
                  >
                    View Details →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Artists Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Artists</h2>
            <div className="space-y-4">
              {artists?.map((artist) => (
                <div key={artist._id} className="bg-white p-4 rounded-md shadow-sm">
                  <h3 className="font-medium">{artist.name}</h3>
                  <Link 
                    href={`/artists/${artist.slug.current}`}
                    className="text-primary-600 text-sm hover:underline mt-2 inline-block"
                  >
                    View Profile →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const [music, artists] = await Promise.all([
    getMusic(),
    getArtists()
  ]);

  return {
    props: {
      music,
      artists
    },
    revalidate: 60
  };
}
