'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import ProductCard from './ProductCard';

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
  // add other fields as needed
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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}