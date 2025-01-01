// // import { useState } from 'react';

// // interface AuthorImage {
// //   id: number;
// //   url: string;
// //   title: string;
// //   category: string;
// //   date: string;
// //   description: string;
// // }

// // function Pictures() {
// //   const [selectedImage, setSelectedImage] = useState<AuthorImage | null>(null);
// //   const [activeCategory, setActiveCategory] = useState('All');

// //   const authorImages: AuthorImage[] = [
// //     {
// //       id: 1,
// //       url: "/author-portrait1.jpg",
// //       title: "Author Portrait",
// //       category: "Portraits",
// //       date: "March 2024",
// //       description: "Official portrait for Erasmus Prize 2024"
// //     },
// //     {
// //       id: 2,
// //       url: "/author-event1.jpg",
// //       title: "Literary Festival",
// //       category: "Events",
// //       date: "February 2024",
// //       description: "Speaking at International Literature Festival"
// //     },
// //     {
// //       id: 3,
// //       url: "/author-travel1.jpg",
// //       title: "Research Journey",
// //       category: "Travel",
// //       date: "January 2024",
// //       description: "Field research in the Sundarbans"
// //     }
// //   ];

// //   const categories = ['All', ...new Set(authorImages.map(img => img.category))];
  
// //   const filteredImages = authorImages.filter(img => 
// //     activeCategory === 'All' || img.category === activeCategory
// //   );

// //   return (
// //     <div className="min-h-screen bg-turquoise py-10 px-6">
// //       <div className="max-w-7xl mx-auto">
// //         <h1 className="text-4xl font-bold text-gold text-center mb-4">Photo Gallery</h1>
        
// //         {/* Category Filter */}
// //         <div className="flex justify-center gap-4 mb-12">
// //           {categories.map(category => (
// //             <button
// //               key={category}
// //               onClick={() => setActiveCategory(category)}
// //               className={`px-4 py-2 rounded-lg transition-colors ${
// //                 activeCategory === category
// //                   ? 'bg-classic-blue text-gold'
// //                   : 'bg-white text-classic-blue hover:bg-opacity-90'
// //               }`}
// //             >
// //               {category}
// //             </button>
// //           ))}
// //         </div>

// //         {/* Image Grid */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //           {filteredImages.map((image) => (
// //             <div
// //               key={image.id}
// //               onClick={() => setSelectedImage(image)}
// //               className="cursor-pointer group"
// //             >
// //               <div className="relative rounded-lg overflow-hidden shadow-lg">
// //                 <img
// //                   src={image.url}
// //                   alt={image.title}
// //                   className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
// //                 />
// //                 <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
// //                 <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
// //                   <h3 className="text-xl font-semibold">{image.title}</h3>
// //                   <p className="text-sm opacity-90">{image.date}</p>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Modal */}
// //       {selectedImage && (
// //         <div 
// //           className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
// //           onClick={() => setSelectedImage(null)}
// //         >
// //           <div 
// //             className="max-w-4xl w-full bg-white rounded-lg overflow-hidden"
// //             onClick={e => e.stopPropagation()}
// //           >
// //             <img
// //               src={selectedImage.url}
// //               alt={selectedImage.title}
// //               className="w-full h-auto max-h-[70vh] object-contain"
// //             />
// //             <div className="p-6">
// //               <h3 className="text-2xl font-bold text-classic-blue mb-2">
// //                 {selectedImage.title}
// //               </h3>
// //               <p className="text-gray-600 mb-2">{selectedImage.date}</p>
// //               <p className="text-gray-700">{selectedImage.description}</p>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default Pictures;





// // import { useState, useEffect } from 'react';
// // import { databases, storagess } from '../appwrite/appwriteConfig';
// // import conf from '../config/conf';

// // interface AuthorImage {
// //   id: string;
// //   fileId: string;
// //   url: string;
// //   title: string;
// //   category: string;
// //   date: string;
// //   description: string;
// // }

// // function Pictures() {
// //   const [images, setImages] = useState<AuthorImage[]>([]);
// //   const [filteredImages, setFilteredImages] = useState<AuthorImage[]>([]);
// //   const [selectedImage, setSelectedImage] = useState<AuthorImage | null>(null);
// //   const [activeCategory, setActiveCategory] = useState('All');
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     fetchImages();
// //   }, []);

// //   useEffect(() => {
// //     filterImages();
// //   }, [images, activeCategory]);

// //   const fetchImages = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await databases.listDocuments(
// //         conf.appwriteDatabaseId,
// //         conf.appwriteImageCollection,
        
// //       );

