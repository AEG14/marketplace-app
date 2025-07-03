'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import ProductGrid from '@/components/marketplace/ProductGrid';
import SearchBar from '@/components/ui/SearchBar';
import { categories } from '@/lib/categories';

function prettifyCategory(category: string) {
  return decodeURIComponent(category)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

export default function CategoryPage() {
  const params = useParams();
  const category = params?.category as string;
  const displayCategory = prettifyCategory(category);

  const [search, setSearch] = useState('');

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2 text-gray-900">{displayCategory}</h1>
      <SearchBar value={search} onChange={setSearch} placeholder={`Search in ${displayCategory}...`} />
      <ProductGrid category={category} search={search} />
    </div>
  );
}