


/// pages/admin/NewBlog.tsx
import { useState, useRef, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
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
  likes: number;
  likedBy: string[];
}

function NewBlog() {
  const [formData, setFormData] = useState<BlogForm>({
    title: '',
    excerpt: '',
    content: '',
    category: [],
    imageUrl: '',
    likes: 0,
    likedBy: []
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const editorRef = useRef<any>(null);
  const navigate = useNavigate();

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

  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   if (!coverImage) {
  //     setError('Please select a cover image');
  //     return;
  //   }

  //   setLoading(true);
  //   setError(null);

  //   try {
  //     // Upload cover image
  //     const imageUpload = await storages.createFile(
  //       conf.appwriteBlogImageBucketId,
  //       ID.unique(),
  //       coverImage
  //     );

  //     // Create blog post
  //     await databases.createDocument(
  //       conf.appwriteDatabaseId,
  //       conf.appwriteBlogCollectionId,
  //       ID.unique(),
  //       {
  //         title: formData.title,
  //         excerpt: formData.excerpt,
  //         content: editorRef.current.getContent(),
  //         category: formData.category,
  //         imageUrl: storages.getFileView(
  //           conf.appwriteBlogImageBucketId,
  //           imageUpload.$id
  //         ),
  //         date: new Date().toISOString()
  //       }
  //     );

  //     navigate('/blog');
  //   } catch (error) {
  //     console.error('Failed to create blog post:', error);
  //     setError('Failed to create blog post. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };



  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!coverImage) {
      setError('Please select a cover image');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Upload cover image
      const imageUpload = await storages.createFile(
        conf.appwriteBlogImageBucketId,
        ID.unique(),
        coverImage
      );

      // Create blog post with likes data
      await databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteBlogCollectionId,
        ID.unique(),
        {
          title: formData.title,
          excerpt: formData.excerpt,
          content: editorRef.current.getContent(),
          category: formData.category,
          imageUrl: storages.getFileView(
            conf.appwriteBlogImageBucketId,
            imageUpload.$id
          ),
          date: new Date().toISOString(),
          likes: 0,
          likedBy: []
        }
      );

      navigate('/blog');
    } catch (error) {
      console.error('Failed to create blog post:', error);
      setError('Failed to create blog post. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gold mb-8">Create New Blog Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
        )}

        <div>
          <label className="block text-gold mb-2">Title</label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-classic-blue focus:border-classic-blue"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-gold mb-2">Excerpt</label>
          <textarea
            required
            rows={3}
            className="w-full px-4 py-2 border rounded-lg focus:ring-classic-blue focus:border-classic-blue"
            value={formData.excerpt}
            onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-gold mb-2">Category</label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-classic-blue focus:border-classic-blue"
            value={formData.category.join(', ')}
            onChange={e => setFormData({ ...formData, category: e.target.value.split(',').map(cat => cat.trim()) })}
          />
        </div>

        <div>
          <label className="block text-gold mb-2">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => setCoverImage(e.target.files ? e.target.files[0] : null)}
            className="w-full"
            required
          />
        </div>

        <div>
          <label className="block text-gold mb-2">Content</label>
          <Editor
            apiKey={conf.appwriteTinyMCEApiKey}
            onInit={(_, editor) => editorRef.current = editor}
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
            value={formData.content}
            onEditorChange={(content) => {
              setFormData(prev => ({
                ...prev,
                content
              }));
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg transition-colors ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-classic-blue text-gold hover:bg-opacity-90'
          }`}
        >
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}

export default NewBlog;