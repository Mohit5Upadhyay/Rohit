import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../appwrite/auth';
import { account } from '../appwrite/appwriteConfig';


  
  function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const userId = searchParams.get('userId');
    const secret = searchParams.get('secret');
    
    const [isVerifying, setIsVerifying] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (userId && secret) {
        verifyEmail();
      }
    }, [userId, secret]);
  
    const verifyEmail = async () => {
      try {
        setIsVerifying(true);
        await account.updateVerification(userId!, secret!);
        setSuccess(true);
        setTimeout(() => {
          navigate('/', {
            state: { message: 'Email verification successful!' }
          });
        }, 2000);
      } catch (error) {
        console.error('Email verification failed:', error);
        setError('Failed to verify email. Please try again or request a new verification link.');
      } finally {
        setIsVerifying(false);
      }
    };

  if (!userId || !secret) {
    return (
      <div className="min-h-screen bg-turquoise flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-classic-blue mb-4">
                Email Verification Required
              </h2>
              <p className="text-gray-600 mb-4">
                Please check your email for verification instructions.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-turquoise flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            {isVerifying ? (
              <div className="animate-pulse">
                <h2 className="text-2xl font-bold text-classic-blue mb-4">
                  Verifying your email...
                </h2>
              </div>
            ) : error ? (
              <div>
                <h2 className="text-2xl font-bold text-red-600 mb-4">
                  Verification Failed
                </h2>
                <p className="text-gray-600">{error}</p>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-green-600 mb-4">
                  Email Verified!
                </h2>
                <p className="text-gray-600">
                  Redirecting to dashboard...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;