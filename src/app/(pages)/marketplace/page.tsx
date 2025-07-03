import ProductGrid from '@/components/marketplace/ProductGrid';

export default function MarketplacePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6"><span>Today&apos;s picks</span></h1>
      <ProductGrid />
    </div>
  );
}