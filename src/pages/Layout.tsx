

import { useState, useRef, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation, NavLink } from "react-router-dom";
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
        <div className="relative w-full h-[20vh] md:h-[30vh] lg:h-[40vh] rounded-lg overflow-hidden">
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
              <NavLink
                to="/about"
                className="text-classic-blue hover:text-gold transition-colors"
                style={({isActive}) => (isActive ? {color: '#0f4c81', fontWeight:800} : undefined)}
              >
                About
              </NavLink>
              {showAboutDropdown && (
                <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10">
                  <NavLink
                    to="/"
                    className="block px-4 py-2 text-classic-blue hover:text-gold rounded-lg hover:bg-gray-50"
                    style={({isActive}) => (isActive ? {color: '#0f4c81', fontWeight:800} : undefined)}

                  >
                    Biography
                  </NavLink>
                </div>
              )}
            </div>

            <NavLink
              to="/blog"
              className="text-classic-blue hover:text-gold transition-colors"
              style={({isActive}) => (isActive ? {color: '#0f4c81', fontWeight:800} : undefined)}

            >
              Blogs
            </NavLink>

            <NavLink
              to="/contact"
              className="text-classic-blue hover:text-gold transition-colors"
              style={({isActive}) => (isActive ? {color: '#0f4c81', fontWeight:800} : undefined)}

            >
              Contact
            </NavLink>

            <NavLink
              to="/pictures"
              className="text-classic-blue hover:text-gold transition-colors"
              style={({isActive}) => (isActive ? {color: '#0f4c81', fontWeight:800} : undefined)}

            >
              Story Board
            </NavLink>

            <NavLink
              to="/books"
              className="text-classic-blue hover:text-gold transition-colors"
              style={({isActive}) => (isActive ? {color: '#0f4c81', fontWeight:800} : undefined)}

            >
              Books
            </NavLink>

            {user ? (
              <button
                onClick={handleLogoutClick}
                className="text-classic-blue hover:text-gold transition-colors"

                
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className="text-classic-blue hover:text-gold transition-colors"
                style={({isActive}) => (isActive ? {color: '#0f4c81', fontWeight:800} : undefined)}

              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </nav>

      

{/* <nav className="sticky top-0 z-50 mx-4 md:mx-20 mb-5 transition-all duration-300">
  <div className="backdrop-blur-md bg-white/90 rounded-xl shadow-lg border border-gray-200/20">
    <div className="flex flex-wrap justify-center gap-6 md:gap-12 px-6 md:px-10 py-4">
      <div
        className="relative group"
        onMouseEnter={() => handleMouseEnter(setShowAboutDropdown)}
        onMouseLeave={() => handleMouseLeave(setShowAboutDropdown)}
      >
        <Link
          to="/about"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-classic-blue 
                     hover:text-gold transition-all duration-300 hover:bg-gray-50/50"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          About
        </Link>
        {showAboutDropdown && (
          <div className="absolute top-full left-0 mt-2 w-48 backdrop-blur-md 
                         bg-white/90 rounded-xl shadow-xl border border-gray-200/20 
                         transform transition-all duration-300">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-3 text-classic-blue 
                         hover:text-gold hover:bg-gray-50/50 rounded-xl"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Biography
            </Link>
          </div>
        )}
      </div>

      <Link
        to="/blog"
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-classic-blue 
                   hover:text-gold transition-all duration-300 hover:bg-gray-50/50"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-.586-1.414l-3.5-3.5A2 2 0 0012.586 4H10" />
        </svg>
        Blogs
      </Link>

      <Link
        to="/contact"
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-classic-blue 
                   hover:text-gold transition-all duration-300 hover:bg-gray-50/50"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Contact
      </Link>

      <Link
        to="/pictures"
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-classic-blue 
                   hover:text-gold transition-all duration-300 hover:bg-gray-50/50"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Pictures
      </Link>

      <Link
        to="/books"
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-classic-blue 
                   hover:text-gold transition-all duration-300 hover:bg-gray-50/50"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        Books
      </Link>

      {user ? (
        <button
          onClick={handleLogoutClick}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-classic-blue 
                     hover:text-gold transition-all duration-300 hover:bg-gray-50/50"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      ) : (
        <Link
          to="/login"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-classic-blue 
                     hover:text-gold transition-all duration-300 hover:bg-gray-50/50"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          Login
        </Link>
      )}
    </div>
  </div>
</nav> */}


{/* <nav className="mx-4 md:mx-20 mb-5">
  <div className="bg-gradient-to-r from-white/90 via-white/95 to-white/90 
                  backdrop-filter backdrop-blur-sm rounded-xl shadow-lg">
    <div className="flex flex-wrap justify-center gap-8 md:gap-16 px-8 py-5">
      <div
        className="relative group"
        onMouseEnter={() => handleMouseEnter(setShowAboutDropdown)}
        onMouseLeave={() => handleMouseLeave(setShowAboutDropdown)}
      >
        <Link
          to="/about"
          className={`relative inline-block px-3 py-2 text-lg font-medium 
            ${location.pathname === '/about'
              ? 'text-gold'
              : 'text-classic-blue hover:text-gold'} 
            transition-colors duration-300 
            after:content-[""] after:absolute after:w-full after:h-0.5 
            after:bg-gold after:left-0 after:bottom-0 
            after:origin-bottom-right after:scale-x-0 
            hover:after:origin-bottom-left hover:after:scale-x-100 
            after:transition-transform after:duration-300`}
        >
          About
        </Link>
        {showAboutDropdown && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 
                         bg-white/95 rounded-lg shadow-xl border border-gold/10 
                         transform transition-all duration-300 origin-top">
            <Link
              to="/"
              className="block px-6 py-3 text-classic-blue hover:text-gold 
                         hover:bg-gold/5 transition-all duration-300"
            >
              Biography
            </Link>
          </div>
        )}
      </div>

      {['blog', 'contact', 'pictures', 'books'].map((item) => (
        <Link
          key={item}
          to={`/${item}`}
          className={`relative inline-block px-3 py-2 text-lg font-medium 
            ${location.pathname === `/${item}`
              ? 'text-gold'
              : 'text-classic-blue hover:text-gold'} 
            transition-colors duration-300
            after:content-[""] after:absolute after:w-full after:h-0.5 
            after:bg-gold after:left-0 after:bottom-0 
            after:origin-bottom-right after:scale-x-0 
            hover:after:origin-bottom-left hover:after:scale-x-100 
            after:transition-transform after:duration-300`}
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </Link>
      ))}

      {user ? (
        <button
          onClick={handleLogoutClick}
          className="relative inline-block px-3 py-2 text-lg font-medium 
                    text-classic-blue hover:text-gold transition-colors duration-300
                    after:content-[''] after:absolute after:w-full after:h-0.5 
                    after:bg-gold after:left-0 after:bottom-0 
                    after:origin-bottom-right after:scale-x-0 
                    hover:after:origin-bottom-left hover:after:scale-x-100 
                    after:transition-transform after:duration-300"
        >
          Logout
        </button>
      ) : (
        <Link
          to="/login"
          className={`relative inline-block px-3 py-2 text-lg font-medium 
            ${location.pathname === '/login'
              ? 'text-gold'
              : 'text-classic-blue hover:text-gold'} 
            transition-colors duration-300
            after:content-[""] after:absolute after:w-full after:h-0.5 
            after:bg-gold after:left-0 after:bottom-0 
            after:origin-bottom-right after:scale-x-0 
            hover:after:origin-bottom-left hover:after:scale-x-100 
            after:transition-transform after:duration-300`}
        >
          Login
        </Link>
      )}
    </div>
  </div>
</nav> */}








      

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
            <div className="relative w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 mb-2 overflow-hidden rounded-lg group">
              <img 
                src="/footer.webp" 
                alt="Rohit Upadhyay Logo"
                width={281}
                height={350}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-150"
                sizes="(max-width: 768px) 48px, (max-width: 1200px) 64px, 80px"
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