import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center max-w-md mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Link Not Found
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        The shortened link you&apos;re looking for doesn&apos;t exist or has been removed.
                    </p>
                </div>

                <div className="space-y-4">
                    <Link href="/" className="block">
                        <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                            Create New Link
                        </button>
                    </Link>

                    <Link href="/dashboard" className="block">
                        <button className="w-full border border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            Go to Dashboard
                        </button>
                    </Link>
                </div>

                <div className="mt-8 text-xs text-gray-500 dark:text-gray-400">
                    Error 404 - Page Not Found
                </div>
            </div>
        </div>
    );
}
