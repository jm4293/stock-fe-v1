import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 Not Found</h1>
      <p className="text-lg mb-8">The page you are looking for does not exist.</p>
      <button onClick={() => navigate('/home')} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        홈으로 돌아가기
      </button>
    </div>
  );
};
