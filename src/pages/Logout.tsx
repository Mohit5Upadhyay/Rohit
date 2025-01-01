// pages/LogoutButton.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../appwrite/auth';

function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={`px-4 py-2 rounded-lg transition-colors ${
        isLoading 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-classic-blue text-gold hover:bg-opacity-90'
      }`}
    >
      {isLoading ? 'Logging out...' : 'Logout'}
    </button>
  );
}

export default LogoutButton;