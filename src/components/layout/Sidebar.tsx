'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { categories } from '@/lib/categories';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        {/* Main navigation */}
        <nav className="space-y-2 mb-8">
          <Link 
            href="/marketplace" 
            className={`block py-3 px-4 rounded-lg font-medium transition-colors ${
              pathname === '/marketplace' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-900 hover:bg-gray-100'
            }`}
          >
            All Categories
          </Link>
          
          <Link 
            href="/marketplace/create-listing" 
            className={`block py-3 px-4 rounded-lg font-medium transition-colors ${
              pathname === '/marketplace/create-listing' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-900 hover:bg-gray-100'
            }`}
          >
            Create Listing
          </Link>
        </nav>

        {/* Categories section */}
        <div>
          <h2 className="font-semibold mb-4 text-gray-900 px-4">Categories</h2>
          <nav className="space-y-1">
            {categories.map((cat) => {
              const isActive = pathname === `/marketplace/category/${encodeURIComponent(cat)}`;
              return (
                <Link 
                  key={cat}
                  href={`/marketplace/category/${encodeURIComponent(cat)}`} 
                  className={`block py-2 px-4 rounded-lg text-sm transition-colors ${
                    isActive 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-800 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
}