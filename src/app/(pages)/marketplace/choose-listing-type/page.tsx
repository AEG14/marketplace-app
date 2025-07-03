'use client';

import Link from 'next/link';
import {
  HiOutlineTag,
  HiOutlineClipboardList,
  HiOutlineTruck,
  HiOutlineHome,
} from 'react-icons/hi';

const listingTypes = [
  {
    label: 'Item for sale',
    description: 'Lorem ipsum dolor sit',
    icon: <HiOutlineTag className="text-3xl text-gray-400" />,
    href: '/marketplace/create-listing',
  },
  {
    label: 'Create multiple listings',
    description: 'Lorem ipsum dolor sit',
    icon: <HiOutlineClipboardList className="text-3xl text-gray-400" />,
    href: '/marketplace/not-implemented?feature=multiple-listings',
  },
  {
    label: 'Vehicle for sale',
    description: 'Lorem ipsum dolor sit',
    icon: <HiOutlineTruck className="text-3xl text-gray-400" />,
    href: '/marketplace/not-implemented?feature=vehicle',
  },
  {
    label: 'Home for sale or rent',
    description: 'Lorem ipsum dolor sit',
    icon: <HiOutlineHome className="text-3xl text-gray-400" />,
    href: '/marketplace/not-implemented?feature=home',
  },
];

export default function ChooseListingTypePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8 text-gray-900 text-center">Choose listing type</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
        {listingTypes.map((type) => (
          <Link
            key={type.label}
            href={type.href}
            className="bg-white rounded-xl shadow hover:shadow-md transition-shadow p-6 flex flex-col items-center w-full max-w-xs border border-gray-100 hover:border-blue-200"
          >
            <div className="mb-4">{type.icon}</div>
            <div className="font-semibold text-gray-900 text-center mb-1">{type.label}</div>
            <div className="text-xs text-gray-500 text-center">{type.description}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}