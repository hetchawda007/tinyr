import React from 'react';
import { poppinsregular } from '@/fonts/fonts';

export default function Dashboard() {
  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${poppinsregular.className}`}>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your shortened links and track their performance
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-lg p-8">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Dashboard functionality will be available soon. For now, you can create and use shortened links from the home page.
          </p>
        </div>
      </div>
    </div>
  );
}
