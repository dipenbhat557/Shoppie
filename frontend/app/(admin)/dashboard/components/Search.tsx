import { Mic, Search as SearchIcon } from 'lucide-react';
import { Input } from "@/components/input";

export function Search({isMobile}: {isMobile?: boolean}) {
  return (
    <div className={`max-w-md mx-auto md:mx-0 md:flex-1 md:pb-2 ${isMobile ? 'hidden md:block': 'md:hidden'}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon className="h-4 w-4 text-gray-500" />
        </div>
        
        <Input
          type="search"
          placeholder="Search products, orders..."
          className="pl-10 pr-12 py-2 w-full bg-white border-gray-200 focus-visible:ring-orange-400"
        />
        
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Voice search"
        >
          <Mic className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
