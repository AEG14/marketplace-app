import Link from 'next/link';

type ProductCardProps = {
  id: number;
  price: number;
  title: string;
  location: string;
};

export default function ProductCard({ id, price, title, location }: ProductCardProps) {
  return (
    <Link href={`/marketplace/${id}`} className="block">
      <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow p-4 flex flex-col items-center cursor-pointer">
        <div className="w-full aspect-square bg-blue-100 rounded-lg mb-2 border-2 border-dashed flex items-center justify-center max-w-32 max-h-32">
          {/* Placeholder for product image */}
          <div className="w-full h-full bg-[repeating-linear-gradient(135deg,#60a5fa_0_2px,transparent_2px,transparent_8px),repeating-linear-gradient(45deg,#60a5fa_0_2px,transparent_2px,transparent_8px)] rounded-lg" />
        </div>
        <div className="text-sm md:text-lg font-bold">${price.toLocaleString()}</div>
        <div className="text-xs text-center line-clamp-2">{title}</div>
        <div className="text-xs text-gray-500">{location}</div>
      </div>
    </Link>
  );
}