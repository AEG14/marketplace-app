'use client';

import Sidebar from '@/components/layout/Sidebar';
import {
  HiOutlineMail,
  HiOutlineBell,
  HiOutlineUserCircle,
} from 'react-icons/hi';
import { useState } from 'react';

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between gap-4 p-4 border-b bg-white sticky top-0 z-30">
        <div className="flex items-center">
          {/* Hamburger for mobile */}
          <button
            className="md:hidden mr-2 text-gray-600 hover:bg-blue-100 hover:text-blue-700 rounded-full p-1 transition-colors"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <svg width="28" height="28" fill="none" stroke="currentColor" className="block">
              <rect width="28" height="28" rx="14" fill="transparent" />
              <path d="M8 10h12M8 14h12M8 18h12" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
            F
          </div>
          <span className="font-bold text-xl text-gray-900">Marketplace</span>
        </div>
        <div className="flex gap-2">
          <span className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-100 transition-colors cursor-pointer text-gray-600">
            <HiOutlineMail size={20} />
          </span>
          <span className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-100 transition-colors cursor-pointer text-gray-600">
            <HiOutlineBell size={20} />
          </span>
          <span className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-100 transition-colors cursor-pointer text-gray-600">
            <HiOutlineUserCircle size={22} />
          </span>
        </div>
      </header>
      <div className="flex flex-1 min-h-0 relative">
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black bg-opacity-20 md:hidden transition-colors"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar overlay"
          />
        )}
        {/* Sidebar: responsive */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-200
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:static md:translate-x-0 md:shadow-none
          `}
        >
          {/* F Marketplace header for mobile */}
          <div className="md:hidden flex items-center p-6 pb-0">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
              F
            </div>
            <span className="font-bold text-xl text-gray-900">Marketplace</span>
          </div>
          {/* Sidebar content is scrollable */}
          <div className="h-full overflow-y-auto">
            <Sidebar />
          </div>
        </aside>
        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 bg-white text-gray-900 overflow-y-auto min-h-0">
          {children}
        </main>
      </div>
    </div>
  );
}