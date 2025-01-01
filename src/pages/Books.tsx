// // import { useState, useEffect } from 'react';

// // import conf from '../config/conf';

// // import { getBooks, getBooksByCategory, searchBooks } from '../appwrite/db';
// // import { Book } from '../types/types';


// // // Removed the local Book interface as it is now imported from '../appwrite/db'


// // function Books() {
// //   const [books, setBooks] = useState<Book[]>([]);
// //   const [selectedCategory, setSelectedCategory] = useState('All');
// //   const [selectedBook, setSelectedBook] = useState<Book | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [searchQuery, setSearchQuery] = useState('');

// //   useEffect(() => {
// //     fetchBooks();
// //   }, []);

// //   const fetchBooks = async () => {
// //     try {
// //       setLoading(true);
// //       const fetchedBooks = await getBooks();
// //       setBooks(fetchedBooks);
// //     } catch (error) {
// //       setError('Failed to fetch books');
// //       console.error(error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleCategoryChange = async (category: string) => {
// //     try {
// //       setLoading(true);
// //       setSelectedCategory(category);
// //       const filteredBooks = category === 'All' 
// //         ? await getBooks()
// //         : await getBooksByCategory(category);
// //       setBooks(filteredBooks);
// //     } catch (error) {
// //       setError('Failed to filter books');
// //       console.error(error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleSearch = async () => {
// //     if (!searchQuery.trim()) {
// //       fetchBooks();
// //       return;
// //     }
// //     try {
// //       setLoading(true);
// //       const searchResults = await searchBooks(searchQuery);
// //       setBooks(searchResults);
// //     } catch (error) {
// //       setError('Failed to search books');
// //       console.error(error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (loading) return <div className="text-center py-8">Loading...</div>;
// //   if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

// //   const categories = ['All', ...new Set(books.map(book => book.category))];
// //   const filteredBooks = books.filter(book => 
// //     selectedCategory === 'All' || book.category === selectedCategory
// //   );

// //   function getCoverImageUrl(coverImageID: string): string | undefined {
// //     throw new Error('Function not implemented.');
// //   }

// //   return (
// //     <div className="min-h-screen bg-turquoise py-12 px-6">
// //       <div className="max-w-7xl mx-auto">
// //         <h1 className="text-4xl font-bold text-center text-gold mb-8">Books</h1>

// //         {/* Search Bar */}
// //         <div className="mb-8">
// //           <div className="max-w-xl mx-auto flex gap-4">
// //             <input
// //               type="text"
// //               placeholder="Search books..."
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
// //               className="flex-1 px-4 py-2 rounded-lg border-2 border-classic-blue focus:outline-none"
// //             />
// //             <button
// //               onClick={handleSearch}
// //               className="px-6 py-2 bg-classic-blue text-gold rounded-lg hover:bg-opacity-90"
// //             >
// //               Search
// //             </button>
// //           </div>
// //         </div>

// //         {/* Category Filter */}
// //         <div className="flex justify-center gap-4 mb-12 flex-wrap">
// //           {categories.map(category => (
// //             <button
// //               key={category}
// //               onClick={() => setSelectedCategory(category)}
// //               className={`px-6 py-2 rounded-lg transition-colors ${
// //                 selectedCategory === category
// //                   ? 'bg-classic-blue text-gold'
// //                   : 'bg-white text-classic-blue hover:bg-opacity-90'
// //               }`}
// //             >
// //               {category}
// //             </button>
// //           ))}
// //         </div>

// //         {/* Books Grid */}
// //         {filteredBooks.length === 0 ? (
// //           <p className="text-center text-gold">No books found</p>
// //         ) : (
// //           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
// //             {filteredBooks.map((book) => (
// //               <div
// //                 key={book.id}
// //                 className="bg-white rounded-lg shadow-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
// //                 onClick={() => setSelectedBook(book)}
// //               >
// //                 <div className="relative aspect-[3/4]">
// //                   <img
// //                     src={getCoverImageUrl(book.coverImageID)}
// //                     alt={book.title}
// //                     className="w-full h-full object-cover"
// //                     onError={(e) => {
// //                       e.currentTarget.src = '/fallback-cover.jpg';
// //                     }}
// //                   />
// //                 </div>
// //                 <div className="p-6">
// //                   <h2 className="text-2xl font-bold text-classic-blue mb-2">
// //                     {book.title}
// //                   </h2>
// //                   <p className="text-gold mb-4">{book.year}</p>
// //                   <p className="text-gray-600 mb-6 line-clamp-3">
// //                     {book.description}
// //                   </p>
// //                   <button className="w-full py-2 bg-classic-blue text-gold rounded-lg hover:bg-opacity-90">
// //                     View Details
// //                   </button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}

// //         {/* Book Details Modal */}
// //         {selectedBook && (
// //           <div
// //             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
// //             onClick={() => setSelectedBook(null)}
// //           >
// //             <div
// //               className="bg-white rounded-lg max-w-4xl w-full overflow-hidden"
// //               onClick={e => e.stopPropagation()}
// //             >
// //               <div className="md:flex">
// //                 <div className="md:w-1/3">
// //                   <img
// //                     src={getCoverImageUrl(selectedBook.coverImageID)}
// //                     alt={selectedBook.title}
// //                     className="w-full h-full object-cover"
// //                     onError={(e) => {
// //                       e.currentTarget.src = '/fallback-cover.jpg';
// //                     }}
// //                   />
// //                 </div>
// //                 <div className="p-8 md:w-2/3">
// //                   <div className="flex justify-between items-start">
// //                     <div>
// //                       <h2 className="text-3xl font-bold text-classic-blue mb-2">
// //                         {selectedBook.title}
// //                       </h2>
// //                       <p className="text-gold mb-4">{selectedBook.year}</p>
// //                     </div>
// //                     <button
// //                       onClick={() => setSelectedBook(null)}
// //                       className="text-gray-500 hover:text-classic-blue text-2xl"
// //                     >
// //                       ×
// //                     </button>
// //                   </div>
// //                   <p className="text-gray-600 mb-6">
// //                     {selectedBook.description}
// //                   </p>
// //                   <a
// //                     href={selectedBook.buyLink}
// //                     target="_blank"
// //                     rel="noopener noreferrer"
// //                     className="inline-block w-full text-center py-2 bg-classic-blue text-gold rounded-lg hover:bg-opacity-90"
// //                   >
// //                     Buy Now
// //                   </a>
// //                   {selectedBook.awards && selectedBook.awards.length > 0 && (
// //                     <div className="mt-6">
// //                       <h3 className="font-semibold text-gold mb-2">Awards</h3>
// //                       <ul className="list-disc list-inside text-gray-600">
// //                         {selectedBook.awards.map((award, index) => (
// //                           <li key={index}>{award}</li>
// //                         ))}
// //                       </ul>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Books;


