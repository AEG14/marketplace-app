'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { categories } from '@/lib/categories';
import {
  HiOutlineCollection,
  HiOutlineQuestionMarkCircle,
  HiOutlineTag,
} from 'react-icons/hi';

export default function Sidebar() {
  const pathname = usePathname();

  // Helper for active state
  const isActive = (href: string) => pathname === href;

  return (
    <aside className="w-64 md:block bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6 flex flex-col gap-8">
        {/* Create New Listing Section */}
        <div>
          <h2 className="font-semibold text-gray-900 text-sm px-2 uppercase tracking-wide">Create new listing</h2>
          <nav className="space-y-1">
            <Link
              href="/marketplace/choose-listing-type"
              className={`flex items-center gap-2 py-2 px-3 rounded-lg transition-colors text-sm ${
                isActive('/marketplace/choose-listing-type')
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-800 hover:bg-gray-100'
              }`}
            >
              <HiOutlineTag className="text-lg" />
              Choose listing type
            </Link>
            <Link
              href="/marketplace/not-implemented?feature=your-listings"
              className={`flex items-center gap-2 py-2 px-3 rounded-lg transition-colors text-sm ${
                pathname.startsWith('/marketplace/not-implemented') && pathname.includes('your-listings')
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-800 hover:bg-gray-100'
              }`}
            >
              <HiOutlineCollection className="text-lg" />
              Your listings
            </Link>
            <Link
              href="/marketplace/not-implemented?feature=seller-help"
              className={`flex items-center gap-2 py-2 px-3 rounded-lg transition-colors text-sm ${
                pathname.startsWith('/marketplace/not-implemented') && pathname.includes('seller-help')
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-800 hover:bg-gray-100'
              }`}
            >
              <HiOutlineQuestionMarkCircle className="text-lg" />
              Seller help
            </Link>
          </nav>
        </div>

        {/* Today's Picks */}
        <nav className="mb-1">
          <Link
            href="/marketplace"
            className={`relative block py-2 px-3 rounded-lg font-semibold text-base transition-colors overflow-hidden ${
              isActive('/marketplace')
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-900 hover:bg-gray-100'
            }`}
            style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
          >
            <span className="relative z-10">Today&apos;s picks</span>
            {/* Brighter Shimmer/Wave effect */}
            <span
              className="absolute left-0 top-0 h-full w-full pointer-events-none"
              aria-hidden="true"
            >
              <span className="block h-full w-full animate-[shine_2s_linear_infinite] bg-gradient-to-r from-transparent via-blue-300/80 to-transparent opacity-90" />
            </span>
          </Link>
        </nav>


        {/* Categories section */}
    <div>
      <h2 className="font-semibold mb-2 text-gray-900 text-sm px-2 uppercase tracking-wide">Categories</h2>
      <nav className="space-y-1">
        {categories.map((category) => {
          // Use category.value for the href and category.label for the displayed text
          const catHref = `/marketplace/category/${encodeURIComponent(category.value)}`;
          const active = isActive(catHref);
          return (
            <Link
              key={category.value} // Use category.value as the key since it's unique
              href={catHref}
              className={`block py-2 px-4 rounded-lg text-xs transition-colors ${
                active
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {category.label} {/* Display the human-readable label */}
            </Link>
          );
        })}
      </nav>
    </div>
      </div>
    </aside>
  );
}