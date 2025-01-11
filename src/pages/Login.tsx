

import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../appwrite/auth';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      setError('Invalid email or password');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="md:w-1/2 hidden md:block">
            <img
              src="/login.webp"
              alt="Login Image"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Form Section */}
          <div className="md:w-1/2 p-8 sm:p-10">
            <h2 className="text-center text-4xl font-bold text-gold mb-2">
              Welcome Back
            </h2>
            <p className="text-center text-gray-400 mb-6">Sign in to continue</p>

            {error && (
              <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gold">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none block w-full px-4 py-3 border border-white/10 
                             rounded-lg bg-white/5 text-white placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-transparent
                             transition-all duration-200"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gold">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none block w-full px-4 py-3 border border-white/10 
                             rounded-lg bg-white/5 text-white placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-transparent
                             transition-all duration-200"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end">
                <Link 
                  to="/forgot-password" 
                  className="text-sm font-medium text-gold hover:text-gold/80 transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-3 px-4 
                           rounded-lg text-sm font-medium transition-all duration-200
                           ${isLoading 
                             ? 'bg-gold/50 cursor-not-allowed' 
                             : 'bg-gold text-black hover:bg-gold/90'
                           }`}
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-gray-400">
                    New here?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/signup"
                  className="w-full inline-flex justify-center py-3 px-4 border border-white/10
                             rounded-lg shadow-sm bg-white/5 text-sm font-medium text-white
                             hover:bg-white/10 transition-all duration-200"
                >
                  Create new account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;