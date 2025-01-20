

import { useState, useRef, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../appwrite/auth";
import { useNewsletter } from "../hooks/useNewsletter";
import { toast, Toaster } from 'react-hot-toast';



// Banner mapping
const BANNER_MAPPING = {
  "/": "/home.webp",
  "/about": "/about.webp",
  "/blog": "/blogs.webp",
  "/contact": "/contact.webp",
  "/pictures": "/pictures.webp",
  "/books": "/book.webp",
};



function Layout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [currentBanner, setCurrentBanner] = useState(BANNER_MAPPING["/"]);
  const [isChangingBanner, setIsChangingBanner] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isNewsletterVisible, setIsNewsletterVisible] = useState(false);
  const [email, setEmail] = useState("");

  const { isSubscribing, subscribe } = useNewsletter();
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setIsChangingBanner(true);
    const newBanner =
      BANNER_MAPPING[location.pathname as keyof typeof BANNER_MAPPING] ||
      BANNER_MAPPING["/"];

    setTimeout(() => {
      setCurrentBanner(newBanner);
      setIsChangingBanner(false);
    }, 300);
  }, [location.pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNewsletterVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = (setter: (value: boolean) => void) => {
    clearTimeout(timeoutRef.current);
    setter(true);
  };

  const handleMouseLeave = (setter: (value: boolean) => void) => {
    timeoutRef.current = setTimeout(() => {
      setter(false);
    }, 300);
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:");
    }
    setShowLogoutConfirm(false);
  };
/////////Newsletter
  const handleNewsletterDismiss = () => {
    setIsNewsletterVisible(false);
  };

  const handleSubscribe = async () => {
    try {
      if (!email || !email.includes('@')) {
        toast.error('Please enter a valid email address');
        return;
      }

      const success = await subscribe(email);
      if (success) {
        setIsNewsletterVisible(false);
        setEmail('');
        toast.success('Successfully subscribed to newsletter!');
      }
    } catch (error) {
      console.error('Newsletter subscription failed:');
      toast.error('Failed to subscribe. Please try again later.');
    }
  };


  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#000] text-gold flex flex-col">
       <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: '#166534',
              color: '#fff',
            },
          },
          error: {
            style: {
              background: '#991B1B',
              color: '#fff',
            },
          },
          duration: 3000,
        }}
      />
      <header className="text-center p-4">
        <div className="relative h-[30vh] rounded-lg overflow-hidden">
          <img
            src={currentBanner}
            alt="Page Banner"
            loading="eager"
            fetchPriority="high"
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isChangingBanner ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>
      </header>

      <nav className="mx-4 md:mx-20 mb-5">
        <div className="bg-white rounded-lg shadow-md">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 px-4 md:px-8 py-4">
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter(setShowAboutDropdown)}
              onMouseLeave={() => handleMouseLeave(setShowAboutDropdown)}
            >
              <Link
                to="/about"
                className="text-classic-blue hover:text-gold transition-colors"
              >
                About
              </Link>
              {showAboutDropdown && (
                <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10">
                  <Link
                    to="/"
                    className="block px-4 py-2 text-classic-blue hover:text-gold hover:bg-gray-50"
                  >
                    Biography
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/blog"
              className="text-classic-blue hover:text-gold transition-colors"
            >
              Blogs
            </Link>

            <Link
              to="/contact"
              className="text-classic-blue hover:text-gold transition-colors"
            >
              Contact
            </Link>

            <Link
              to="/pictures"
              className="text-classic-blue hover:text-gold transition-colors"
            >
              Pictures
            </Link>

            <Link
              to="/books"
              className="text-classic-blue hover:text-gold transition-colors"
            >
              Books
            </Link>

            {user ? (
              <button
                onClick={handleLogoutClick}
                className="text-classic-blue hover:text-gold transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-classic-blue hover:text-gold transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* {isNewsletterVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleNewsletterDismiss}
          />
          <div
            className="relative bg-black text-gold p-6 text-center rounded-lg shadow-md max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">
              Subscribe to our Newsletter
            </h2>
            <p className="mb-4">
              Stay updated with our latest news and offers.
            </p>
            <div className="flex justify-center items-center mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 rounded-l-lg border-none focus:outline-none text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubscribing}
              />
              <button
                className={`bg-gold text-black p-2 rounded-r-lg ${
                  isSubscribing ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleSubscribe}
                disabled={isSubscribing}
              >
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
            <button
              onClick={handleNewsletterDismiss}
              className="absolute right-4 top-4 bg-transparent border-none text-red-600 text-xl cursor-pointer"
            >
              ✖
            </button>
          </div>
        </div>
      )} */}
      {isNewsletterVisible && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={handleNewsletterDismiss}
    />
    <div
      className="relative bg-black text-gold rounded-xl shadow-xl 
                 w-[90%] md:w-[450px] 
                 p-6 md:p-8
                 transform transition-all
                 scale-100 opacity-100"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close button */}
      <button
        onClick={handleNewsletterDismiss}
        className="absolute right-4 top-4 p-2 text-gray-400 hover:text-red-500 
                   transition-colors duration-200"
        aria-label="Close newsletter"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Content */}
      <div className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold">
          Subscribe to our Newsletter
        </h2>
        <p className="text-gray-300 text-sm md:text-base">
          Stay updated with our latest news and offers.
        </p>
        
        {/* Form */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 p-3 rounded-lg sm:rounded-r-none
                     border-2 border-transparent
                     focus:border-gold/50 focus:outline-none
                     text-black transition-all duration-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubscribing}
          />
          <button
            className={`px-6 py-3 bg-gold text-black font-medium
                      rounded-lg sm:rounded-l-none
                      hover:bg-gold/90 transition-all duration-200
                      ${isSubscribing ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleSubscribe}
            disabled={isSubscribing}
          >
            {isSubscribing ? "Subscribing..." : "Subscribe"}
          </button>
        </div>
      </div>
    </div>
  </div>
)}




      <Outlet />

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowLogoutConfirm(false)}
          />
          <div
            className="relative bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Confirm Logout
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to logout?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 
                           transition-colors rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmLogout}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg 
                           hover:bg-red-700 transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

        <footer className="bg-slate-900 text-center p-4 mt-auto">
          <div className="flex flex-col items-center">
            <div className="relative w-16 aspect-square mb-2 overflow-hidden rounded-lg group">
              <img 
                src="/footer.webp" 
                alt="Rohit Upadhyay Logo"
                width={281}
                height={350}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <p className="text-gold">
              &copy; {new Date().getFullYear()} www.rohitupadhyay.me | All rights reserved.
            </p>
          </div>
        </footer>
    
    </div>
  );
}

export default Layout;