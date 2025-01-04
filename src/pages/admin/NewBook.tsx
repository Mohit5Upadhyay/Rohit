

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
      const imageUpload = await storages.createFile(
        conf.appwriteBookCoverBucketId,
        ID.unique(),
        coverImage
      );

      await databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteBookCollectionId,
        ID.unique(),
        {
          title: formData.title,
          coverUrl: storages.getFileView(
            conf.appwriteBookCoverBucketId,
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl">
          <h1 className="text-4xl font-bold text-gold text-center mb-8">
            Add New Book
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg backdrop-blur-sm">
                {error}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-gold text-sm font-medium mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
                             text-white placeholder-gray-400 focus:ring-2 focus:ring-gold/50 
                             focus:border-transparent transition-all duration-200"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter book title"
                  />
                </div>

                <div>
                  <label className="block text-gold text-sm font-medium mb-2">
                    Cover Image
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setCoverImage(file);
                            const preview = URL.createObjectURL(file);
                            setFormData({ ...formData, coverUrl: preview });
                          }
                        }}
                        className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg 
                                 file:border-0 file:bg-gold/10 file:text-gold
                                 hover:file:bg-gold/20 file:transition-colors
                                 text-white"
                        required
                      />
                    </div>
                    {formData.coverUrl && (
                      <div className="w-24 h-32 rounded-lg overflow-hidden">
                        <img 
                          src={formData.coverUrl} 
                          alt="Cover Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-gold text-sm font-medium mb-2">
                    Year
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
                             text-white placeholder-gray-400 focus:ring-2 focus:ring-gold/50 
                             focus:border-transparent transition-all duration-200"
                    value={formData.year}
                    onChange={e => setFormData({ ...formData, year: e.target.value })}
                    placeholder="Enter publication year"
                  />
                </div>

                <div>
                  <label className="block text-gold text-sm font-medium mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
                             text-white placeholder-gray-400 focus:ring-2 focus:ring-gold/50 
                             focus:border-transparent transition-all duration-200"
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Enter book category"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-gold text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
                             text-white placeholder-gray-400 focus:ring-2 focus:ring-gold/50 
                             focus:border-transparent transition-all duration-200 resize-none"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter book description"
                  />
                </div>

                <div>
                  <label className="block text-gold text-sm font-medium mb-2">
                    Awards
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
                             text-white placeholder-gray-400 focus:ring-2 focus:ring-gold/50 
                             focus:border-transparent transition-all duration-200"
                    value={formData.awards}
                    onChange={e => setFormData({ ...formData, awards: e.target.value })}
                    placeholder="Enter awards (comma separated)"
                  />
                </div>

                <div>
                  <label className="block text-gold text-sm font-medium mb-2">
                    Buy Link
                  </label>
                  <input
                    type="url"
                    required
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
                             text-white placeholder-gray-400 focus:ring-2 focus:ring-gold/50 
                             focus:border-transparent transition-all duration-200"
                    value={formData.buyLink}
                    onChange={e => setFormData({ ...formData, buyLink: e.target.value })}
                    placeholder="Enter purchase link"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-3 rounded-lg text-sm font-medium transition-all duration-200
                          ${loading 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-gold text-black hover:bg-gold/90'
                          }`}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Adding Book...
                  </span>
                ) : (
                  'Add Book'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewBook;