import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { databases } from "../appwrite/appwriteConfig";
import { useAuth } from "../appwrite/auth";
import conf from "../config/conf";
import { Query } from "appwrite";

import { Helmet } from "react-helmet-async";

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  createdAt: string;
  buyLink: string;
  awards?: string[];
}

const LoadingSkeleton = () => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="animate-pulse bg-white/10 rounded-xl overflow-hidden"
      >
        <div className="bg-gray-700/20 aspect-[2/3] w-full"></div>
        <div className="p-6 space-y-4">
          <div className="h-4 bg-gray-700/20 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700/20 rounded w-1/2"></div>
        </div>
      </div>
    ))}
  </div>
);

function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<string | null>(null);
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    filterBooks();
  }, [books, searchQuery, selectedCategory]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteBookCollectionId,
        [Query.orderDesc("$createdAt")]
      );
      setBooks(
        response.documents.map((doc: any) => ({
          id: doc.$id,
          title: doc.title,
          author: doc.author,
          description: doc.description,
          coverUrl: doc.coverUrl,
          createdAt: doc.$createdAt,
          buyLink: doc.buyLink,
          awards: doc.awards || [],
        }))
      );
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  const filterBooks = () => {
    let filtered = [...books];

    if (searchQuery) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((book) => book.author === selectedCategory);
    }

    setFilteredBooks(filtered);
  };

  const handleDelete = async (id: string) => {
    try {
      await databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteBookCollectionId,
        id
      );
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
      setError("Failed to delete the book");
    }
  };

  const categories = ["All", ...new Set(books.map((book) => book.author))];
  const displayedBooks =
    searchQuery || selectedCategory !== "All" ? filteredBooks : books;

  return (
    <>
      <Helmet>
        <title>Books - Rohit Upadhyay</title>
        <meta
          name="description"
          content="Explore books written by Rohit Upadhyay. Discover compelling stories and literary works from an emerging author."
        />
        <meta
          name="keywords"
          content="books rohit upadhyay, author books, novels, stories, published works"
        />
        <meta property="og:title" content="Books - Rohit Upadhyay" />
        <meta
          property="og:description"
          content="Explore books written by Rohit Upadhyay. Discover compelling stories and literary works from an emerging author."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.rohitupadhyay.me/books" />
        <link rel="canonical" href="https://www.rohitupadhyay.me/books" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-4xl font-bold text-gold">Books</h1>

            {isAdmin() && (
              <Link
                to="/books/new"
                className="px-6 py-3 bg-classic-blue text-gold rounded-lg 
                       hover:bg-opacity-90 transition-all duration-300 
                       flex items-center gap-2 shadow-lg hover:shadow-xl"
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

          {/* Search & Filters */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Search books..."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg
                     text-white placeholder-gray-400 focus:ring-2 focus:ring-gold/50
                     transition-all duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-gold text-black"
                      : "bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Books Grid */}
          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : displayedBooks.length === 0 ? (
            <div className="text-center py-8 text-gray-400">No books found</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedBooks.map((book) => (
                <div key={book.id} className="group">
                  <div
                    className="bg-white/5 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden
                              transform transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="absolute inset-0 w-full h-full object-cover object-center
                               transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent 
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>

                    <div className="p-6 space-y-4">
                      <h2
                        className="text-xl font-bold text-white group-hover:text-gold 
                                 transition-colors duration-200"
                      >
                        {book.title}
                      </h2>
                      <p className="text-gray-400">{book.author}</p>
                      <p className="text-gray-400 line-clamp-2">
                        {book.description}
                      </p>

                      {book.awards && book.awards.length > 0 && (
                        <div>
                          <h3 className="text-sm font-bold text-gold mb-2">
                            Awards:
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {book.awards.map((award, index) => (
                              <span
                                key={index}
                                className="text-xs px-2 py-1 bg-gold/10 text-gold rounded-full"
                              >
                                {award}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-center pt-4 border-t border-white/10">
                        <span className="text-sm text-gray-400">
                          {new Date(book.createdAt).toLocaleDateString()}
                        </span>
                        <div className="flex items-center gap-4">
                          <a
                            href={book.buyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gold hover:text-white transition-colors duration-200"
                          >
                            Buy Now
                          </a>

                          {isAdmin() && (
                            <button
                              onClick={() => {
                                setBookToDelete(book.id);
                                setShowDeleteModal(true);
                              }}
                              className="text-red-500 hover:text-red-400 transition-colors duration-200"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl p-6 max-w-sm w-full">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Confirm Delete
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this book? This action cannot
                  be undone.
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (bookToDelete) {
                        handleDelete(bookToDelete);
                        setShowDeleteModal(false);
                      }
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Books;
