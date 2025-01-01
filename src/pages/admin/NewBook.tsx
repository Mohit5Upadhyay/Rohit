// pages/admin/NewBook.tsx
import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { databases, storages } from '../../appwrite/appwriteConfig';
import { ID } from 'appwrite';
import conf from '../../config/conf';

interface BookForm {
  title: string;
  coverUrl: string;
  year: string;
  category: string;
  description: string;
  awards: string;
  buyLink: string;
}

function NewBook() {
  const [formData, setFormData] = useState<BookForm>({
    title: '',
    coverUrl: '',
    year: '',
    category: '',
    description: '',
    awards: '',
    buyLink: ''
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
        conf.appwriteBookCoverBucketId, // Ensure this ID is correct
        ID.unique(),
        coverImage
      );

      // Create book entry
      await databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteBookCollectionId,
        ID.unique(),
        {
          title: formData.title,
          coverUrl: storages.getFileView(
            conf.appwriteBookCoverBucketId, // Ensure this ID is correct
            imageUpload.$id
          ),
          year: formData.year,
          category: formData.category,
          description: formData.description,
          awards: formData.awards.split(',').map(award => award.trim()),
          buyLink: formData.buyLink,
          createdAt: new Date().toISOString()
        }
      );

      navigate('/books');
    } catch (error) {
      console.error('Failed to create book:', error);
      setError('Failed to create book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-classic-blue mb-8">Add New Book</h1>

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
          <label className="block text-gray-700 mb-2">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => setCoverImage(e.target.files ? e.target.files[0] : null)}
            className="w-full"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Year</label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-classic-blue focus:border-classic-blue"
            value={formData.year}
            onChange={e => setFormData({ ...formData, year: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Category</label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-classic-blue focus:border-classic-blue"
            value={formData.category}
            onChange={e => setFormData({ ...formData, category: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            required
            rows={5}
            className="w-full px-4 py-2 border rounded-lg focus:ring-classic-blue focus:border-classic-blue"
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Awards (comma separated)</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:ring-classic-blue focus:border-classic-blue"
            value={formData.awards}
            onChange={e => setFormData({ ...formData, awards: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Buy Link</label>
          <input
            type="url"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-classic-blue focus:border-classic-blue"
            value={formData.buyLink}
            onChange={e => setFormData({ ...formData, buyLink: e.target.value })}
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
          {loading ? 'Adding...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
}

export default NewBook;