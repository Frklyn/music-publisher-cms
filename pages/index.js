import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  const [activeTab, setActiveTab] = useState('music');

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Music Publisher CMS</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-heading font-bold text-primary-600">Music Publisher</h1>
              </div>
            </div>
            <div className="flex items-center">
              <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                Add New Music
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="bg-primary-600 rounded-lg shadow-xl overflow-hidden mb-8">
          <div className="px-6 py-12 md:px-12 text-center md:text-left">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Manage Your Music Portfolio
                </h2>
                <p className="text-primary-100 text-lg mb-6">
                  Streamline your music metadata, licensing, and royalty management all in one place.
                </p>
                <button className="bg-white text-primary-600 px-6 py-3 rounded-md font-medium hover:bg-primary-50 transition-colors">
                  Get Started
                </button>
              </div>
              <div className="hidden md:block md:w-1/2">
                <div className="relative h-64">
                  {/* Add a placeholder for now - would be replaced with actual image */}
                  <div className="absolute inset-0 bg-primary-400 rounded-lg opacity-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('music')}
              className={`${
                activeTab === 'music'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Music Library
            </button>
            <button
              onClick={() => setActiveTab('licenses')}
              className={`${
                activeTab === 'licenses'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Licenses
            </button>
            <button
              onClick={() => setActiveTab('royalties')}
              className={`${
                activeTab === 'royalties'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Royalties
            </button>
          </nav>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample Card - This would be mapped over actual data */}
          <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="h-48 bg-gray-200 rounded-t-lg"></div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-1">Sample Music Title</h3>
              <p className="text-sm text-gray-500 mb-3">Artist Name</p>
              <div className="flex justify-between items-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                  Pop
                </span>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View Details →
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
              © 2024 Music Publisher CMS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
