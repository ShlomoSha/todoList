import { Link } from 'react-router-dom';
import { useTypedRouteError } from '../../hooks/useTypedRouteError';

export default function ErrorPage() {
  const error = useTypedRouteError();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-red-600">
        {error.status || 'Error'}
      </h1>
      <p className="mt-4 text-xl text-gray-600">
        {error.statusText || 'Something went wrong'}
      </p>
      <p className="mt-2 text-gray-500">{error.message}</p>
      <Link 
        to="/" 
        className="mt-6 rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
      >
        Go back home
      </Link>
    </div>
  );
}