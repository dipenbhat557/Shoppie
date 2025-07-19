import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-800">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-black font-medium">404 Error</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-6xl font-bold text-black mb-6">404 Not Found</h1>
          <p className="text-lg text-black mb-8">
            Your visited page not found. You may go home page.
          </p>
          <Link 
            href="/"
            className="inline-block bg-[#E73C17] hover:bg-[#d63615] text-white px-8 py-3 rounded-md font-semibold transition-colors"
          >
            Back to home page
          </Link>
        </div>
      </div>
    </div>
  )
} 