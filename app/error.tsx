"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md text-center border border-red-100">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">⚠️</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong!</h2>
        <p className="text-gray-500 mb-6 text-sm">
          {error.message || "An unexpected error occurred."}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Reload Page
          </button>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