// //       const fetchedImages: AuthorImage[] = response.documents.map((doc: any) => ({
// //         id: doc.$id,
// //         fileId: doc.fileId,
// //         url: storages.getFileView(conf.appwriteAuthorImageBucketId, doc.fileId),
// //         title: doc.title,
// //         category: doc.category,
// //         date: doc.date,
// //         description: doc.description,
// //       }));

// //       setImages(fetchedImages);
// //     } catch (error: any) {
// //       console.error('Error fetching images:', error);
// //       setError(error.message || 'Failed to load images.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const filterImages = () => {
// //     const filtered = images.filter(
// //       (img) => activeCategory === 'All' || img.category === activeCategory
// //     );
// //     setFilteredImages(filtered);
// //   };

// //   const categories = ['All', ...new Set(images.map((img) => img.category))];

// //   if (loading) {
// //     return <div className="text-center py-8">Loading...</div>;
// //   }

// //   if (error) {
// //     return <div className="text-center py-8 text-red-500">{error}</div>;
// //   }

// //   return (
// //     <div className="min-h-screen bg-turquoise py-10 px-6">
// //       <div className="max-w-7xl mx-auto">
// //         <h1 className="text-4xl font-bold text-center text-gold mb-8">Gallery</h1>

// //         {/* Category Filter */}
// //         <div className="flex justify-center gap-4 mb-8 flex-wrap">
// //           {categories.map((category) => (
// //             <button
// //               key={category}
// //               onClick={() => setActiveCategory(category)}
// //               className={`px-4 py-2 rounded-lg transition-colors ${
// //                 activeCategory === category
// //                   ? 'bg-classic-blue text-gold'
// //                   : 'bg-white text-classic-blue hover:bg-opacity-90'
// //               }`}
// //             >
// //               {category}
// //             </button>
// //           ))}
// //         </div>

// //         {/* Image Grid */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {filteredImages.map((image) => (
// //             <div
// //               key={image.id}
// //               onClick={() => setSelectedImage(image)}
// //               className="cursor-pointer group"
// //             >
// //               <div className="relative overflow-hidden rounded-lg shadow-lg aspect-square">
// //                 <img
// //                   src={image.url}
// //                   alt={image.title}
// //                   className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
// //                   loading="lazy"
// //                   onError={(e) => {
// //                     e.currentTarget.src = '/fallback-image.jpg'; // Ensure you have a fallback image
// //                   }}
// //                 />
// //                 <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300">
// //                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
// //                     <span className="text-white text-lg font-semibold">
// //                       {image.title}
// //                     </span>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Image Modal */}
// //         {selectedImage && (
// //           <div
// //             className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
// //             onClick={() => setSelectedImage(null)}
// //           >
// //             <div
// //               className="max-w-4xl w-full bg-white rounded-lg overflow-hidden"
// //               onClick={(e) => e.stopPropagation()}
// //             >
// //               <img
// //                 src={selectedImage.url}
// //                 alt={selectedImage.title}
// //                 className="w-full h-auto max-h-[70vh] object-contain"
// //                 onError={(e) => {
// //                   e.currentTarget.src = '/fallback-image.jpg';
// //                 }}
// //               />
// //               <div className="p-6">
// //                 <h3 className="text-2xl font-bold text-classic-blue mb-2">
// //                   {selectedImage.title}
// //                 </h3>
// //                 <p className="text-gray-500 mb-2">
// //                   {new Date(selectedImage.date).toLocaleDateString()}
// //                 </p>
// //                 <p className="text-gray-600">{selectedImage.description}</p>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Pictures;
















// // import { useState, useEffect } from 'react';
// // import { databases, storages } from '../appwrite/appwriteConfig';
// // import conf from '../config/conf';
// // import { Query } from 'appwrite';

// // interface AuthorImage {
// //   id: string;
// //   fileId: string;
// //   title: string;
// //   category: string;
// //   date: string;
// //   description: string;
// // }

// // function Pictures() {
// //   const [images, setImages] = useState<AuthorImage[]>([]);
// //   const [filteredImages, setFilteredImages] = useState<AuthorImage[]>([]);
// //   const [selectedImage, setSelectedImage] = useState<AuthorImage | null>(null);
// //   const [activeCategory, setActiveCategory] = useState('All');
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     fetchImages();
// //   }, []);

// //   useEffect(() => {
// //     filterImages();
// //   }, [images, activeCategory]);

// //   const fetchImages = async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);

// //       const response = await databases.listDocuments(
// //         conf.appwriteDatabaseId,
// //         conf.appwriteImageCollection,
// //         [Query.orderDesc('$createdAt')]
// //       );

