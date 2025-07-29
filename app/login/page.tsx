import { FcGoogle } from 'react-icons/fc'

const page = () => {
  return (
    <div className="min-h-[89vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Login in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Welcome back! Please Login in to continue.
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <button
            type="button"
            className="group relative cursor-pointer w-full flex justify-center items-center py-3 px-4 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 transition-colors duration-200"
          >
            <FcGoogle className="h-5 w-5 mr-3" />
            Continue with Google
          </button>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            By continuing, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default page