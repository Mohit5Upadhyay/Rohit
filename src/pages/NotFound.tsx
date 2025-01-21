// function NotFound() {
//     return (
//       <div className="min-h-screen bg-turquoise flex items-center justify-center">
//         <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
//           <h1 className="text-4xl font-bold text-classic-blue mb-4">404</h1>
//           <p className="text-xl text-gray-600 mb-6">Page not found</p>
//           <a 
//             href="/"
//             className="inline-block bg-classic-blue text-gold px-6 py-2 rounded-lg hover:bg-opacity-90"
//           >
//             Return Home
//           </a>
//         </div>
//       </div>
//     );
//   }
  
//   export default NotFound;






function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-xl shadow-2xl max-w-md w-full text-center border border-white/20">
        <h1 className="text-6xl md:text-8xl font-bold text-gold mb-4">404</h1>
        <p className="text-2xl text-white/80 mb-8">Page not found</p>
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a 
          href="/"
          className="inline-block bg-classic-blue text-gold px-8 py-3 rounded-lg 
                   hover:bg-opacity-90 transition-all duration-300 
                   transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}

export default NotFound;