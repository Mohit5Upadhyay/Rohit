// // pages/admin/EditBlog.tsx
// import { useState, useEffect, useRef, FormEvent } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Editor } from '@tinymce/tinymce-react';
// import { databases, storagess } from '../../appwrite/appwriteConfig';
// import { ID } from 'appwrite';
// import conf from '../../config/conf';

// interface BlogForm {
//   title: string;
//   excerpt: string;
//   content: string;
//   category: string;
//   imageUrl: string;
// }

// function EditBlog() {
//   const { id } = useParams();
//   const [formData, setFormData] = useState<BlogForm>({
//     title: '',
//     excerpt: '',
//     content: '',
//     category: '',
//     imageUrl: ''
//   });
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [coverImage, setCoverImage] = useState<File | null>(null);
//   const [currentImageId, setCurrentImageId] = useState<string>('');
//   const editorRef = useRef<any>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchBlogPost();
//   }, [id]);

//   const fetchBlogPost = async () => {
//     try {
//       const post = await databases.getDocument(
//         conf.appwriteDatabaseId,
//         conf.appwriteBlogCollectionId,
//         id!
//       );

//       setFormData({
//         title: post.title,
//         excerpt: post.excerpt,
//         content: post.content,
//         category: post.category,
//         imageUrl: post.imageUrl
//       });
//       setCurrentImageId(post.imageId);
//     } catch (error) {
//       console.error('Failed to fetch blog post:', error);
//       setError('Failed to load blog post');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setSaving(true);
//     setError(null);

//     try {
//       let imageUrl = formData.imageUrl;
//       let imageId = currentImageId;

//       if (coverImage) {
//         // Delete old image if exists
//         if (currentImageId) {
//           await storages.deleteFile(conf.appwriteBlogImageBucketId, currentImageId);
//         }

//         // Upload new image
//         const imageUpload = await storages.createFile(
//           conf.appwriteBlogImageBucketId,
//           ID.unique(),
//           coverImage
//         );
//         imageId = imageUpload.$id;
//         imageUrl = storages.getFileView(conf.appwriteBlogImageBucketId, imageId);
//       }

//       // Update blog post
//       await databases.updateDocument(
//         conf.appwriteDatabaseId,
//         conf.appwriteBlogCollectionId,
//         id!,
//         {
//           title: formData.title,
//           excerpt: formData.excerpt,
//           content: editorRef.current.getContent(),
//           category: formData.category,
//           imageUrl,
//           imageId,
//           updatedAt: new Date().toISOString()
//         }
//       );

//       navigate('/blog');
//     } catch (error) {
//       console.error('Failed to update blog post:', error);
//       setError('Failed to update blog post. Please try again.');
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto py-12 px-4">
//       <h1 className="text-3xl font-bold text-classic-blue mb-8">Edit Blog Post</h1>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {error && (
//           <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
//         )}

//         <div>
//           <label className="block text-gray-700 mb-2">Title</label>
//           <input
//             type="text"
//             required
//             className="w-full px-4 py-2 border rounded-lg focus:ring-classic-blue focus:border-classic-blue"
//             value={formData.title}
//             onChange={e => setFormData({ ...formData, title: e.target.value })}
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 mb-2">Excerpt</label>
//           <textarea
//             required
//             rows={3}
//             className="w-full px-4 py-2 border rounded-lg focus:ring-classic-blue focus:border-classic-blue"
//             value={formData.excerpt}
//             onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 mb-2">Category</label>
//           <input
//             type="text"
//             required
//             className="w-full px-4 py-2 border rounded-lg focus:ring-classic-blue focus:border-classic-blue"
//             value={formData.category}
//             onChange={e => setFormData({ ...formData, category: e.target.value })}
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 mb-2">Cover Image</label>
//           {formData.imageUrl && (
//             <img
//               src={formData.imageUrl}
//               alt="Current cover"
//               className="w-40 h-40 object-cover mb-2 rounded-lg"
//             />
//           )}
//           <input
//             type="file"
//             accept="image/*"
//             onChange={e => setCoverImage(e.target.files ? e.target.files[0] : null)}
//             className="w-full"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 mb-2">Content</label>
//           <Editor
//             apiKey={conf.appwriteTinyMCEApiKey}
//             onInit={(evt, editor) => editorRef.current = editor}
//             initialValue={formData.content}
//             init={{
//               height: 500,
//               menubar: true,
//               plugins: [
//                 'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
//                 'searchreplace', 'visualblocks', 'code', 'fullscreen',
//                 'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
//               ],
//               toolbar: 'undo redo | formatselect | ' +
//                 'bold italic backcolor | alignleft aligncenter ' +
//                 'alignright alignjustify | bullist numlist outdent indent | ' +
//                 'removeformat | image | help',
//               content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-size: 16px }',
//               images_upload_handler: async (blobInfo) => {
//                 try {
//                   const blob = blobInfo.blob();
//                   const file = new File([blob], blobInfo.filename(), { type: blob.type });
//                   const upload = await storages.createFile(
//                     conf.appwriteBlogImageBucketId,
//                     ID.unique(),
//                     file
//                   );
//                   return storages.getFileView(conf.appwriteBlogImageBucketId, upload.$id);
//                 } catch (error) {
//                   console.error('Image upload failed:', error);
//                   throw new Error('Image upload failed');
//                 }
//               }
//             }}
//           />
//         </div>

