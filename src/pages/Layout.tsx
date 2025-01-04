
import { useState, useRef, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../appwrite/auth';

// Banner mapping
const BANNER_MAPPING = {
  '/': '/home.png',
  '/about': '/about.png',
  '/blog': '/blogs.png',
  '/contact': '/contact.jpg',
  '/pictures': '/pictures.jpeg',
  '/books': '/book.jpg',
  // '/awards': '/downloadbanner2.jpeg',
};

function Layout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [currentBanner, setCurrentBanner] = useState(BANNER_MAPPING['/']);
  const [isChangingBanner, setIsChangingBanner] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
 
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Update banner when route changes
  useEffect(() => {
    setIsChangingBanner(true);
    const newBanner = BANNER_MAPPING[location.pathname as keyof typeof BANNER_MAPPING] || BANNER_MAPPING['/'];
    
    setTimeout(() => {
      setCurrentBanner(newBanner);
      setIsChangingBanner(false);
    }, 300);
  }, [location.pathname]);

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
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
    setShowLogoutConfirm(false);
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
      <header className="text-center p-4">
        <div className="relative h-[30vh] rounded-lg overflow-hidden">
          <img 
            src={currentBanner}
            alt="Page Banner"
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isChangingBanner ? 'opacity-0' : 'opacity-100'
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
              <Link to="/about" className="text-classic-blue hover:text-gold transition-colors">
                About
              </Link>
              {showAboutDropdown && (
                <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10">
                  <Link to="/" className="block px-4 py-2 text-classic-blue hover:text-gold hover:bg-gray-50">
                    Biography
                  </Link>
                </div>
              )}
            </div>
            
            <Link to="/blog" className="text-classic-blue hover:text-gold transition-colors">
              Blogs
            </Link>
            
            <Link to="/contact" className="text-classic-blue hover:text-gold transition-colors">
              Contact
            </Link>

            <Link to="/pictures" className="text-classic-blue hover:text-gold transition-colors">
              Pictures
            </Link>
            
          
              <Link to="/books" className="text-classic-blue hover:text-gold transition-colors">
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
              <Link to="/login" className="text-classic-blue hover:text-gold transition-colors">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      <Outlet />

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowLogoutConfirm(false)}
          />
          <div 
            className="relative bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl"
            onClick={e => e.stopPropagation()}
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
    <img 
      src="footer.png" 
      alt="Footer Image" 
      className="w-16 h-16 mb-2" 
    />
    <p className="text-gold">&copy; {new Date().getFullYear()} www.rohitupadhyay.me | All right reserved. </p>
  </div>
</footer>
    </div>
  );
}

export default Layout;





// // Banner mapping
// const BANNER_MAPPING = {
//   '/': '/rohit.jpeg',
//   '/about': '/downloadbanner.jpeg',
//   '/blog': '/downloadbanner2.jpeg',
//   '/contact': '/downloadbanner3.jpeg',
//   '/pictures': '/downloadbanner2.jpeg',
//   '/books': '/downloadbanner3.jpeg',
//   '/fiction': '/downloadbanner2.jpeg',
//   '/non-fiction': '/downloadbanner3.jpeg',
//   '/awards': '/downloadbanner2.jpeg',
// };