// // import { useState, useEffect } from 'react';
// // import { databases } from '../appwrite/appwriteConfig';
// // import conf from '../config/conf';


// // interface Book {
// //   id: string;
// //   title: string;
// //   coverImageId: string;
// //   year: string;
// //   category: string;
// //   description: string;
// //   buyLink: string;
// //   awards?: string[];
// // }

// // function Books() {
// //   const [books, setBooks] = useState<Book[]>([]);
// //   const [selectedCategory, setSelectedCategory] = useState('All');
// //   const [selectedBook, setSelectedBook] = useState<Book | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [searchQuery, setSearchQuery] = useState('');

// //   useEffect(() => {
// //     fetchBooks();
// //   }, []);

// //   const fetchBooks = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await databases.listDocuments(
// //         conf.appwriteDatabaseId,
// //         conf.appwriteBookCollectionId
// //       );
// //       const booksData: Book[] = response.documents.map((doc: any) => ({
// //         id: doc.$id,
// //         title: doc.title,
// //         coverImageId: doc.coverImageId,
// //         year: doc.year,
// //         category: doc.category,
// //         description: doc.description,
// //         buyLink: doc.buyLink,
// //         awards: doc.awards,
// //       }));
// //       setBooks(booksData);
// //     } catch (error) {
// //       setError('Failed to fetch books');
// //       console.error(error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleSearch = () => {
// //     const filtered = books.filter(book =>
// //       book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       book.description.toLowerCase().includes(searchQuery.toLowerCase())
// //     );
// //     setBooks(filtered);
// //   };

// //   if (loading) return <div className="text-center py-8">Loading...</div>;
// //   if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

// //   const categories = ['All', ...new Set(books.map(book => book.category))];
// //   const filteredBooks = books.filter(book => 
// //     selectedCategory === 'All' || book.category === selectedCategory
// //   );

// //   const getCoverImageUrl = (fileId: string) => {
// //     return `${conf.appwriteEndpoint}/storage/buckets/${conf.appwriteBookCoverBucketId}/files/${fileId}/view?project=${conf.appwriteProjectId}`;
// //   };

// //   return (
// //     <div className="min-h-screen bg-turquoise py-12 px-6">
// //       <div className="max-w-7xl mx-auto">
// //         <h1 className="text-4xl font-bold text-center text-gold mb-8">Books</h1>

// //         {/* Search Bar */}
// //         <div className="mb-8">
// //           <div className="max-w-xl mx-auto flex gap-4">
// //             <input
// //               type="text"
// //               placeholder="Search books..."
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               className="flex-1 px-4 py-2 rounded-lg border-2 border-classic-blue focus:outline-none"
// //             />
// //             <button
// //               onClick={handleSearch}
// //               className="px-6 py-2 bg-classic-blue text-gold rounded-lg hover:bg-opacity-90"
// //             >
// //               Search
// //             </button>
// //           </div>
// //         </div>

// //         {/* Category Filter */}
// //         <div className="flex justify-center gap-4 mb-12 flex-wrap">
// //           {categories.map(category => (
// //             <button
// //               key={category}
// //               onClick={() => setSelectedCategory(category)}
// //               className={`px-6 py-2 rounded-lg transition-colors ${
// //                 selectedCategory === category
// //                   ? 'bg-classic-blue text-gold'
// //                   : 'bg-white text-classic-blue hover:bg-opacity-90'
// //               }`}
// //             >
// //               {category}
// //             </button>
// //           ))}
// //         </div>

// //         {/* Books Grid */}
// //         {filteredBooks.length === 0 ? (
// //           <p className="text-center text-gold">No books found</p>
// //         ) : (
// //           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
// //             {filteredBooks.map((book) => (
// //               <div
// //                 key={book.id}
// //                 className="bg-white rounded-lg shadow-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
// //                 onClick={() => setSelectedBook(book)}
// //               >
// //                 <div className="relative aspect-[3/4]">
// //                   <img
// //                     src={getCoverImageUrl(book.coverImageId)}
// //                     alt={book.title}
// //                     className="w-full h-full object-cover"
// //                     onError={(e) => {
// //                       e.currentTarget.src = '/fallback-cover.jpg';
// //                     }}
// //                   />
// //                 </div>
// //                 <div className="p-6">
// //                   <h2 className="text-2xl font-bold text-classic-blue mb-2">
// //                     {book.title}
// //                   </h2>
// //                   <p className="text-gold mb-4">{book.year}</p>
// //                   <p className="text-gray-600 mb-6 line-clamp-3">
// //                     {book.description}
// //                   </p>
// //                   <button className="w-full py-2 bg-classic-blue text-gold rounded-lg hover:bg-opacity-90">
// //                     View Details
// //                   </button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}

