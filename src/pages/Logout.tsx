


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../appwrite/auth';

function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutConfirm = async () => {
    try {
      setIsLoading(true);
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        disabled={isLoading}
        className={`px-4 py-2 rounded-lg transition-colors ${
          isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-classic-blue text-gold hover:bg-opacity-90'
        }`}
      >
        Logout
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => !isLoading && setShowConfirm(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div 
              className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Confirm Logout
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to logout?
              </p>
              
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  disabled={isLoading}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 
                           transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogoutConfirm}
                  disabled={isLoading}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg 
                           hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Logging out...' : 'Confirm'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LogoutButton;