//         <div className="flex gap-4">
//           <button
//             type="submit"
//             disabled={saving}
//             className={`flex-1 py-3 rounded-lg transition-colors ${
//               saving 
//                 ? 'bg-gray-400 cursor-not-allowed' 
//                 : 'bg-classic-blue text-gold hover:bg-opacity-90'
//             }`}
//           >
//             {saving ? 'Saving...' : 'Save Changes'}
//           </button>
          
//           <button
//             type="button"
//             onClick={() => navigate('/blog')}
//             className="flex-1 py-3 border-2 border-classic-blue text-classic-blue rounded-lg hover:bg-classic-blue hover:text-gold transition-colors"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default EditBlog;










// pages/admin/EditBlog.tsx
import { useState, useEffect, useRef, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { databases, storages } from '../../appwrite/appwriteConfig';
import { ID } from 'appwrite';
import conf from '../../config/conf';

interface BlogForm {
  title: string;
  excerpt: string;
  content: string;
  category: string[];
  imageUrl: string;
}

function EditBlog() {
  const { id } = useParams();
  const [formData, setFormData] = useState<BlogForm>({
    title: '',
    excerpt: '',
    content: '',
    category: [],
    imageUrl: ''
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const editorRef = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogPost();
  }, [id]);

  const fetchBlogPost = async () => {
    try {
      const post = await databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteBlogCollectionId,
        id!
      );

      setFormData({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        imageUrl: post.imageUrl
      });
    } catch (error) {
      console.error('Failed to fetch blog post:', error);
      setError('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (blobInfo: any): Promise<string> => {
    try {
      // Convert Blob to File with metadata
      const file = new File(
        [blobInfo.blob()],
        `image-${Date.now()}.${blobInfo.blob().type.split('/')[1]}`,
        { type: blobInfo.blob().type }
      );

      const upload = await storages.createFile(
        conf.appwriteBlogImageBucketId,
        ID.unique(),
        file
      );

      return storages.getFileView(
        conf.appwriteBlogImageBucketId,
        upload.$id
      );
    } catch (error) {
      console.error('Image upload failed:', error);
      throw new Error('Image upload failed');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      let imageUrl = formData.imageUrl;

      if (coverImage) {
        // Upload new image
        const imageUpload = await storages.createFile(
          conf.appwriteBlogImageBucketId,
          ID.unique(),
          coverImage
        );
        imageUrl = storages.getFileView(
          conf.appwriteBlogImageBucketId,
          imageUpload.$id
        );
      }

      // Update blog post
      await databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteBlogCollectionId,
        id!,
        {
          title: formData.title,
          excerpt: formData.excerpt,
          content: editorRef.current.getContent(),
          category: formData.category,
          imageUrl
        }
      );

      navigate('/blog');
    } catch (error) {
      console.error('Failed to update blog post:', error);
      setError('Failed to update blog post. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-classic-blue mb-8">Edit Blog Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
        )}

        <div>
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-classic-blue focus:border-classic-blue"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Excerpt</label>
          <textarea
            required
            rows={3}
            className="w-full px-4 py-2 border rounded-lg focus:ring-classic-blue focus:border-classic-blue"
            value={formData.excerpt}
            onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Category</label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-classic-blue focus:border-classic-blue"
            value={formData.category.join(', ')}
            onChange={e => setFormData({ ...formData, category: e.target.value.split(',').map(cat => cat.trim()) })}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Cover Image</label>
          {formData.imageUrl && (
            <img
              src={formData.imageUrl}
              alt="Current cover"
              className="w-40 h-40 object-cover mb-2 rounded-lg"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={e => setCoverImage(e.target.files ? e.target.files[0] : null)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Content</label>
          <Editor
            apiKey={conf.appwriteTinyMCEApiKey}
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue={formData.content}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | image | help',
              content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-size: 16px }',
              images_upload_handler: handleImageUpload
            }}
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className={`flex-1 py-3 rounded-lg transition-colors ${
              saving 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-classic-blue text-gold hover:bg-opacity-90'
            }`}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/blog')}
            className="flex-1 py-3 border-2 border-classic-blue text-classic-blue rounded-lg hover:bg-classic-blue hover:text-gold transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBlog;