import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">Page not found</p>
      <Link 
        to="/" 
        className="mt-6 rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
      >
        Go back home
      </Link>
    </div>
  );
}