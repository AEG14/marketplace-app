import ProductCard from './ProductCard';

interface ProductGridProps {
  category?: string;
}

const products = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  price: 2300,
  title: 'Lorem ipsum dolor sit',
  location: 'Palo Alto, CA',
}));

export default function ProductGrid({ category }: ProductGridProps) {
  // Filter products by category if provided
  const filteredProducts = category 
    ? products.filter(() => true) // Add actual filtering logic here
    : products;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}