// //       const fetchedImages = response.documents.map((doc: any) => ({
// //         id: doc.$id,
// //         fileId: doc.fileId,
// //         url: storages.getFileView(conf.appwriteAuthorImageBucketId, doc.fileId),
// //         title: doc.title,
// //         category: doc.category,
// //         date: doc.date,
// //         description: doc.description
// //       }));

// //       setImages(fetchedImages);
// //     } catch (error) {
// //       console.error('Error fetching images:', error);
// //       setError('Failed to load images. Please try again later.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const filterImages = () => {
// //     const filtered = activeCategory === 'All'
// //       ? images
// //       : images.filter(image => image.category === activeCategory);
// //     setFilteredImages(filtered);
// //   };

// //   if (loading) return <div className="text-center py-8">Loading...</div>;
// //   if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

// //   const categories = ['All', ...new Set(images.map(image => image.category))];

// //   return (
// //     <div className="min-h-screen bg-turquoise py-10 px-6">
// //       <div className="max-w-7xl mx-auto">
// //         <h1 className="text-4xl font-bold text-center text-gold mb-8">Gallery</h1>

// //         {/* Category Filter */}
// //         <div className="flex justify-center gap-4 mb-8 flex-wrap">
// //           {categories.map(category => (
// //             <button
// //               key={category}
// //               onClick={() => setActiveCategory(category)}
// //               className={`px-4 py-2 rounded-lg transition-colors ${
// //                 activeCategory === category
// //                   ? 'bg-classic-blue text-gold'
// //                   : 'bg-white text-classic-blue hover:bg-opacity-90'
// //               }`}
// //             >
// //               {category}
// //             </button>
// //           ))}
// //         </div>

// //         {/* Image Grid */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {filteredImages.map((image) => (
// //             <div
// //               key={image.id}
// //               onClick={() => setSelectedImage(image)}
// //               className="cursor-pointer group"
// //             >
// //               <div className="relative overflow-hidden rounded-lg shadow-lg aspect-square">
// //                 <img
// //                   src={image.url}
// //                   alt={image.title}
// //                   className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
// //                   loading="lazy"
// //                   onError={(e) => {
// //                     console.error(`Failed to load image: ${image.title}`);
// //                     e.currentTarget.src = '/fallback-image.jpg';
// //                   }}
// //                 />
// //                 <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300">
// //                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
// //                     <span className="text-white text-lg font-semibold">
// //                       {image.title}
// //                     </span>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Image Modal */}
// //         {selectedImage && (
// //           <div
// //             className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
// //             onClick={() => setSelectedImage(null)}
// //           >
// //             <div
// //               className="max-w-4xl w-full bg-white rounded-lg overflow-hidden"
// //               onClick={e => e.stopPropagation()}
// //             >
// //               <img
// //                 src={selectedImage.url}
// //                 alt={selectedImage.title}
// //                 className="w-full h-auto max-h-[70vh] object-contain"
// //               />
// //               <div className="p-6">
// //                 <h3 className="text-2xl font-bold text-classic-blue mb-2">
// //                   {selectedImage.title}
// //                 </h3>
// //                 <p className="text-gray-500 mb-2">
// //                   {new Date(selectedImage.date).toLocaleDateString()}
// //                 </p>
// //                 <p className="text-gray-600">{selectedImage.description}</p>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Pictures;



























// import { useState, useEffect } from 'react';
// import { databases, storages } from '../appwrite/appwriteConfig';
// import conf from '../config/conf';
// import { Query } from 'appwrite';

// interface AuthorImage {
//   id: string;
//   fileId: string;
//   title: string;
//   category: string;
//   date: string;
//   description: string;
// }

// function Pictures() {
//   const [images, setImages] = useState<AuthorImage[]>([]);
//   const [filteredImages, setFilteredImages] = useState<AuthorImage[]>([]);
//   const [selectedImage, setSelectedImage] = useState<AuthorImage | null>(null);
//   const [activeCategory, setActiveCategory] = useState('All');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchImages();
//   }, []);

//   useEffect(() => {
//     filterImages();
//   }, [images, activeCategory]);

//   const fetchImages = async () => {
//     try {
//       setLoading(true);
//       const response = await databases.listDocuments(
//         conf.appwriteDatabaseId,
//         conf.appwriteImageCollection,
//         [Query.orderDesc('$createdAt')]
//       );

//       const fetchedImages = await Promise.all(response.documents.map(async (doc: any) => {
//         if (!doc.fileId) return null;