// //         {/* Book Details Modal */}
// //         {selectedBook && (
// //           <div
// //             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
// //             onClick={() => setSelectedBook(null)}
// //           >
// //             <div
// //               className="bg-white rounded-lg max-w-4xl w-full overflow-hidden"
// //               onClick={e => e.stopPropagation()}
// //             >
// //               <div className="md:flex">
// //                 <div className="md:w-1/3">
// //                   <img
// //                     src={getCoverImageUrl(selectedBook.coverImageId)}
// //                     alt={selectedBook.title}
// //                     className="w-full h-full object-cover"
// //                     onError={(e) => {
// //                       e.currentTarget.src = '/fallback-cover.jpg';
// //                     }}
// //                   />
// //                 </div>
// //                 <div className="p-8 md:w-2/3">
// //                   <div className="flex justify-between items-start">
// //                     <div>
// //                       <h2 className="text-3xl font-bold text-classic-blue mb-2">
// //                         {selectedBook.title}
// //                       </h2>
// //                       <p className="text-gold mb-4">{selectedBook.year}</p>
// //                     </div>
// //                     <button
// //                       onClick={() => setSelectedBook(null)}
// //                       className="text-gray-500 hover:text-classic-blue text-2xl"
// //                     >
// //                       ×
// //                     </button>
// //                   </div>
// //                   <p className="text-gray-600 mb-6">
// //                     {selectedBook.description}
// //                   </p>
// //                   <a
// //                     href={selectedBook.buyLink}
// //                     target="_blank"
// //                     rel="noopener noreferrer"
// //                     className="inline-block w-full text-center py-2 bg-classic-blue text-gold rounded-lg hover:bg-opacity-90"
// //                   >
// //                     Buy Now
// //                   </a>
// //                   {selectedBook.awards && selectedBook.awards.length > 0 && (
// //                     <div className="mt-6">
// //                       <h3 className="font-semibold text-gold mb-2">Awards</h3>
// //                       <ul className="list-disc list-inside text-gray-600">
// //                         {selectedBook.awards.map((award, index) => (
// //                           <li key={index}>{award}</li>
// //                         ))}
// //                       </ul>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Books;




// // import { useState, useEffect } from 'react';
// // import { databases } from '../appwrite/appwriteConfig';
// // import conf from '../config/conf';
// // import { Query } from 'appwrite';

// // interface Book {
// //   id: string;
// //   title: string;
// //   coverImageId: string;
// //   year: string;
// //   category: string;
// //   description: string;
// //   buyLink: string;
// //   awards?: string[];
// // }

// // function Books() {
// //   const [books, setBooks] = useState<Book[]>([]);
// //   const [selectedCategory, setSelectedCategory] = useState('All');
// //   const [selectedBook, setSelectedBook] = useState<Book | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [searchQuery, setSearchQuery] = useState('');

// //   useEffect(() => {
// //     fetchBooks();
// //   }, []);

// //   const fetchBooks = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await databases.listDocuments(
// //         conf.appwriteDatabaseId,
// //         conf.appwriteBookCollectionId
// //       );
// //       const booksData: Book[] = response.documents.map((doc: any) => ({
// //         id: doc.$id,
// //         title: doc.title,
// //         coverImageId: doc.coverImageId,
// //         year: doc.year,
// //         category: doc.category,
// //         description: doc.description,
// //         buyLink: doc.buyLink,
// //         awards: doc.awards,
// //       }));
// //       setBooks(booksData);
// //     } catch (error) {
// //       setError('Failed to fetch books');
// //       console.error(error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleSearch = () => {
// //     if (!searchQuery.trim()) {
// //       fetchBooks();
// //       return;
// //     }
// //     const filtered = books.filter(book =>
// //       book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       book.description.toLowerCase().includes(searchQuery.toLowerCase())
// //     );
// //     setBooks(filtered);
// //   };

// //   if (loading) return <div className="text-center py-8">Loading...</div>;
// //   if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

// //   const categories = ['All', ...new Set(books.map(book => book.category))];
// //   const filteredBooks = books.filter(book => 
// //     selectedCategory === 'All' || book.category === selectedCategory
// //   );

// //   const getCoverImageUrl = (fileId: string) => {
// //     return `${conf.appwriteEndpoint}/storage/buckets/${conf.appwriteBookCoverBucketId}/files/${fileId}/view?project=${conf.appwriteProjectId}`;
// //   };

// //   return (
// //     <div className="min-h-screen bg-turquoise py-12 px-6">
// //       <div className="max-w-7xl mx-auto">
// //         <h1 className="text-4xl font-bold text-center text-gold mb-8">Books</h1>

// //         {/* Search Bar */}
// //         <div className="mb-8">
// //           <div className="max-w-xl mx-auto flex gap-4">
// //             <input
// //               type="text"
// //               placeholder="Search books..."
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
// //               className="flex-1 px-4 py-2 rounded-lg border-2 border-classic-blue focus:outline-none"
// //             />
// //             <button
// //               onClick={handleSearch}
// //               className="px-6 py-2 bg-classic-blue text-gold rounded-lg hover:bg-opacity-90"
// //             >
// //               Search
// //             </button>
// //           </div>
// //         </div>

// //         {/* Category Filter */}
// //         <div className="flex justify-center gap-4 mb-12 flex-wrap">
// //           {categories.map(category => (
// //             <button
// //               key={category}
// //               onClick={() => setSelectedCategory(category)}
// //               className={`px-6 py-2 rounded-lg transition-colors ${
// //                 selectedCategory === category
// //                   ? 'bg-classic-blue text-gold'
// //                   : 'bg-white text-classic-blue hover:bg-opacity-90'
// //               }`}
// //             >
// //               {category}
// //             </button>
// //           ))}
// //         </div>

