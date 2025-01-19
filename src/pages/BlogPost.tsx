

// import { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { FaWhatsapp, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
// import { databases } from '../appwrite/appwriteConfig';
// import { useAuth } from '../appwrite/auth';
// import conf from '../config/conf';

// interface BlogPost {
//   id: string;
//   title: string;
//   excerpt: string;
//   content: string;
//   date: string;
//   category: string[];
//   imageUrl: string;
// }

// const categoryColors: { [key: string]: string } = {
//   Technology: 'bg-blue-500 text-white',
//   Lifestyle: 'bg-green-500 text-white',
//   Travel: 'bg-purple-500 text-white',
//   Education: 'bg-yellow-500 text-black',
//   // Add more categories and colors as needed
// };

// function BlogPost() {
//   const { id } = useParams();
//   const [post, setPost] = useState<BlogPost | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { user,isAdmin } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchPost();
//   }, [id]);

//   const fetchPost = async () => {
//     try {
//       const response = await databases.getDocument(
//         conf.appwriteDatabaseId,
//         conf.appwriteBlogCollectionId,
//         id!
//       );
//       setPost({
//         id: response.$id,
//         title: response.title,
//         excerpt: response.excerpt,
//         content: response.content,
//         date: response.date,
//         category: response.category,
//         imageUrl: response.imageUrl,
//       });
//     } catch {
//       setError('Failed to load blog post');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm('Are you sure you want to delete this post?')) return;
//     try {
//       await databases.deleteDocument(
//         conf.appwriteDatabaseId,
//         conf.appwriteBlogCollectionId,
//         id!
//       );
//       navigate('/blog');
//     } catch {
//       setError('Failed to delete the blog post');
//     }
//   };

//   const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

//   if (loading) return <div className="text-center py-8">Loading...</div>;
//   if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
//   if (!post) return <div className="text-center py-8">Post not found</div>;

//   return (
//     <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black py-12 px-6 overflow-hidden">
//       {/* Watermark */}
//       <div className="pointer-events-none absolute inset-0 flex justify-center items-center">
//         <span className="text-center text-gray-700 text-6xl md:text-9xl font-bold tracking-widest opacity-5 rotate-[-30deg]">
//           Rohit Upadhyay
//         </span>
//       </div>

//       <div className="relative max-w-4xl mx-auto">
//         <Link 
//           to="/blog"
//           className="inline-flex items-center text-gold hover:text-white transition-colors duration-200 mb-8"
//         >
//           <svg 
//             className="w-5 h-5 mr-2" 
//             fill="none"
//             stroke="currentColor" 
//             viewBox="0 0 24 24"
//           >
//             <path 
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2} 
//               d="M15 19l-7-7 7-7" 
//             />
//           </svg>
//           Back to Blog
//         </Link>

//         <article className="bg-white/10 backdrop-blur-md rounded-lg shadow-xl overflow-hidden">
//           <img
//             src={post.imageUrl}
//             alt={post.title}
//             className="w-full h-[400px] object-cover"
//           />

//           <div className="p-6 md:p-8 leading-relaxed">
//             <div className="flex flex-wrap gap-2 mb-6">
//               {post.category.map(cat => (
//                 <span 
//                   key={cat}
//                   className={`text-sm font-semibold px-3 py-1 rounded-full ${categoryColors[cat] || 'bg-gray-500 text-white'}`}
//                 >
//                   {cat}
//                 </span>
//               ))}
//             </div>

//             <h1 className="text-3xl md:text-4xl font-bold text-gold mb-3">
//               {post.title}
//             </h1>

//             <div className="flex items-center text-gray-400 text-sm mb-6">
//               <span>{new Date(post.date).toLocaleDateString()}</span>
//             </div>

//             {/* Social share buttons */}
//             <div className="flex gap-4 mb-8">
//               <a
//                 className="flex items-center gap-1 text-green-500 hover:text-green-600 transition-colors duration-200"
//                 href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
//                   post.title + " " + currentUrl
//                 )}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FaWhatsapp /> WhatsApp
//               </a>
//               <a
//                 className="flex items-center gap-1 text-blue-400 hover:text-blue-500 transition-colors duration-200"
//                 href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
//                   currentUrl
//                 )}&text=${encodeURIComponent(post.title)}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FaTwitter /> Twitter
//               </a>
//               <a
//                 className="flex items-center gap-1 text-blue-700 hover:text-blue-800 transition-colors duration-200"
//                 href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
//                   currentUrl
//                 )}&title=${encodeURIComponent(post.title)}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <FaLinkedinIn /> LinkedIn
//               </a>
//             </div>

//             {/* Main content */}
//             <hr className="my-6 border-gray-700" />

//             <div 
//               className="prose prose-invert max-w-none text-gray-300"
//               dangerouslySetInnerHTML={{ __html: post.content }}
//             />

//             {/* Admin actions */}
//             {isAdmin() && (
//               <div className="mt-8 flex justify-end gap-4">
//                 <Link
//                   to={`/blog/edit/${post.id}`}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
//                 >
//                   Edit
//                 </Link>
//                 <button
//                   onClick={handleDelete}
//                   className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
//                 >
//                   Delete
//                 </button>
//               </div>
//             )}
//           </div>
//         </article>
//       </div>
//     </div>
//   );
// }

// export default BlogPost;



















import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaWhatsapp, FaTwitter, FaLinkedinIn, FaHeart } from 'react-icons/fa';
import { databases } from '../appwrite/appwriteConfig';
import { useAuth } from '../appwrite/auth';
import conf from '../config/conf';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string[];
  imageUrl: string;
  likes: number;
  likedBy: string[];
}

const categoryColors: { [key: string]: string } = {
  Technology: 'bg-blue-500 text-white',
  Lifestyle: 'bg-green-500 text-white',
  Travel: 'bg-purple-500 text-white',
  Education: 'bg-yellow-500 text-black',
};

function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
  }, [id]);

  useEffect(() => {
    if (post && user) {
      setIsLiked(post.likedBy?.includes(user.$id) || false);
      setLikeCount(post.likes || 0);
    }
  }, [post, user]);

  const fetchPost = async () => {
    try {
      const response = await databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteBlogCollectionId,
        id!
      );
      setPost({
        id: response.$id,
        title: response.title,
        excerpt: response.excerpt,
        content: response.content,
        date: response.date,
        category: response.category,
        imageUrl: response.imageUrl,
        likes: response.likes || 0,
        likedBy: response.likedBy || [],
      });
    } catch {
      setError('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  // const handleLike = async () => {
  //   if (!user) {
  //     alert('Please login to like posts');
  //     return;
  //   }

  //   if (!post || isLikeLoading) return;

  //   try {
  //     setIsLikeLoading(true);
  //     const updatedLikedBy = isLiked
  //       ? post.likedBy.filter(id => id !== user.$id)
  //       : [...post.likedBy, user.$id];

  //     const updatedLikes = updatedLikedBy.length;

  //     await databases.updateDocument(
  //       conf.appwriteDatabaseId,
  //       conf.appwriteBlogCollectionId,
  //       post.id,
  //       {
  //         likes: updatedLikes,
  //         likedBy: updatedLikedBy
  //       }
  //     );

  //     setIsLiked(!isLiked);
  //     setLikeCount(updatedLikes);
  //   } catch (error) {
  //     console.error('Error toggling like:', error);
  //   } finally {
  //     setIsLikeLoading(false);
  //   }
  // };



  const handleLike = async () => {
    if (!user) {
      alert('Please login to like posts');
      return;
    }
  
    if (isLiked) {
      alert('You have already liked this post');
      return;
    }
  
    try {
      setIsLikeLoading(true);
      if (!post) return;
      const updatedLikedBy = [...post.likedBy, user.$id];
      
      await databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteBlogCollectionId,
        post.id,
        {
          likes: post.likes + 1,
          likedBy: updatedLikedBy
        }
      );
  
      setLikeCount(prev => prev + 1);
      setIsLiked(true);
    } catch (error) {
      console.error('Error updating likes:', error);
    } finally {
      setIsLikeLoading(false);
    }
  };




  
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteBlogCollectionId,
        id!
      );
      navigate('/blog');
    } catch {
      setError('Failed to delete the blog post');
    }
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!post) return <div className="text-center py-8">Post not found</div>;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black py-12 px-6 overflow-hidden">
      {/* Watermark */}
      <div className="pointer-events-none absolute inset-0 flex justify-center items-center">
        <span className="text-center text-gray-700 text-6xl md:text-9xl font-bold tracking-widest opacity-5 rotate-[-30deg]">
          Rohit Upadhyay
        </span>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <Link 
          to="/blog"
          className="inline-flex items-center text-gold hover:text-white transition-colors duration-200 mb-8"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none"
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
          Back to Blog
        </Link>

        <article className="bg-white/10 backdrop-blur-md rounded-lg shadow-xl overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            loading="eager"
            fetchPriority="high"
            className="w-full h-[400px] object-cover"
          />

          <div className="p-6 md:p-8 leading-relaxed">
            <div className="flex flex-wrap gap-2 mb-6">
              {post.category.map(cat => (
                <span 
                  key={cat}
                  className={`text-sm font-semibold px-3 py-1 rounded-full ${categoryColors[cat] || 'bg-gray-500 text-white'}`}
                >
                  {cat}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gold">
                {post.title}
              </h1>
              <button
                onClick={handleLike}
                disabled={isLikeLoading || isLiked}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-100 ${
                  isLiked 
                    ? 'bg-red-500 text-white cursor-not-allowed opacity-75' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <FaHeart className={`${isLiked ? 'animate-bounce' : ''}`} />
                <span>{likeCount}</span>
              </button>
            </div>

            <div className="flex items-center text-gray-400 text-sm mb-6">
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>

            {/* Social share buttons */}
            <div className="flex gap-4 mb-8">
              <a
                className="flex items-center gap-1 text-green-500 hover:text-green-600 transition-colors duration-200"
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  post.title + " " + currentUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp /> WhatsApp
              </a>
              <a
                className="flex items-center gap-1 text-blue-400 hover:text-blue-500 transition-colors duration-200"
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  currentUrl
                )}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter /> Twitter
              </a>
              <a
                className="flex items-center gap-1 text-blue-700 hover:text-blue-800 transition-colors duration-200"
                href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
                  currentUrl
                )}&title=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn /> LinkedIn
              </a>
            </div>

            <hr className="my-6 border-gray-700" />

            <div 
              className="prose prose-invert max-w-none text-gray-300"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {isAdmin() && (
              <div className="mt-8 flex justify-end gap-4">
                <Link
                  to={`/blog/edit/${post.id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}

export default BlogPost;