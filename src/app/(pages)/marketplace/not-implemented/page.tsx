'use client';

import { useSearchParams } from 'next/navigation';

export default function NotImplementedPage() {
  const params = useSearchParams();
  const feature = params.get('feature');

  return (
    <div className="flex flex-col items-center justify-center h-full py-24">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Not Yet Implemented</h1>
      <p className="text-lg text-gray-700 mb-2">
        {feature
          ? `The "${feature.replace(/-/g, ' ')}" feature is not yet implemented.`
          : 'This feature is not yet implemented.'}
      </p>
      <p className="text-gray-500">Please check back later.</p>
    </div>
  );
}