// //         {/* Books Grid */}
// //         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
// //           {filteredBooks.map((book) => (
// //             <div
// //               key={book.id}
// //               className="bg-white rounded-lg shadow-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
// //               onClick={() => setSelectedBook(book)}
// //             >
// //               <div className="relative aspect-[3/4]">
// //                 <img
// //                   src={getCoverImageUrl(book.coverImageId)}
// //                   alt={book.title}
// //                   className="w-full h-full object-cover"
// //                   onError={(e) => {
// //                     e.currentTarget.src = '/fallback-cover.jpg';
// //                   }}
// //                 />
// //               </div>
// //               <div className="p-6">
// //                 <h2 className="text-2xl font-bold text-classic-blue mb-2">
// //                   {book.title}
// //                 </h2>
// //                 <p className="text-gold mb-4">{book.year}</p>
// //                 <p className="text-gray-600 mb-6 line-clamp-3">
// //                   {book.description}
// //                 </p>
// //                 <button className="w-full py-2 bg-classic-blue text-gold rounded-lg hover:bg-opacity-90">
// //                   View Details
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Book Details Modal */}
// //         {selectedBook && (
// //           <div
// //             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
// //             onClick={() => setSelectedBook(null)}
// //           >
// //             <div
// //               className="bg-white rounded-lg max-w-4xl w-full overflow-hidden"
// //               onClick={e => e.stopPropagation()}
// //             >
// //               <div className="md:flex">
// //                 <div className="md:w-1/3">
// //                   <img
// //                     src={getCoverImageUrl(selectedBook.coverImageId)}
// //                     alt={selectedBook.title}
// //                     className="w-full h-full object-cover"
// //                     onError={(e) => {
// //                       e.currentTarget.src = '/fallback-cover.jpg';
// //                     }}
// //                   />
// //                 </div>
// //                 <div className="p-8 md:w-2/3">
// //                   <div className="flex justify-between items-start">
// //                     <div>
// //                       <h2 className="text-3xl font-bold text-classic-blue mb-2">
// //                         {selectedBook.title}
// //                       </h2>
// //                       <p className="text-gold mb-4">{selectedBook.year}</p>
// //                     </div>
// //                     <button
// //                       onClick={() => setSelectedBook(null)}
// //                       className="text-gray-500 hover:text-classic-blue text-2xl"
// //                     >
// //                       ×
// //                     </button>
// //                   </div>
// //                   <p className="text-gray-600 mb-6">
// //                     {selectedBook.description}
// //                   </p>
// //                   <a
// //                     href={selectedBook.buyLink}
// //                     target="_blank"
// //                     rel="noopener noreferrer"
// //                     className="inline-block w-full text-center py-2 bg-classic-blue text-gold rounded-lg hover:bg-opacity-90"
// //                   >
// //                     Buy Now
// //                   </a>
// //                   {selectedBook.awards && selectedBook.awards.length > 0 && (
// //                     <div className="mt-6">
// //                       <h3 className="font-semibold text-gold mb-2">Awards</h3>
// //                       <ul className="list-disc list-inside text-gray-600">
// //                         {selectedBook.awards.map((award, index) => (
// //                           <li key={index}>{award}</li>
// //                         ))}
// //                       </ul>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Books;








// // import { useState, useEffect } from 'react';

// // import conf from '../config/conf';

// // import { getBooks, getBooksByCategory, searchBooks } from '../appwrite/db';
// // import { Book } from '../types/types';


// // // Removed the local Book interface as it is now imported from '../appwrite/db'


// // function Books() {
// //   const [books, setBooks] = useState<Book[]>([]);
// //   const [selectedCategory, setSelectedCategory] = useState('All');
// //   const [selectedBook, setSelectedBook] = useState<Book | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [searchQuery, setSearchQuery] = useState('');

// //   useEffect(() => {
// //     fetchBooks();
// //   }, []);

// //   const fetchBooks = async () => {
// //     try {
// //       setLoading(true);
// //       const fetchedBooks = await getBooks();
// //       setBooks(fetchedBooks);
// //     } catch (error) {
// //       setError('Failed to fetch books');
// //       console.error(error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleCategoryChange = async (category: string) => {
// //     try {
// //       setLoading(true);
// //       setSelectedCategory(category);
// //       const filteredBooks = category === 'All' 
// //         ? await getBooks()
// //         : await getBooksByCategory(category);
// //       setBooks(filteredBooks);
// //     } catch (error) {
// //       setError('Failed to filter books');
// //       console.error(error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleSearch = async () => {
// //     if (!searchQuery.trim()) {
// //       fetchBooks();
// //       return;
// //     }
// //     try {
// //       setLoading(true);
// //       const searchResults = await searchBooks(searchQuery);
// //       setBooks(searchResults);
// //     } catch (error) {
// //       setError('Failed to search books');
// //       console.error(error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (loading) return <div className="text-center py-8">Loading...</div>;
// //   if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

// //   const categories = ['All', ...new Set(books.map(book => book.category))];
// //   const filteredBooks = books.filter(book => 
// //     selectedCategory === 'All' || book.category === selectedCategory
// //   );

// //   function getCoverImageUrl(coverImageID: string): string | undefined {
// //     throw new Error('Function not implemented.');
// //   }

// //   return (
// //     <div className="min-h-screen bg-turquoise py-12 px-6">
// //       <div className="max-w-7xl mx-auto">
// //         <h1 className="text-4xl font-bold text-center text-gold mb-8">Books</h1>

// //         {/* Search Bar */}
// //         <div className="mb-8">
// //           <div className="max-w-xl mx-auto flex gap-4">
// //             <input
// //               type="text"
// //               placeholder="Search books..."
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
// //               className="flex-1 px-4 py-2 rounded-lg border-2 border-classic-blue focus:outline-none"
// //             />
// //             <button
// //               onClick={handleSearch}
// //               className="px-6 py-2 bg-classic-blue text-gold rounded-lg hover:bg-opacity-90"
// //             >
// //               Search
// //             </button>
// //           </div>
// //         </div>

