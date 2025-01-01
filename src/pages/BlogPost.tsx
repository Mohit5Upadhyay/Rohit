// // pages/BlogPost.tsx
// import { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { databases } from '../appwrite/appwriteConfig';
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

// function BlogPost() {
//   const { id } = useParams();
//   const [post, setPost] = useState<BlogPost | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

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
//     } catch (error) {
//       setError('Failed to load blog post');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <div className="text-center py-8">Loading...</div>;
//   if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
//   if (!post) return <div className="text-center py-8">Post not found</div>;

//   return (
//     <div className="min-h-screen bg-turquoise py-10 px-6">
//       <div className="max-w-4xl mx-auto">
//         <Link 
//           to="/blog"
//           className="inline-flex items-center text-classic-blue hover:text-gold mb-8"
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

//         <article className="bg-white rounded-lg shadow-xl overflow-hidden">
//           <img
//             src={post.imageUrl}
//             alt={post.title}
//             className="w-full h-[400px] object-cover"
//           />
          
//           <div className="p-8">
//             <div className="flex gap-2 mb-6">
//               {post.category.map(cat => (
//                 <span 
//                   key={cat}
//                   className="text-sm text-gold bg-classic-blue bg-opacity-10 px-3 py-1 rounded-full"
//                 >
//                   {cat}
//                 </span>
//               ))}
//             </div>

//             <h1 className="text-4xl font-bold text-classic-blue mb-4">
//               {post.title}
//             </h1>
            
//             <div className="flex items-center text-gray-600 mb-8">
//               <span>{new Date(post.date).toLocaleDateString()}</span>
//             </div>

//             <div 
//               className="prose prose-lg max-w-none"
//               dangerouslySetInnerHTML={{ __html: post.content }}
//             />
//           </div>
//         </article>
//       </div>
//     </div>
//   );
// }

// export default BlogPost;










import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
}

function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
  }, [id]);

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
      });
    } catch (error) {
      setError('Failed to load blog post');
    } finally {
      setLoading(false);
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
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Failed to delete the blog post');
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!post) return <div className="text-center py-8">Post not found</div>;

  return (
    <div className="min-h-screen bg-turquoise py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/blog"
          className="inline-flex items-center text-classic-blue hover:text-gold mb-8"
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

        <article className="bg-white rounded-lg shadow-xl overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-[400px] object-cover"
          />
          
          <div className="p-8">
            <div className="flex gap-2 mb-6">
              {post.category.map(cat => (
                <span 
                  key={cat}
                  className="text-sm text-gold bg-classic-blue bg-opacity-10 px-3 py-1 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>

            <h1 className="text-4xl font-bold text-classic-blue mb-4">
              {post.title}
            </h1>
            
            <div className="flex items-center text-gray-600 mb-8">
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>

            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {isAdmin() && (
              <div className="mt-8 flex justify-end gap-4">
                <Link
                  to={`/blog/edit/${post.id}`}
                  className="px-4 py-2 bg-classic-blue text-gold rounded-lg hover:bg-opacity-90"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
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