//         try {
//           const imageUrl = storages.getFileView(
//             conf.appwriteAuthorImageBucketId,
//             doc.fileId
//           ).href;

//           return {
//             id: doc.$id,
//             fileId: doc.fileId,
//             title: doc.title,
//             category: doc.category,
//             date: doc.date,
//             description: doc.description,
//             url: imageUrl
//           };
//         } catch (error) {
//           console.error(`Error getting image URL for fileId ${doc.fileId}:`, error);
//           return null;
//         }
//       }));

//       setImages(fetchedImages.filter((img): img is AuthorImage => img !== null));
//     } catch (error) {
//       console.error('Error fetching images:', error);
//       setError('Failed to load images');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterImages = () => {
//     const filtered = activeCategory === 'All'
//       ? images
//       : images.filter(image => image.category === activeCategory);
//     setFilteredImages(filtered);
//   };

//   if (loading) return <div className="text-center py-8">Loading...</div>;
//   if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

//   const categories = ['All', ...new Set(images.map(image => image.category))];

//   return (
//     <div className="min-h-screen bg-turquoise py-10 px-6">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold text-center text-gold mb-8">Gallery</h1>

//         {/* Category Filter */}
//         <div className="flex justify-center gap-4 mb-8 flex-wrap">
//           {categories.map(category => (
//             <button
//               key={category}
//               onClick={() => setActiveCategory(category)}
//               className={`px-4 py-2 rounded-lg transition-colors ${
//                 activeCategory === category
//                   ? 'bg-classic-blue text-gold'
//                   : 'bg-white text-classic-blue hover:bg-opacity-90'
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>

//         {/* Image Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredImages.map((image) => (
//             <div
//               key={image.id}
//               onClick={() => setSelectedImage(image)}
//               className="cursor-pointer group"
//             >
//               <div className="relative overflow-hidden rounded-lg shadow-lg aspect-square">
//                 <img
//                   src={image.url}
//                   alt={image.title}
//                   className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//                   loading="lazy"
//                   onError={(e) => {
//                     console.error(`Failed to load image: ${image.title}`);
//                     e.currentTarget.src = '/fallback-image.jpg';
//                   }}
//                 />
//                 <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300">
//                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <span className="text-white text-lg font-semibold">
//                       {image.title}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Image Modal */}
//         {selectedImage && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
//             onClick={() => setSelectedImage(null)}
//           >
//             <div
//               className="max-w-4xl w-full bg-white rounded-lg overflow-hidden"
//               onClick={e => e.stopPropagation()}
//             >
//               <img
//                 src={selectedImage.url}
//                 alt={selectedImage.title}
//                 className="w-full h-auto max-h-[70vh] object-contain"
//               />
//               <div className="p-6">
//                 <h3 className="text-2xl font-bold text-classic-blue mb-2">
//                   {selectedImage.title}
//                 </h3>
//                 <p className="text-gray-500 mb-2">
//                   {new Date(selectedImage.date).toLocaleDateString()}
//                 </p>
//                 <p className="text-gray-600">{selectedImage.description}</p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Pictures;




import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { databases, storages } from '../appwrite/appwriteConfig';
import { useAuth } from '../appwrite/auth';
import conf from '../config/conf';
import { Query } from 'appwrite';

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
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    filterImages();
  }, [images, activeCategory]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteImageCollection,
        [Query.orderDesc('$createdAt')]
      );

      const fetchedImages = await Promise.all(response.documents.map(async (doc: any) => {
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
            date: doc.date
          };
        } catch (error) {
          console.error(`Error getting image URL for fileId ${doc.fileId}:`, error);
          return null;
        }
      }));

      setImages(fetchedImages.filter((img): img is Image => img !== null));
    } catch (error) {
      console.error('Error fetching images:', error);
      setError('Failed to load images');
    } finally {
      setLoading(false);
    }
  };

  const filterImages = () => {
    const filtered = activeCategory === 'All'
      ? images
      : images.filter(image => image.category === activeCategory);
    setFilteredImages(filtered);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  const categories = ['All', ...new Set(images.map(image => image.category))];

  return (
    <div className="min-h-screen bg-turquoise py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gold">Gallery</h1>
          
          {isAdmin() && (
            <Link 
              to="/pictures/upload"
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
              Upload Picture
            </Link>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeCategory === category
                  ? 'bg-classic-blue text-gold'
                  : 'bg-white text-classic-blue hover:bg-opacity-90'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="cursor-pointer group"
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg aspect-square">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    console.error(`Failed to load image: ${image.title}`);
                    e.currentTarget.src = '/fallback-image.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-lg font-semibold">
                      {image.title}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pictures;