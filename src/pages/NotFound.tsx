function NotFound() {
    return (
      <div className="min-h-screen bg-turquoise flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
          <h1 className="text-4xl font-bold text-classic-blue mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-6">Page not found</p>
          <a 
            href="/"
            className="inline-block bg-classic-blue text-gold px-6 py-2 rounded-lg hover:bg-opacity-90"
          >
            Return Home
          </a>
        </div>
      </div>
    );
  }
  
  export default NotFound;