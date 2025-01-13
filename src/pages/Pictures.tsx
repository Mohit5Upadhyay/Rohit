

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { databases, storages } from "../appwrite/appwriteConfig";
import { useAuth } from "../appwrite/auth";
import conf from "../config/conf";
import { Query } from "appwrite";

import { Helmet } from "react-helmet-async";

interface Image {
  id: string;
  fileId: string;
  url: string;
  title: string;
  category: string;
  date: string;
}

function Pictures() {
  const [images, setImages] = useState<Image[]>([]);
  const [filteredImages, setFilteredImages] = useState<Image[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    filterImages();
  }, [images, activeCategory]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };

    if (selectedImage) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteImageCollection,
        [Query.orderDesc("$createdAt")]
      );

      const fetchedImages = await Promise.all(
        response.documents.map(async (doc: any) => {
          if (!doc.fileId) return null;

          try {
            const imageUrl = storages.getFileView(
              conf.appwriteAuthorImageBucketId,
              doc.fileId
            );

            return {
              id: doc.$id,
              fileId: doc.fileId,
              url: imageUrl,
              title: doc.title,
              category: doc.category,
              date: doc.date,
            };
          } catch (error) {
            console.error(
              `Error getting image URL for fileId ${doc.fileId}:`,
              error
            );
            return null;
          }
        })
      );

      setImages(fetchedImages.filter((img): img is Image => img !== null));
    } catch (error) {
      console.error("Error fetching images:", error);
      setError("Failed to load images");
    } finally {
      setLoading(false);
    }
  };

  const filterImages = () => {
    const filtered =
      activeCategory === "All"
        ? images
        : images.filter((image) => image.category === activeCategory);
    setFilteredImages(filtered);
  };

  const deleteImage = async (imageId: string, fileId: string) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      setDeletingId(imageId);

      await databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteImageCollection,
        imageId
      );

      await storages.deleteFile(conf.appwriteAuthorImageBucketId, fileId);

      setImages((prevImages) => prevImages.filter((img) => img.id !== imageId));
      setError(null);
    } catch (error) {
      console.error("Error deleting image:", error);
      setError("Failed to delete image");
    } finally {
      setDeletingId(null);
    }
  };
  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
    setIsImageLoading(true);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;

  const categories = ["All", ...new Set(images.map((image) => image.category))];

  return (
    <>
      <Helmet>
        <title>Gallery - Rohit Upadhyay</title>
        <meta
          name="description"
          content="Explore the photo gallery of Rohit Upadhyay. View memorable moments, events, and professional photographs."
        />
        <meta
          name="keywords"
          content="gallery, photos, rohit upadhyay, memories, pictures, moments"
        />
        <meta property="og:title" content="Gallery - Rohit Upadhyay" />
        <meta
          property="og:description"
          content="Explore the photo gallery of Rohit Upadhyay. View memorable moments, events, and professional photographs."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.rohitupadhyay.me/pictures"
        />
        <link rel="canonical" href="https://www.rohitupadhyay.me/pictures" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-[#111] to-black py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h1 className="text-5xl font-bold text-gold mb-2">Gallery</h1>
              <p className="text-gray-400">
                Explore our collection of memories
              </p>
            </div>

            {isAdmin() && (
              <Link
                to="/pictures/upload"
                className="group px-6 py-3 bg-classic-blue text-gold rounded-lg 
                       hover:bg-opacity-90 transition-all duration-300 
                       flex items-center gap-3 shadow-lg hover:shadow-xl
                       transform hover:-translate-y-0.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 transition-transform duration-300 group-hover:rotate-180"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a 1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a 1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">Upload Picture</span>
              </Link>
            )}
          </div>

          <div className="flex justify-center gap-3 mb-12">
            <div className="bg-gray-900/50 p-2 rounded-xl flex flex-wrap gap-2 backdrop-blur-sm">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-lg transition-all duration-300 font-medium
                  ${
                    activeCategory === category
                      ? "bg-classic-blue text-gold shadow-lg scale-105"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-gold"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="group relative cursor-pointer"
                onClick={() => handleImageClick(image)}
              >
                <div
                  className="relative overflow-hidden rounded-xl shadow-lg aspect-square 
                            backdrop-blur-sm bg-gray-900/20 transition-transform 
                            duration-500 hover:scale-[1.02]"
                >
                  {isAdmin() && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteImage(image.id, image.fileId);
                      }}
                      disabled={deletingId === image.id}
                      className="absolute top-2 right-2 z-10 p-2 bg-red-500 rounded-full 
                             opacity-0 group-hover:opacity-100 transition-opacity
                             hover:bg-red-600 disabled:bg-gray-500"
                    >
                      {deletingId === image.id ? (
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                  )}
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform 
                           duration-700 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      console.error(`Failed to load image: ${image.title}`);
                      e.currentTarget.src = "/fallback-image.jpg";
                    }}
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <div
                      className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-6 
                                group-hover:translate-y-0 transition-transform duration-300"
                    >
                      <p className="text-gray-300 text-sm">
                        {new Date(image.date).toLocaleDateString()}
                      </p>
                      <span
                        className="inline-block mt-3 px-3 py-1 bg-classic-blue/80 
                                   text-gold text-sm rounded-full"
                      >
                        {image.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Image Modal */}
          {selectedImage && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn"
              onClick={() => setSelectedImage(null)}
            >
              <div
                className="relative max-w-7xl w-full mx-4 animate-modalIn"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-12 right-0 p-3 text-white/80 hover:text-white
                         transition-all duration-300 rounded-full hover:bg-white/10
                         transform hover:scale-110"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <div className="relative rounded-2xl overflow-hidden bg-gray-900 shadow-2xl">
                  {isImageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin" />
                    </div>
                  )}

                  <img
                    src={selectedImage.url}
                    alt={selectedImage.title}
                    className={`w-full h-full object-contain max-h-[85vh] transition-opacity duration-300
                           ${isImageLoading ? "opacity-0" : "opacity-100"}`}
                    onLoad={() => setIsImageLoading(false)}
                    onLoadStart={() => setIsImageLoading(true)}
                  />

                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent">
                    <div className="p-6 space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-classic-blue/80 text-gold text-sm">
                          {selectedImage.category}
                        </span>
                        <time className="text-white/70 text-sm">
                          {new Date(selectedImage.date).toLocaleDateString()}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Pictures;
