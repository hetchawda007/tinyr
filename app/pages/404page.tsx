import Link from 'next/link';

export default function NotFoundPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-gray-600 mb-8">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>
                </div>
                
                <div className="space-y-4">
                    <Link 
                        href="/"
                        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                    >
                        Go Back Home
                    </Link>
                    
                    <div className="text-sm text-gray-500">
                        <p>Lost? Try going back to the homepage.</p>
                    </div>
                </div>
                
                <div className="mt-12">
                    <svg
                        className="mx-auto h-32 w-32 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}