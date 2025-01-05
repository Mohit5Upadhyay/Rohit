

// import { useEffect, useState } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { account } from '../appwrite/appwriteConfig';

// function VerifyEmail() {
//   const [searchParams] = useSearchParams();
//   const userId = searchParams.get('userId');
//   const secret = searchParams.get('secret');
//   const [isVerifying, setIsVerifying] = useState(true);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (userId && secret) {
//       verifyEmail();
//     }
//   }, [userId, secret]);

//   const verifyEmail = async () => {
//     try {
//       setIsVerifying(true);
//       await account.updateVerification(userId!, secret!);
//       setSuccess(true);
//       setTimeout(() => {
//         navigate('/', { state: { message: 'Email verification successful!' }});
//       }, 2000);
//     } catch (error) {
//       console.error('Email verification failed:', error);
//       setError('Failed to verify email. Please try again or request a new verification link.');
//     } finally {
//       setIsVerifying(false);
//     }
//   };

//   const renderContent = () => {
//     if (!userId || !secret) {
//       return (
//         <div className="text-center">
//           <div className="h-16 w-16 mx-auto mb-4">
//             <svg className="text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
//                     d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold text-gold mb-4">
//             Email Verification Required
//           </h2>
//           <p className="text-gray-400">
//             Please check your email for verification instructions.
//           </p>
//         </div>
//       );
//     }

//     if (isVerifying) {
//       return (
//         <div className="text-center">
//           <div className="animate-spin h-16 w-16 mx-auto mb-4 text-gold">
//             <svg className="w-full h-full" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//               <path className="opacity-75" fill="currentColor" 
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold text-gold mb-4">
//             Verifying your email...
//           </h2>
//           <p className="text-gray-400">Please wait while we verify your email address.</p>
//         </div>
//       );
//     }

//     if (error) {
//       return (
//         <div className="text-center">
//           <div className="h-16 w-16 mx-auto mb-4 text-red-500">
//             <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
//                     d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold text-red-500 mb-4">
//             Verification Failed
//           </h2>
//           <p className="text-gray-400">{error}</p>
//         </div>
//       );
//     }

    

//     return (
//       <div className="text-center">
//         <div className="h-16 w-16 mx-auto mb-4 text-green-500">
//           <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
//                   d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//         </div>
//         <h2 className="text-2xl font-bold text-green-500 mb-4">
//           Email Verified!
//         </h2>
//         <p className="text-gray-400">
//           Redirecting to dashboard...
//         </p>
//       </div>
//     );
  
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col justify-center py-12 px-4">
//       <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
//       <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
//         <div className="bg-white/10 backdrop-blur-md py-8 px-6 shadow-2xl sm:rounded-xl border border-white/20">
//           {renderContent()}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default VerifyEmail;














import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { account } from '../appwrite/appwriteConfig';

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');
  const secret = searchParams.get('secret');
  const [isVerifying, setIsVerifying] = useState(true);
  const [error, setError] = useState('');
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
      setTimeout(() => {
        navigate('/login', { state: { message: 'Email verification successful!' }});
      }, 2000);
    } catch (error) {
      console.error('Email verification failed:', error);
      setError('Failed to verify email. Please try again or request a new verification link.');
    } finally {
      setIsVerifying(false);
    }
  };

  const renderContent = () => {
    if (!userId || !secret) {
      return (
        <div className="text-center">
          <div className="h-16 w-16 mx-auto mb-4">
            <svg className="text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gold mb-4">
            Email Verification Required
          </h2>
          <p className="text-gray-400">
            Please check your email for verification instructions.
          </p>
        </div>
      );
    }

    if (isVerifying) {
      return (
        <div className="text-center">
          <div className="animate-spin h-16 w-16 mx-auto mb-4 text-gold">
            <svg className="w-full h-full" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gold mb-4">
            Verifying your email...
          </h2>
          <p className="text-gray-400">Please wait while we verify your email address.</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center">
          <div className="h-16 w-16 mx-auto mb-4 text-red-500">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            Verification Failed
          </h2>
          <p className="text-gray-400">{error}</p>
        </div>
      );
    }

    return (
      <div className="text-center">
        <div className="h-16 w-16 mx-auto mb-4 text-green-500">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-green-500 mb-4">
          Email Verified!
        </h2>
        <p className="text-gray-400">
          Redirecting to dashboard...
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col justify-center py-12 px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="bg-white/10 backdrop-blur-md py-8 px-6 shadow-2xl sm:rounded-xl border border-white/20">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;