// //         {/* Category Filter */}
// //         <div className="flex justify-center gap-4 mb-12 flex-wrap">
// //           {categories.map(category => (
// //             <button
// //               key={category}
// //               onClick={() => setSelectedCategory(category)}
// //               className={`px-6 py-2 rounded-lg transition-colors ${
// //                 selectedCategory === category
// //                   ? 'bg-classic-blue text-gold'
// //                   : 'bg-white text-classic-blue hover:bg-opacity-90'
// //               }`}
// //             >
// //               {category}
// //             </button>
// //           ))}
// //         </div>

// //         {/* Books Grid */}
// //         {filteredBooks.length === 0 ? (
// //           <p className="text-center text-gold">No books found</p>
// //         ) : (
// //           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
// //             {filteredBooks.map((book) => (
// //               <div
// //                 key={book.id}
// //                 className="bg-white rounded-lg shadow-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
// //                 onClick={() => setSelectedBook(book)}
// //               >
// //                 <div className="relative aspect-[3/4]">
// //                   <img
// //                     src={getCoverImageUrl(book.coverImageID)}
// //                     alt={book.title}
// //                     className="w-full h-full object-cover"
// //                     onError={(e) => {
// //                       e.currentTarget.src = '/fallback-cover.jpg';
// //                     }}
// //                   />
// //                 </div>
// //                 <div className="p-6">
// //                   <h2 className="text-2xl font-bold text-classic-blue mb-2">
// //                     {book.title}
// //                   </h2>
// //                   <p className="text-gold mb-4">{book.year}</p>
// //                   <p className="text-gray-600 mb-6 line-clamp-3">
// //                     {book.description}
// //                   </p>
// //                   <button className="w-full py-2 bg-classic-blue text-gold rounded-lg hover:bg-opacity-90">
// //                     View Details
// //                   </button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}

// //         {/* Book Details Modal */}
// //         {selectedBook && (
// //           <div
// //             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
// //             onClick={() => setSelectedBook(null)}
// //           >
// //             <div
// //               className="bg-white rounded-lg max-w-4xl w-full overflow-hidden"
// //               onClick={e => e.stopPropagation()}
// //             >
// //               <div className="md:flex">
// //                 <div className="md:w-1/3">
// //                   <img
// //                     src={getCoverImageUrl(selectedBook.coverImageID)}
// //                     alt={selectedBook.title}
// //                     className="w-full h-full object-cover"
// //                     onError={(e) => {
// //                       e.currentTarget.src = '/fallback-cover.jpg';
// //                     }}
// //                   />
// //                 </div>
// //                 <div className="p-8 md:w-2/3">
// //                   <div className="flex justify-between items-start">
// //                     <div>
// //                       <h2 className="text-3xl font-bold text-classic-blue mb-2">
// //                         {selectedBook.title}
// //                       </h2>
// //                       <p className="text-gold mb-4">{selectedBook.year}</p>
// //                     </div>
// //                     <button
// //                       onClick={() => setSelectedBook(null)}
// //                       className="text-gray-500 hover:text-classic-blue text-2xl"
// //                     >
// //                       ×
// //                     </button>
// //                   </div>
// //                   <p className="text-gray-600 mb-6">
// //                     {selectedBook.description}
// //                   </p>
// //                   <a
// //                     href={selectedBook.buyLink}
// //                     target="_blank"
// //                     rel="noopener noreferrer"
// //                     className="inline-block w-full text-center py-2 bg-classic-blue text-gold rounded-lg hover:bg-opacity-90"
// //                   >
// //                     Buy Now
// //                   </a>
// //                   {selectedBook.awards && selectedBook.awards.length > 0 && (
// //                     <div className="mt-6">
// //                       <h3 className="font-semibold text-gold mb-2">Awards</h3>
// //                       <ul className="list-disc list-inside text-gray-600">
// //                         {selectedBook.awards.map((award, index) => (
// //                           <li key={index}>{award}</li>
// //                         ))}
// //                       </ul>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Books;


// // import { useState, useEffect } from 'react';
// // import { databases } from '../appwrite/appwriteConfig';
// // import conf from '../config/conf';


// // interface Book {
// //   id: string;
// //   title: string;
// //   coverImageId: string;
// //   year: string;
// //   category: string;
// //   description: string;
// //   buyLink: string;
// //   awards?: string[];
// // }

// // function Books() {
// //   const [books, setBooks] = useState<Book[]>([]);
// //   const [selectedCategory, setSelectedCategory] = useState('All');
// //   const [selectedBook, setSelectedBook] = useState<Book | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [searchQuery, setSearchQuery] = useState('');

// //   useEffect(() => {
// //     fetchBooks();
// //   }, []);

// //   const fetchBooks = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await databases.listDocuments(
// //         conf.appwriteDatabaseId,
// //         conf.appwriteBookCollectionId
// //       );
// //       const booksData: Book[] = response.documents.map((doc: any) => ({
// //         id: doc.$id,
// //         title: doc.title,
// //         coverImageId: doc.coverImageId,
// //         year: doc.year,
// //         category: doc.category,
// //         description: doc.description,
// //         buyLink: doc.buyLink,
// //         awards: doc.awards,
// //       }));
// //       setBooks(booksData);
// //     } catch (error) {
// //       setError('Failed to fetch books');
// //       console.error(error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleSearch = () => {
// //     const filtered = books.filter(book =>
// //       book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       book.description.toLowerCase().includes(searchQuery.toLowerCase())
// //     );
// //     setBooks(filtered);
// //   };

// //   if (loading) return <div className="text-center py-8">Loading...</div>;
// //   if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

// //   const categories = ['All', ...new Set(books.map(book => book.category))];
// //   const filteredBooks = books.filter(book => 
// //     selectedCategory === 'All' || book.category === selectedCategory
// //   );

// //   const getCoverImageUrl = (fileId: string) => {
// //     return `${conf.appwriteEndpoint}/storage/buckets/${conf.appwriteBookCoverBucketId}/files/${fileId}/view?project=${conf.appwriteProjectId}`;
// //   };

// //   return (
// //     <div className="min-h-screen bg-turquoise py-12 px-6">
// //       <div className="max-w-7xl mx-auto">
// //         <h1 className="text-4xl font-bold text-center text-gold mb-8">Books</h1>

// //         {/* Search Bar */}
// //         <div className="mb-8">
// //           <div className="max-w-xl mx-auto flex gap-4">
// //             <input
// //               type="text"
// //               placeholder="Search books..."
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               className="flex-1 px-4 py-2 rounded-lg border-2 border-classic-blue focus:outline-none"
// //             />
// //             <button
// //               onClick={handleSearch}
// //               className="px-6 py-2 bg-classic-blue text-gold rounded-lg hover:bg-opacity-90"
// //             >
// //               Search
// //             </button>
// //           </div>
// //         </div>

// //         {/* Category Filter */}
// //         <div className="flex justify-center gap-4 mb-12 flex-wrap">
// //           {categories.map(category => (
// //             <button
// //               key={category}
// //               onClick={() => setSelectedCategory(category)}
// //               className={`px-6 py-2 rounded-lg transition-colors ${
// //                 selectedCategory === category
// //                   ? 'bg-classic-blue text-gold'
// //                   : 'bg-white text-classic-blue hover:bg-opacity-90'
// //               }`}
// //             >
// //               {category}
// //             </button>
// //           ))}
// //         </div>

// //         {/* Books Grid */}
// //         {filteredBooks.length === 0 ? (
// //           <p className="text-center text-gold">No books found</p>
// //         ) : (
// //           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
// //             {filteredBooks.map((book) => (
// //               <div
// //                 key={book.id}
// //                 className="bg-white rounded-lg shadow-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
// //                 onClick={() => setSelectedBook(book)}
// //               >
// //                 <div className="relative aspect-[3/4]">
// //                   <img
// //                     src={getCoverImageUrl(book.coverImageId)}
// //                     alt={book.title}
// //                     className="w-full h-full object-cover"
// //                     onError={(e) => {
// //                       e.currentTarget.src = '/fallback-cover.jpg';
// //                     }}
// //                   />
// //                 </div>
// //                 <div className="p-6">
// //                   <h2 className="text-2xl font-bold text-classic-blue mb-2">
// //                     {book.title}
// //                   </h2>
// //                   <p className="text-gold mb-4">{book.year}</p>
// //                   <p className="text-gray-600 mb-6 line-clamp-3">
// //                     {book.description}
// //                   </p>
// //                   <button className="w-full py-2 bg-classic-blue text-gold rounded-lg hover:bg-opacity-90">
// //                     View Details
// //                   </button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}

// //         {/* Book Details Modal */}
// //         {selectedBook && (
// //           <div
// //             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
// //             onClick={() => setSelectedBook(null)}
// //           >
// //             <div
// //               className="bg-white rounded-lg max-w-4xl w-full overflow-hidden"
// //               onClick={e => e.stopPropagation()}
// //             >
// //               <div className="md:flex">
// //                 <div className="md:w-1/3">
// //                   <img
// //                     src={getCoverImageUrl(selectedBook.coverImageId)}
// //                     alt={selectedBook.title}
// //                     className="w-full h-full object-cover"
// //                     onError={(e) => {
// //                       e.currentTarget.src = '/fallback-cover.jpg';
// //                     }}
// //                   />
// //                 </div>
// //                 <div className="p-8 md:w-2/3">
// //                   <div className="flex justify-between items-start">
// //                     <div>
// //                       <h2 className="text-3xl font-bold text-classic-blue mb-2">
// //                         {selectedBook.title}
// //                       </h2>
// //                       <p className="text-gold mb-4">{selectedBook.year}</p>
// //                     </div>
// //                     <button
// //                       onClick={() => setSelectedBook(null)}
// //                       className="text-gray-500 hover:text-classic-blue text-2xl"
// //                     >
// //                       ×
// //                     </button>
// //                   </div>
// //                   <p className="text-gray-600 mb-6">
// //                     {selectedBook.description}
// //                   </p>
// //                   <a
// //                     href={selectedBook.buyLink}
// //                     target="_blank"
// //                     rel="noopener noreferrer"
// //                     className="inline-block w-full text-center py-2 bg-classic-blue text-gold rounded-lg hover:bg-opacity-90"
// //                   >
// //                     Buy Now
// //                   </a>
// //                   {selectedBook.awards && selectedBook.awards.length > 0 && (
// //                     <div className="mt-6">
// //                       <h3 className="font-semibold text-gold mb-2">Awards</h3>
// //                       <ul className="list-disc list-inside text-gray-600">
// //                         {selectedBook.awards.map((award, index) => (
// //                           <li key={index}>{award}</li>
// //                         ))}
// //                       </ul>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Books;




// // import { useState, useEffect } from 'react';
// // import { databases } from '../appwrite/appwriteConfig';
// // import conf from '../config/conf';
// // import { Query } from 'appwrite';

// // interface Book {
// //   id: string;
// //   title: string;
// //   coverImageId: string;
// //   year: string;
// //   category: string;
// //   description: string;
// //   buyLink: string;
// //   awards?: string[];
// // }

// // function Books() {
// //   const [books, setBooks] = useState<Book[]>([]);
// //   const [selectedCategory, setSelectedCategory] = useState('All');
// //   const [selectedBook, setSelectedBook] = useState<Book | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [searchQuery, setSearchQuery] = useState('');

// //   useEffect(() => {
// //     fetchBooks();
// //   }, []);

// //   const fetchBooks = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await databases.listDocuments(
// //         conf.appwriteDatabaseId,
// //         conf.appwriteBookCollectionId
// //       );
// //       const booksData: Book[] = response.documents.map((doc: any) => ({
// //         id: doc.$id,
// //         title: doc.title,
// //         coverImageId: doc.coverImageId,
// //         year: doc.year,
// //         category: doc.category,
// //         description: doc.description,
// //         buyLink: doc.buyLink,
// //         awards: doc.awards,
// //       }));
// //       setBooks(booksData);
// //     } catch (error) {
// //       setError('Failed to fetch books');
// //       console.error(error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleSearch = () => {
// //     if (!searchQuery.trim()) {
// //       fetchBooks();
// //       return;
// //     }
// //     const filtered = books.filter(book =>
// //       book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       book.description.toLowerCase().includes(searchQuery.toLowerCase())
// //     );
// //     setBooks(filtered);
// //   };

