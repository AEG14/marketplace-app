'use client';

import { useState } from 'react';
import ProductGrid from '@/components/marketplace/ProductGrid';
import SearchBar from '@/components/ui/SearchBar';

export default function MarketplacePage() {
  const [search, setSearch] = useState('');

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2 text-gray-900">Today's picks</h1>
      <SearchBar value={search} onChange={setSearch} placeholder="Search all listings..." />
      <ProductGrid search={search} />
    </div>
  );
}