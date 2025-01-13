

// pages/admin/UploadPicture.tsx
import { useState, FormEvent, useEffect, useRef, DragEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { storages, databases } from '../../appwrite/appwriteConfig';
import { ID } from 'appwrite';
import conf from '../../config/conf';

interface ImageFile {
  file: File;
  preview: string;
  category: string;
}

function UploadPicture() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [defaultCategory, setDefaultCategory] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      images.forEach(image => URL.revokeObjectURL(image.preview));
    };
  }, [images]);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const validFiles = Array.from(files).filter(file => {
      const isValid = file.type.startsWith('image/');
      if (!isValid) setError(`${file.name} is not a valid image file`);
      return isValid;
    });

    const newImages = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      category: defaultCategory || 'Uncategorized'
    }));

    setImages(prev => [...prev, ...newImages]);
    setError(null);
  };

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    setImages(prev => {
      URL.revokeObjectURL(prev[index].preview);
      const newImages = [...prev];
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const updateImageCategory = (index: number, category: string) => {
    setImages(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], category };
      return updated;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      setError('Please select at least one image');
      return;
    }

    if (!images.every(img => img.category.trim())) {
      setError('Please add categories for all images');
      return;
    }

    setLoading(true);
    setError(null);
    const totalImages = images.length;
    let uploaded = 0;

    try {
      await Promise.all(images.map(async ({ file, category }) => {
        const fileUpload = await storages.createFile(
          conf.appwriteAuthorImageBucketId,
          ID.unique(),
          file
        );

        await databases.createDocument(
          conf.appwriteDatabaseId,
          conf.appwriteImageCollection,
          ID.unique(),
          {
            fileId: fileUpload.$id,
            title: file.name,
            category: category.trim(),
            date: new Date().toISOString()
          }
        );

        uploaded++;
        setUploadProgress((uploaded / totalImages) * 100);
      }));

      navigate('/pictures');
    } catch (error) {
      console.error('Upload failed:', error);
      setError('Failed to upload images. Please try again.');
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111] to-black py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gold mb-8">Upload Pictures</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 text-red-500 p-4 rounded-lg border border-red-500/20">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-gold">Default Category</label>
            <input
              type="text"
              value={defaultCategory}
              onChange={(e) => setDefaultCategory(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 
                       focus:border-gold focus:ring-1 focus:ring-gold outline-none"
              placeholder="Enter  category for uploaded images"
            />
          </div>

          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              dragActive ? 'border-gold bg-gold/5' : 'border-gray-700'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept="image/*"
              onChange={(e) => handleFiles(e.target.files)}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-classic-blue text-gold rounded-lg 
                       hover:bg-opacity-90 transition-all duration-300"
            >
              Select Images
            </button>
            <p className="mt-2 text-gray-400">or drag and drop images here</p>
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image.preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 
                                group-hover:opacity-100 transition-opacity rounded-lg">
                    <div className="absolute inset-x-2 bottom-2">
                      <input
                        type="text"
                        value={image.category}
                        onChange={(e) => updateImageCategory(index, e.target.value)}
                        className="w-full px-3 py-2 bg-white/90 rounded-lg text-sm"
                        placeholder="Enter category"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white 
                               p-2 rounded-full hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {loading && (
            <div className="w-full bg-gray-800 rounded-full h-2.5">
              <div
                className="bg-classic-blue h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={images.length === 0 || loading}
            className={`w-full py-3 rounded-lg transition-colors ${
              images.length === 0 || loading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-classic-blue text-gold hover:bg-opacity-90'
            }`}
          >
            {loading 
              ? `Uploading... ${Math.round(uploadProgress)}%`
              : `Upload ${images.length} Image${images.length !== 1 ? 's' : ''}`
            }
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadPicture;