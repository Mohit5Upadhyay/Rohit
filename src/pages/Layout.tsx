import { useState, useRef, useEffect } from "react";
import { Link,Outlet } from "react-router-dom";

import { useAuth } from '../appwrite/auth';

function Layout() {
  const { user, logout } = useAuth();
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [showBooksDropdown, setShowBooksDropdown] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = (setter: (value: boolean) => void) => {
    clearTimeout(timeoutRef.current);
    setter(true);
  };

  const handleMouseLeave = (setter: (value: boolean) => void) => {
    timeoutRef.current = setTimeout(() => {
      setter(false);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-turquoise text-gold flex flex-col">
      <header className="text-center p-4">
        <img 
          src="/rohit.jpeg"
          className="w-full h-[30vh] object-cover rounded-lg"
        />
      </header>  
      
      <nav className="mx-20 mb-5">
        <div className="bg-white rounded-lg shadow-md">
          <div className="flex justify-center gap-12 px-8 py-4">
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter(setShowAboutDropdown)}
              onMouseLeave={() => handleMouseLeave(setShowAboutDropdown)}
            >
              <Link to="/about" className="text-classic-blue hover:text-gold transition-colors">
                About
              </Link>
              {showAboutDropdown && (
                <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-lg shadow-lg">
                  <Link to="/" className="block px-4 py-2 text-classic-blue hover:text-gold hover:bg-gray-50">
                    Biography
                  </Link>
                  <Link to="/awards" className="block px-4 py-2 text-classic-blue hover:text-gold hover:bg-gray-50">
                    Awards
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
            
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter(setShowBooksDropdown)}
              onMouseLeave={() => handleMouseLeave(setShowBooksDropdown)}
            >
              <Link to="/books" className="text-classic-blue hover:text-gold transition-colors">
                Books
              </Link>
              {showBooksDropdown && (
                <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-lg shadow-lg">
                  <Link to="/fiction" className="block px-4 py-2 text-classic-blue hover:text-gold hover:bg-gray-50">
                    Fiction
                  </Link>
                  <Link to="/non-fiction" className="block px-4 py-2 text-classic-blue hover:text-gold hover:bg-gray-50">
                    Non-Fiction
                  </Link>
                </div>
              )}
              
            </div>
            {user && (
              <button 
                onClick={logout} 
                className="text-classic-blue hover:text-gold transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

  
         <Outlet />

      <footer className="bg-slate-900 text-center p-4 mt-auto">
        <p className="text-gold">&copy; {new Date().getFullYear()} Rohit</p>
      </footer>
    </div>
  );
}

export default Layout;









// import { useState, useEffect } from 'react';
// import { Link, Outlet, useLocation } from 'react-router-dom';
// import { useAuth } from '../appwrite/auth';

// function Layout() {
//   const { user, logout } = useAuth();
//   const location = useLocation();
//   const [headerImage, setHeaderImage] = useState<string>('/rohit/public/rohit.jpeg');

//   useEffect(() => {
//     switch (location.pathname) {
//       case '/about':
//         setHeaderImage('/rohit/public/rohit.jpeg');
//         break;
//       case '/books':
//         setHeaderImage('/books-header.jpg');
//         break;
//       case '/blog':
//         setHeaderImage('/blog-header.jpg');
//         break;
//       case '/contact':
//         setHeaderImage('/contact-header.jpg');
//         break;
//       case '/pictures':
//         setHeaderImage('/pictures-header.jpg');
//         break;
//       default:
//         setHeaderImage('/default-header.jpg');
//         break;
//     }
//   }, [location.pathname]);

//   const handleMouseEnter = (setDropdown: (value: boolean) => void) => {
//     setDropdown(true);
//   };

//   const handleMouseLeave = (setDropdown: (value: boolean) => void) => {
//     setDropdown(false);
//   };

//   const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  
//   return (
//     <div>
//       <header className="relative p-4">
//         <img 
//           src={headerImage} 
//           alt="Header" 
//           className="w-full h-[30vh] object-cover rounded-lg"
//         />
//       </header>  
      
//       <nav className="mx-20 mb-5">
//         <div className="bg-white rounded-lg shadow-md">
//           <div className="flex justify-center gap-12 px-8 py-4">
//             <div 
//               className="relative"
//               onMouseEnter={() => handleMouseEnter(setShowAboutDropdown)}
//               onMouseLeave={() => handleMouseLeave(setShowAboutDropdown)}
//             >
//               <Link to="/about" className="text-classic-blue hover:text-gold transition-colors">
//                 About
//               </Link>
//               {showAboutDropdown && (
//                 <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-lg shadow-lg">
//                   <Link to="/" className="block px-4 py-2 text-classic-blue hover:text-gold hover:bg-gray-50">
//                     Biography
//                   </Link>
//                   <Link to="/" className="block px-4 py-2 text-classic-blue hover:text-gold hover:bg-gray-50">
//                     History
//                   </Link>
//                 </div>
//               )}
//             </div>
//             <Link to="/books" className="text-classic-blue hover:text-gold transition-colors">
//               Books
//             </Link>
//             <Link to="/blog" className="text-classic-blue hover:text-gold transition-colors">
//               Blog
//             </Link>
//             <Link to="/contact" className="text-classic-blue hover:text-gold transition-colors">
//               Contact
//             </Link>
//             <Link to="/pictures" className="text-classic-blue hover:text-gold transition-colors">
//               Pictures
//             </Link>
//             {user && (
//               <button 
//                 onClick={logout} 
//                 className="text-classic-blue hover:text-gold transition-colors"
//               >
//                 Logout
//               </button>
//             )}
//           </div>
//         </div>
//       </nav>

//       <main className="mx-20">
//         <Outlet />
//       </main>
//     </div>
//   );
// }

// export default Layout;