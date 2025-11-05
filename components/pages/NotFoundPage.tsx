
import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center py-16">
      <h1 className="text-6xl font-bold text-accent">404</h1>
      <h2 className="text-3xl font-bold mt-4">Page Not Found</h2>
      <p className="text-gray-600 mt-2">
        Sorry, the page you are looking for does not exist.
      </p>
      <div className="mt-8">
        <Link
          to="/"
          className="inline-block bg-accent text-white font-semibold py-3 px-8 rounded-md hover:bg-blue-600 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};
