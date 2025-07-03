import Link from 'next/link';

type ProductCardProps = {
  id: string;
  price: number;
  title: string;
  location: string;
  image_url?: string;
};

export default function ProductCard({ id, price, title, location, image_url }: ProductCardProps) {
  return (
    <Link href={`/marketplace/${id}`} className="block">
      <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow p-4 flex flex-col items-center cursor-pointer">
        <div className="w-full aspect-square bg-blue-100 rounded-lg mb-2 border-2 border-dashed flex items-center justify-center max-w-32 max-h-32 overflow-hidden">
        {image_url ? (
          <img src={image_url} alt={title} className="object-cover w-full h-full rounded-lg" />
        ) : (
          <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg" />
        )}
        </div>
        <div className="text-sm md:text-lg font-bold">${price.toLocaleString()}</div>
        <div className="text-xs text-center line-clamp-2">{title}</div>
        <div className="text-xs text-gray-500">{location}</div>
      </div>
    </Link>
  );
}