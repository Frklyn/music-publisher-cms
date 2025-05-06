import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '../lib/sanity';

export default function MusicCard({ music }) {
  const {
    title,
    artist,
    coverImage,
    genre,
    slug,
  } = music;

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="relative h-48 w-full">
        {coverImage ? (
          <Image
            src={urlFor(coverImage).url()}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <svg 
              className="h-12 w-12 text-gray-400" 
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
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-1 truncate">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mb-3 truncate">
          {artist}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
            {genre}
          </span>
          
          <Link 
            href={`/music/${slug.current}`}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1 group"
          >
            View Details
            <svg 
              className="w-4 h-4 transform transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
