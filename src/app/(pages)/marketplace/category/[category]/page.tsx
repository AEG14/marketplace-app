'use client';

import { useParams } from 'next/navigation';
import ProductGrid from '@/components/marketplace/ProductGrid';

function prettifyCategory(category: string) {
  return decodeURIComponent(category)
    .replace(/-/g, ' ')
    .replace(/%20/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

export default function CategoryPage() {
  const params = useParams();
  const category = params?.category as string;
  const displayCategory = category ? prettifyCategory(category) : '';

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900">{displayCategory}</h1>
      <ProductGrid category={category} />
    </div>
  );
}