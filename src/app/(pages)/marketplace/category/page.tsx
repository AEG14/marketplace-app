'use client';

import { useParams } from 'next/navigation';
import ProductGrid from '@/components/marketplace/ProductGrid';

export default function CategoryPage() {
  const params = useParams();
  const category = params?.category as string;
  
  // Decode and format the category name for display
  const displayCategory = category 
    ? decodeURIComponent(category).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    : '';
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{displayCategory}</h1>
      <ProductGrid category={category} />
    </div>
  );
}