'use client';

import Link from 'next/link';

export function Navbar() {
  return (
    <header className="w-full flex-shrink-0 bg-red-600 dark:bg-red-800 border-b border-border">
      <div className="flex items-center justify-between w-full px-4 md:px-6 py-3">
        <div className="flex items-center gap-3">
          <Link href="/" prefetch={false} className="flex-shrink-0">
            <div className="w-10 h-10 p-1 bg-white/20 rounded-md flex items-center justify-center border border-white/30">
              <span className="text-lg font-bold text-white">x</span>
            </div>
          </Link>
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-bold text-white leading-tight">
              x40tube
            </h1>
            <p className="text-xs md:text-sm text-white/80 leading-tight">
              Home / Videos
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <button className="px-4 py-2 bg-white/20 border border-white/30 rounded-md text-sm text-white hover:bg-white/30 transition-colors">
            Search
          </button>
          <button className="px-4 py-2 bg-white/20 border border-white/30 rounded-md text-sm text-white hover:bg-white/30 transition-colors">
            Connect
          </button>
        </div>
      </div>
    </header>
  );
}
