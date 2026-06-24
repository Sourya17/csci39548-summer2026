export default function AboutPage() {
  return (
    <div className="py-8 px-4 sm:py-12">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          About
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Built for CSCI 39548 to demonstrate client-side routing with React
          Router. Data is served by json-server and managed with TanStack Query;
          React Router only decides which page you see.
        </p>
      </div>
    </div>
  );
}