// //   if (loading) return <div className="text-center py-8">Loading...</div>;
// //   if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

// //   const categories = ['All', ...new Set(books.map(book => book.category))];
// //   const filteredBooks = books.filter(book => 
// //     selectedCategory === 'All' || book.category === selectedCategory
// //   );

// //   const getCoverImageUrl = (fileId: string) => {
// //     return `${conf.appwriteEndpoint}/storage/buckets/${conf.appwriteBookCoverBucketId}/files/${fileId}/view?project=${conf.appwriteProjectId}`;
// //   };

// //   return (
// //     <div className="min-h-screen bg-turquoise py-12 px-6">
// //       <div className="max-w-7xl mx-auto">
// //         <h1 className="text-4xl font-bold text-center text-gold mb-8">Books</h1>

// //         {/* Search Bar */}
// //         <div className="mb-8">
// //           <div className="max-w-xl mx-auto flex gap-4">
// //             <input
// //               type="text"
// //               placeholder="Search books..."
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
// //               className="flex-1 px-4 py-2 rounded-lg border-2 border-classic-blue focus:outline-none"
// //             />
// //             <button
// //               onClick={handleSearch}
// //               className="px-6 py-2 bg-classic-blue text-gold rounded-lg hover:bg-opacity-90"
// //             >
// //               Search
// //             </button>
// //           </div>
// //         </div>

// //         {/* Category Filter */}
// //         <div className="flex justify-center gap-4 mb-12 flex-wrap">
// //           {categories.map(category => (
// //             <button
// //               key={category}
// //               onClick={() => setSelectedCategory(category)}
// //               className={`px-6 py-2 rounded-lg transition-colors ${
// //                 selectedCategory === category
// //                   ? 'bg-classic-blue text-gold'
// //                   : 'bg-white text-classic-blue hover:bg-opacity-90'
// //               }`}
// //             >
// //               {category}
// //             </button>
// //           ))}
// //         </div>

// //         {/* Books Grid */}
// //         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
// //           {filteredBooks.map((book) => (
// //             <div
// //               key={book.id}
// //               className="bg-white rounded-lg shadow-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
// //               onClick={() => setSelectedBook(book)}
// //             >
// //               <div className="relative aspect-[3/4]">
// //                 <img
// //                   src={getCoverImageUrl(book.coverImageId)}
// //                   alt={book.title}
// //                   className="w-full h-full object-cover"
// //                   onError={(e) => {
// //                     e.currentTarget.src = '/fallback-cover.jpg';
// //                   }}
// //                 />
// //               </div>
// //               <div className="p-6">
// //                 <h2 className="text-2xl font-bold text-classic-blue mb-2">
// //                   {book.title}
// //                 </h2>
// //                 <p className="text-gold mb-4">{book.year}</p>
// //                 <p className="text-gray-600 mb-6 line-clamp-3">
// //                   {book.description}
// //                 </p>
// //                 <button className="w-full py-2 bg-classic-blue text-gold rounded-lg hover:bg-opacity-90">
// //                   View Details
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Book Details Modal */}
// //         {selectedBook && (
// //           <div
// //             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
// //             onClick={() => setSelectedBook(null)}
// //           >
// //             <div
// //               className="bg-white rounded-lg max-w-4xl w-full overflow-hidden"
// //               onClick={e => e.stopPropagation()}
// //             >
// //               <div className="md:flex">
// //                 <div className="md:w-1/3">
// //                   <img
// //                     src={getCoverImageUrl(selectedBook.coverImageId)}
// //                     alt={selectedBook.title}
// //                     className="w-full h-full object-cover"
// //                     onError={(e) => {
// //                       e.currentTarget.src = '/fallback-cover.jpg';
// //                     }}
// //                   />
// //                 </div>
// //                 <div className="p-8 md:w-2/3">
// //                   <div className="flex justify-between items-start">
// //                     <div>
// //                       <h2 className="text-3xl font-bold text-classic-blue mb-2">
// //                         {selectedBook.title}
// //                       </h2>
// //                       <p className="text-gold mb-4">{selectedBook.year}</p>
// //                     </div>
// //                     <button
// //                       onClick={() => setSelectedBook(null)}
// //                       className="text-gray-500 hover:text-classic-blue text-2xl"
// //                     >
// //                       ×
// //                     </button>
// //                   </div>
// //                   <p className="text-gray-600 mb-6">
// //                     {selectedBook.description}
// //                   </p>
// //                   <a
// //                     href={selectedBook.buyLink}
// //                     target="_blank"
// //                     rel="noopener noreferrer"
// //                     className="inline-block w-full text-center py-2 bg-classic-blue text-gold rounded-lg hover:bg-opacity-90"
// //                   >
// //                     Buy Now
// //                   </a>
// //                   {selectedBook.awards && selectedBook.awards.length > 0 && (
// //                     <div className="mt-6">
// //                       <h3 className="font-semibold text-gold mb-2">Awards</h3>
// //                       <ul className="list-disc list-inside text-gray-600">
// //                         {selectedBook.awards.map((award, index) => (
// //                           <li key={index}>{award}</li>
// //                         ))}
// //                       </ul>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Books;








// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { databases } from '../appwrite/appwriteConfig';
// import { useAuth } from '../appwrite/auth';
// import conf from '../config/conf';
// import { Query, ID } from 'appwrite';

// interface Book {
//   id: string;
//   title: string;
//   author: string;
//   description: string;
//   coverUrl: string;
//   date: string;
//   buyLink: string;
//   awards?: string[];
// }

