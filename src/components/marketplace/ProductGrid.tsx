'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import ProductCard from './ProductCard';
import Button from '@/components/ui/Button';

interface ProductGridProps {
  category?: string;
  search?: string;
}

type Listing = {
  id: string;
  price: number;
  title: string;
  location: string;
  image_url?: string;
};

export default function ProductGrid({ category, search }: ProductGridProps) {
  const [products, setProducts] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let query = supabase.from('listings').select('*').order('created_at', { ascending: false });
    if (category) query = query.eq('category', category);
    if (search) query = query.ilike('title', `%${search}%`);
    query.then(({ data }) => {
      setProducts(data || []);
      setLoading(false);
    });
  }, [category, search]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-gray-100 animate-pulse rounded-xl h-64" />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 w-full">
        <div className="text-2xl font-semibold mb-2">No listings found</div>
        <div className="text-gray-500 mb-4">Be the first to create a listing!</div>
        <Button onClick={() => window.location.href = '/marketplace/choose-listing-type'}>
          Create Listing
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}