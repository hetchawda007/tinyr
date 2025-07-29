import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { poppinsregular } from '@/fonts/fonts';

export default function NotFound() {
    return (
        <div className={`min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 ${poppinsregular.className}`}>
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
                        <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                            Create New Link
                        </Button>
                    </Link>
                    <Link href="/" className="block">
                        <Button variant="outline" className="w-full">
                            Go Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