// function Books() {
//   const [books, setBooks] = useState<Book[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { isAdmin } = useAuth();

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const fetchBooks = async () => {
//     try {
//       setLoading(true);
//       const response = await databases.listDocuments(
//         conf.appwriteDatabaseId,
//         conf.appwriteBookCollectionId,
//         [Query.orderDesc('date')]
//       );
//       setBooks(response.documents.map((doc: any) => ({
//         id: doc.$id,
//         title: doc.title,
//         author: doc.author,
//         description: doc.description,
//         coverUrl: doc.coverUrl,
//         date: doc.date,
//         buyLink: doc.buyLink,
//         awards: doc.awards || [],
//       })));
//     } catch (error) {
//       console.error('Error fetching books:', error);
//       setError('Failed to load books');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!window.confirm('Are you sure you want to delete this book?')) return;
//     try {
//       await databases.deleteDocument(
//         conf.appwriteDatabaseId,
//         conf.appwriteBookCollectionId,
//         id
//       );
//       setBooks(books.filter(book => book.id !== id));
//     } catch (error) {
//       console.error('Error deleting book:', error);
//       setError('Failed to delete the book');
//     }
//   };

//   if (loading) return <div className="text-center py-8">Loading...</div>;
//   if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

//   return (
//     <div className="min-h-screen bg-turquoise py-10 px-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-12">
//           <h1 className="text-4xl font-bold text-gold">Books</h1>
          
//           {isAdmin() && (
//             <Link 
//               to="/books/new"
//               className="px-6 py-2 bg-classic-blue text-gold rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2"
//             >
//               <svg 
//                 xmlns="http://www.w3.org/2000/svg" 
//                 className="h-5 w-5" 
//                 viewBox="0 0 20 20" 
//                 fill="currentColor"
//               >
//                 <path 
//                   fillRule="evenodd" 
//                   d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" 
//                   clipRule="evenodd" 
//                 />
//               </svg>
//               Add New Book
//             </Link>
//           )}
//         </div>

//         {/* Books Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {books.map((book) => (
//             <div key={book.id} className="group">
//               <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 group-hover:scale-[1.02]">
//                 <div className="relative">
//                   <img
//                     src={book.coverUrl}
//                     alt={book.title}
//                     className="w-full h-48 object-cover"
//                   />
//                 </div>
//                 <div className="p-6">
//                   <h2 className="text-xl font-bold text-classic-blue mb-3 group-hover:text-gold transition-colors">
//                     {book.title}
//                   </h2>
//                   <p className="text-gray-600 mb-4">{book.author}</p>
//                   <p className="text-gray-600 mb-4 line-clamp-2">{book.description}</p>
//                   {book.awards && book.awards.length > 0 && (
//                     <div className="mb-4">
//                       <h3 className="text-sm font-bold text-classic-blue">Awards:</h3>
//                       <ul className="list-disc list-inside text-gray-600">
//                         {book.awards.map((award, index) => (
//                           <li key={index}>{award}</li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
//                   <div className="flex justify-between items-center text-sm text-gray-500">
//                     <span>{new Date(book.date).toLocaleDateString()}</span>
//                     <a 
//                       href={book.buyLink} 
//                       target="_blank" 
//                       rel="noopener noreferrer"
//                       className="text-classic-blue hover:text-gold"
//                     >
//                       Buy
//                     </a>
//                   </div>

//                   {isAdmin() && (
//                     <div className="mt-4 pt-4 border-t flex justify-end gap-4">
//                       <Link
//                         to={`/books/edit/${book.id}`}
//                         className="text-classic-blue hover:text-gold"
//                       >
//                         Edit
//                       </Link>
//                       <button
//                         onClick={() => handleDelete(book.id)}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Books;













import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { databases } from '../appwrite/appwriteConfig';
import { useAuth } from '../appwrite/auth';
import conf from '../config/conf';
import { Query } from 'appwrite';

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  createdAt: string; // Ensure this attribute exists in your schema
  buyLink: string;
  awards?: string[];
}

function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteBookCollectionId,
        [Query.orderDesc('$createdAt')] // Use $createdAt for ordering
      );
      setBooks(response.documents.map((doc: any) => ({
        id: doc.$id,
        title: doc.title,
        author: doc.author,
        description: doc.description,
        coverUrl: doc.coverUrl,
        createdAt: doc.$createdAt, // Ensure this attribute exists in your schema
        buyLink: doc.buyLink,
        awards: doc.awards || [],
      })));
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      await databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteBookCollectionId,
        id
      );
      setBooks(books.filter(book => book.id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
      setError('Failed to delete the book');
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-turquoise py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-gold">Books</h1>
          
          {isAdmin() && (
            <Link 
              to="/books/new"
              className="px-6 py-2 bg-classic-blue text-gold rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" 
                  clipRule="evenodd" 
                />
              </svg>
              Add New Book
            </Link>
          )}
        </div>

        {/* Books Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <div key={book.id} className="group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 group-hover:scale-[1.02]">
                <div className="relative">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-classic-blue mb-3 group-hover:text-gold transition-colors">
                    {book.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{book.author}</p>
                  <p className="text-gray-600 mb-4 line-clamp-2">{book.description}</p>
                  {book.awards && book.awards.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-sm font-bold text-classic-blue">Awards:</h3>
                      <ul className="list-disc list-inside text-gray-600">
                        {book.awards.map((award, index) => (
                          <li key={index}>{award}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{new Date(book.createdAt).toLocaleDateString()}</span>
                    <a 
                      href={book.buyLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-classic-blue hover:text-gold"
                    >
                      Buy
                    </a>
                  </div>

                  {isAdmin() && (
                    <div className="mt-4 pt-4 border-t flex justify-end gap-4">
                      <Link
                        to={`/books/edit/${book.id}`}
                        className="text-classic-blue hover:text-gold"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Books;