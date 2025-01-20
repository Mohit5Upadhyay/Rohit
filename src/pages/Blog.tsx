// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { databases } from "../appwrite/appwriteConfig";
// import { useAuth } from "../appwrite/auth";
// import conf from "../config/conf";
// import { Query } from "appwrite";

// import { Helmet } from "react-helmet-async";

// interface BlogPost {
//   id: string;
//   title: string;
//   excerpt: string;
//   content: string;
//   date: string;
//   category: string[];
//   imageUrl: string;
// }

// function Blog() {
//   const [posts, setPosts] = useState<BlogPost[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { isAdmin } = useAuth();

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const calculateReadingTime = (content: string): string => {
//     const wordsPerMinute = 200;
//     const words = content.trim().split(/\s+/).length;
//     const minutes = Math.ceil(words / wordsPerMinute);
//     return `${minutes} min read`;
//   };

//   const fetchPosts = async () => {
//     try {
//       setLoading(true);
//       const response = await databases.listDocuments(
//         conf.appwriteDatabaseId,
//         conf.appwriteBlogCollectionId,
//         [Query.orderDesc("date")]
//       );
//       setPosts(
//         response.documents.map((doc: any) => ({
//           id: doc.$id,
//           title: doc.title,
//           excerpt: doc.excerpt,
//           content: doc.content,
//           date: doc.date,
//           category: doc.category,
//           imageUrl: doc.imageUrl,
//         }))
//       );
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//       setError("Failed to load blog posts");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!window.confirm("Are you sure you want to delete this post?")) return;
//     try {
//       await databases.deleteDocument(
//         conf.appwriteDatabaseId,
//         conf.appwriteBlogCollectionId,
//         id
//       );
//       setPosts(posts.filter((post) => post.id !== id));
//     } catch (error) {
//       console.error("Error deleting post:", error);
//       setError("Failed to delete the blog post");
//     }
//   };

//   if (loading) return <div className="text-center py-8">Loading...</div>;
//   if (error)
//     return <div className="text-center py-8 text-red-500">{error}</div>;

//   const featuredPost = posts[0];
//   const remainingPosts = posts.slice(1);

//   return (
//     <>
//       <Helmet>
//         <title>Blog - Rohit Upadhyay</title>
//         <meta
//           name="description"
//           content="Read Rohit Upadhyay's blog posts about writing, storytelling, and his journey as an author."
//         />
//         <meta
//           name="keywords"
//           content="blog, rohit upadhyay, author blog, writing, storytelling"
//         />
//         <meta property="og:title" content="Blog - Rohit Upadhyay" />
//         <meta
//           property="og:description"
//           content="Read Rohit Upadhyay's blog posts about writing, storytelling, and his journey as an author."
//         />
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content="https://www.rohitupadhyay.me/blog" />
//         <link rel="canonical" href="https://www.rohitupadhyay.me/blog" />
//       </Helmet>

//       <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-12 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex justify-between items-center mb-12">
//             <h1 className="text-5xl font-bold text-gold">Blog</h1>

//             {isAdmin() && (
//               <Link
//                 to="/blog/new"
//                 className="px-6 py-3 bg-gold text-gray-900 rounded-lg hover:bg-opacity-90 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 Create New Blog
//               </Link>
//             )}
//           </div>

//           {/* Featured Post */}
//           {featuredPost && (
//             <div className="mb-16">
//               <Link to={`/blog/${featuredPost.id}`}>
//                 <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-xl overflow-hidden md:flex">
//                   <div className="md:w-2/3">
//                     <img
//                       src={featuredPost.imageUrl}
//                       alt={featuredPost.title}
//                       className="w-full h-[400px] object-cover"
//                     />
//                   </div>
//                   <div className="p-8 md:w-1/3 flex flex-col justify-between">
//                     <div>
//                       <div className="flex gap-2 mb-4">
//                         {featuredPost.category.map((cat) => (
//                           <span
//                             key={cat}
//                             className="text-sm text-gold bg-classic-blue bg-opacity-10 px-3 py-1 rounded-full"
//                           >
//                             {cat}
//                           </span>
//                         ))}
//                       </div>
//                       <h2 className="text-3xl font-bold text-gold mb-4">
//                         {featuredPost.title}
//                       </h2>
//                       <p className="text-gray-400 mb-4">
//                         {featuredPost.excerpt}
//                       </p>
//                     </div>
//                     <div className="flex items-center justify-between text-sm text-gray-500">
//                       <span>
//                         {new Date(featuredPost.date).toLocaleDateString()}
//                       </span>
//                       <span>{calculateReadingTime(featuredPost.content)}</span>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           )}

//           {/* Blog Grid */}
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {remainingPosts.map((post) => (
//               <div key={post.id} className="group">
//                 <Link to={`/blog/${post.id}`} className="block">
//                   <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 group-hover:scale-[1.02]">
//                     <div className="relative">
//                       <img
//                         src={post.imageUrl}
//                         alt={post.title}
//                         className="w-full h-48 object-cover"
//                       />
//                       <div className="absolute top-4 left-4 flex gap-2">
//                         {post.category.map((cat) => (
//                           <span
//                             key={cat}
//                             className="text-xs text-gold bg-classic-blue bg-opacity-90 px-2 py-1 rounded-full"
//                           >
//                             {cat}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                     <div className="p-6">
//                       <h2 className="text-xl font-bold text-gold mb-3 group-hover:text-white transition-colors">
//                         {post.title}
//                       </h2>
//                       <p className="text-gray-400 mb-4 line-clamp-2">
//                         {post.excerpt}
//                       </p>
//                       <div className="flex justify-between items-center text-sm text-gray-500">
//                         <span>{new Date(post.date).toLocaleDateString()}</span>
//                         <span>{calculateReadingTime(post.content)}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>

//                 {isAdmin() && (
//                   <div className="mt-4 pt-4 border-t border-gray-700 flex justify-end gap-4">
//                     <Link
//                       to={`/blog/edit/${post.id}`}
//                       className="text-gold hover:text-white transition-colors"
//                     >
//                       Edit
//                     </Link>
//                     <button
//                       onClick={() => handleDelete(post.id)}
//                       className="text-red-500 hover:text-red-700 transition-colors"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Blog;


















import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { databases } from "../appwrite/appwriteConfig";
import { useAuth } from "../appwrite/auth";
import { FaHeart } from "react-icons/fa";
import conf from "../config/conf";
import { Query } from "appwrite";
import { Helmet } from "react-helmet-async";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string[];
  imageUrl: string;
  likes: number;
  // likedBy: string[];
}

const LikeCount = ({ count }: { count: number }) => (
  <div className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-100 bg-red-400  hover:bg-red-600 text-white">
    <FaHeart className="text-red-800 transform transition-transform duration-200 group-hover:scale-110 animate-pulse" />
    <span className="group-hover:text-red-300 transition-colors duration-200">
      {count}
    </span>
  </div>
);

function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const calculateReadingTime = (content: string): string => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteBlogCollectionId,
        [Query.orderDesc("date")]
      );
      setPosts(
        response.documents.map((doc: any) => ({
          id: doc.$id,
          title: doc.title,
          excerpt: doc.excerpt,
          content: doc.content,
          date: doc.date,
          category: doc.category,
          imageUrl: doc.imageUrl,
          likes: doc.likes || 0
        }))
      );
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteBlogCollectionId,
        id
      );
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
      setError("Failed to delete the blog post");
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <>
      <Helmet>
        <title>Blog - Rohit Upadhyay</title>
        <meta
          name="description"
          content="Read Rohit Upadhyay's blog posts about writing, storytelling, and his journey as an author."
        />
        <meta
          name="keywords"
          content="blog, rohit upadhyay, author blog, writing, storytelling"
        />
        <meta property="og:title" content="Blog - Rohit Upadhyay" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.rohitupadhyay.me/blog" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-5xl font-bold text-gold">Blog</h1>
            {isAdmin() && (
              <Link
                to="/blog/new"
                className="px-6 py-3 bg-gold text-gray-900 rounded-lg hover:bg-opacity-90 transition-all duration-300 flex items-center gap-2"
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
                Create New Blog
              </Link>
            )}
          </div>

          {/* {featuredPost && (
            <div className="mb-16">
              <Link to={`/blog/${featuredPost.id}`}>
                <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-xl overflow-hidden md:flex">
                  <div className="md:w-2/3">
                    <img
                      src={featuredPost.imageUrl}
                      alt={featuredPost.title}
                      loading="eager"
                      fetchPriority="high"
                      className="w-full h-[400px] object-cover"
                    />
                  </div>
                  <div className="p-8 md:w-1/3 flex flex-col justify-between">
                    <div>
                      <div className="flex gap-2 mb-4">
                        {featuredPost.category.map((cat) => (
                          <span
                            key={cat}
                            className="text-sm text-gold bg-classic-blue bg-opacity-10 px-3 py-1 rounded-full"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-3xl font-bold text-gold mb-4">
                        {featuredPost.title}
                      </h2>
                      <p className="text-gray-400 mb-4">{featuredPost.excerpt}</p>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                      <div className="flex items-center gap-4">
                        <LikeCount count={featuredPost.likes} />
                        <span>{calculateReadingTime(featuredPost.content)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )} */}


{featuredPost && (
  <div className="mb-16">
    <Link to={`/blog/${featuredPost.id}`}>
      <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 relative">
          <img
            src={featuredPost.imageUrl}
            alt={featuredPost.title}
            loading="eager"
            fetchPriority="high"
            className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="w-full md:w-1/3 p-4 sm:p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {featuredPost.category.map((cat) => (
                <span
                  key={cat}
                  className="text-sm text-gold bg-classic-blue bg-opacity-10 px-3 py-1 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gold mb-4">
              {featuredPost.title}
            </h2>
            <p className="text-gray-400 mb-4 line-clamp-3 sm:line-clamp-none">
              {featuredPost.excerpt}
            </p>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
            <div className="flex items-center gap-4">
              <LikeCount count={featuredPost.likes} />
              <span>{calculateReadingTime(featuredPost.content)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  </div>
)}

          {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingPosts.map((post) => (
              <div key={post.id} className="group">
                <Link to={`/blog/${post.id}`} className="block">
                  <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 group-hover:scale-[1.02]">
                    <div className="w-full md:w-2/3 relative">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        loading="eager"
                        fetchPriority="high"
                        className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        {post.category.map((cat) => (
                          <span
                            key={cat}
                            className="text-xs text-gold bg-classic-blue bg-opacity-90 px-2 py-1 rounded-full"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gold mb-3 group-hover:text-white transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-400 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        <div className="flex items-center gap-4">
                          <LikeCount count={post.likes} />
                          <span>{calculateReadingTime(post.content)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                {isAdmin() && (
                  <div className="mt-4 pt-4 border-t border-gray-700 flex justify-end gap-4">
                    <Link
                      to={`/blog/edit/${post.id}`}
                      className="text-gold hover:text-white transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div> */}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingPosts.map((post) => (
              <div key={post.id} className="group">
                <Link to={`/blog/${post.id}`} className="block">
                  <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 group-hover:scale-[1.02]">
                    {/* Image container - removed md:w-2/3 */}
                    <div className="relative w-full aspect-[16/9]">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        loading="eager"
                        fetchPriority="high"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {post.category.map((cat) => (
                          <span
                            key={cat}
                            className="text-xs text-gold bg-classic-blue bg-opacity-90 px-2 py-1 rounded-full"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-4 sm:p-6">
                      <h2 className="text-lg sm:text-xl font-bold text-gold mb-3 group-hover:text-white transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-400 mb-4 text-sm sm:text-base line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        <div className="flex items-center gap-4">
                          <LikeCount count={post.likes} />
                          <span>{calculateReadingTime(post.content)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                {isAdmin() && (
                  <div className="mt-4 pt-4 border-t border-gray-700 flex justify-end gap-4">
                    <Link
                      to={`/blog/edit/${post.id}`}
                      className="text-gold hover:text-white transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Blog;