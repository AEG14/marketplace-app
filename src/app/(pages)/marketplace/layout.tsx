import Sidebar from '@/components/layout/Sidebar';

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between gap-4 p-4 border-b bg-white">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
            F
          </div>
          <span className="font-bold text-xl text-gray-900">Marketplace</span>
        </div>
        <div className="flex gap-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </header>
      {/* Main content */}
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 bg-white text-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}