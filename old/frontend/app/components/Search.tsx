import React, { useEffect, useRef, useState } from 'react';
import { ProductData } from '../utils/store';
import Link from 'next/link';

const Search = ({products}:{products:ProductData[]}) => {
    const [searchResult, setSearchResult] = useState<ProductData[]>([]);
    const [input, setInput] = useState("");
    const [searchOpen, setSearchOpen] = useState(false)
    
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (input) {
            setSearchResult(
                products.filter(product =>
                    product.title.toLowerCase().includes(input.toLowerCase())
                )
            );
            
        } else {
            setSearchResult([]);
        }
        handleMouseOverSearch();
    }, [input, products]);

    const handleMouseOverSearch = () => {
        setSearchOpen(true);
        if (timeoutId.current) clearTimeout(timeoutId.current);
      };
    
      const handleMouseLeaveSearch = () => {
        timeoutId.current = setTimeout(() => setSearchOpen(false), 1000);
      };

    return (
        <div className="relative w-full max-w-lg">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search for products..."
                className="w-full pl-10 pr-4 py-2 text-gray-700 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
            >
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm8.707-1.293l-4.294-4.293A6.978 6.978 0 0017 10a7 7 0 10-7 7 6.978 6.978 0 003.414-.793l4.293 4.294a1 1 0 001.414-1.414z"
                    clipRule="evenodd"
                />
            </svg>
            {input && searchOpen && (
                <div
                 onMouseEnter={handleMouseOverSearch}
                 onMouseLeave={handleMouseLeaveSearch}
                 className='absolute top-12 w-full max-w-lg bg-white shadow-lg rounded-lg z-20'>
                    {searchResult.length > 0 ? (
                        searchResult.map((product) => (
                            <Link href={`/products/${product.id}`} key={product.id}>
                                <p className='block px-4 py-2 text-gray-700 hover:bg-gray-200'>{product.title}</p>
                            </Link>
                        ))
                    ) : (
                        <div className='px-4 py-2 text-gray-500'>No results found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;
