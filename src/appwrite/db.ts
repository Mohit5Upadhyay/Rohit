

  // Blog operations
  // export const getBlogPosts = async (): Promise<BlogPost[]> => {
  //   // Implement fetching blog posts from database
  //   return [];
  // };
  
  // export const getBlogPostById = async (id: number): Promise<BlogPost | null> => {
  //   // Implement fetching single blog post
  //   return null;
  // };
  
  // export const createBlogPost = async (post: Omit<BlogPost, 'id'>): Promise<BlogPost> => {
  //   // Implement creating new blog post
  //   return {} as BlogPost;
  // };
  
  // export const updateBlogPost = async (id: number, post: Partial<BlogPost>): Promise<BlogPost> => {
  //   // Implement updating blog post
  //   return {} as BlogPost;
  // };
  
  // export const deleteBlogPost = async (id: number): Promise<void> => {
  //   // Implement deleting blog post
  // };



import { ID, Query } from 'appwrite';
import { databases, storages } from './appwriteConfig';
import { BlogPost, Book, ContactMessage, Image } from '../types/types'; // Create this file
import conf from '../config/conf';
  
    
const DATABASE_ID = conf.appwriteDatabaseId;
const BLOGS_COLLECTION_ID = conf.appwriteBlogCollectionId;
const BOOKS_COLLECTION_ID = conf.appwriteBookCollectionId; 
const CONTACT_COLLECTION_ID = conf.appwriteContactCollection;  
const IMAGES_COLLECTION_ID = conf.appwriteImageCollection;
const IMAGES_BUCKET_ID = conf.appwriteAuthorImageBucketId;


// Blog operations
export const getBlogPosts = async (): Promise<BlogPost[]> => {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            BLOGS_COLLECTION_ID,
            [
                Query.orderDesc('date'),
                Query.limit(100)
            ]
        );
        return response.documents.map(doc => ({
            id: doc.$id,
            title: doc.title,
            excerpt: doc.excerpt,
            content: doc.content,
            date: doc.date,
            category: doc.category
        })) as BlogPost[];
    } catch (error) {
        // console.error('Error fetching blog posts:');
        throw new Error('Failed to fetch blog posts');
    }
};

export const getBlogPostById = async (id: number): Promise<BlogPost | null> => {
    try {
        const response = await databases.getDocument(
            DATABASE_ID,
            BLOGS_COLLECTION_ID,
            id.toString()
        );
        return {
            id: response.$id,
            title: response.title,
            excerpt: response.excerpt,
            content: response.content,
            date: response.date,
            category: response.category
        } as BlogPost;
    } catch (error) {
        // console.error('Error fetching blog post:');
        return null;
    }
};

export const createBlogPost = async (post: Omit<BlogPost, 'id'>): Promise<BlogPost> => {
    try {
        const blogPost = {
            ...post,
            date: new Date().toISOString(),
        };
        
        const response = await databases.createDocument(
            DATABASE_ID,
            BLOGS_COLLECTION_ID,
            ID.unique(),
            blogPost
        );
        return {
            id: response.$id,
            title: response.title,
            excerpt: response.excerpt,
            content: response.content,
            date: response.date,
            category: response.category
        } as BlogPost;
    } catch (error) {
        // console.error('Error creating blog post:');
        throw new Error('Failed to create blog post');
    }
};

export const updateBlogPost = async (id: number, post: Partial<BlogPost>): Promise<BlogPost> => {
    try {
        const response = await databases.updateDocument(
            DATABASE_ID,
            BLOGS_COLLECTION_ID,
            id.toString(),
            post
        );
        return {
            id: response.$id,
            title: response.title,
            excerpt: response.excerpt,
            content: response.content,
            date: response.date,
            category: response.category
        } as BlogPost;
    } catch (error) {
        // console.error('Error updating blog post:');
        throw new Error('Failed to update blog post');
    }
};

export const deleteBlogPost = async (id: number): Promise<void> => {
    try {
        await databases.deleteDocument(
            DATABASE_ID,
            BLOGS_COLLECTION_ID,
            id.toString()
        );
    } catch (error) {
        // console.error('Error deleting blog post:');
        throw new Error('Failed to delete blog post');
    }
};





///////////////toggle like

// db.ts
export const toggleLike = async (postId: string, userId: string): Promise<{ likes: number; liked: boolean }> => {
    try {
      const post = await databases.getDocument(
        DATABASE_ID,
        BLOGS_COLLECTION_ID,
        postId
      );
  
      const likedBy = post.likedBy || [];
      const isLiked = likedBy.includes(userId);
      
    const updatedLikedBy: string[] = isLiked 
        ? likedBy.filter((id: string) => id !== userId)
        : [...likedBy, userId];    
      const updatedLikes = updatedLikedBy.length;
  
      await databases.updateDocument(
        DATABASE_ID,
        BLOGS_COLLECTION_ID,
        postId,
        {
          likes: updatedLikes,
          likedBy: updatedLikedBy
        }
      );
  
      return {
        likes: updatedLikes,
        liked: !isLiked
      };
    } catch (error) {
    //   console.error('Error toggling like:');
      throw new Error('Failed to toggle like');
    }
  };




// Additional utility functions
export const getBlogPostsByCategory = async (category: string): Promise<BlogPost[]> => {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            BLOGS_COLLECTION_ID,
            [
                Query.equal('category', category),
                Query.orderDesc('date')
            ]
        );
        return response.documents.map(doc => ({
            id: doc.$id,
            title: doc.title,
            excerpt: doc.excerpt,
            content: doc.content,
            date: doc.date,
            category: doc.category
        })) as BlogPost[];
    } catch (error) {
        // console.error('Error fetching blog posts by category:');
        throw new Error('Failed to fetch blog posts by category');
    }
};

export const searchBlogPosts = async (searchTerm: string): Promise<BlogPost[]> => {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            BLOGS_COLLECTION_ID,
            [
                Query.search('title', searchTerm),
                Query.orderDesc('date')
            ]
        );
        return response.documents.map(doc => ({
            id: doc.$id,
            title: doc.title,
            excerpt: doc.excerpt,
            content: doc.content,
            date: doc.date,
            category: doc.category
        })) as BlogPost[];
    } catch (error) {
        // console.error('Error searching blog posts:');
        throw new Error('Failed to search blog posts');
    }
};
  
  // Book operations
  // export const getBooks = async (): Promise<Book[]> => {
  //   // Implement fetching books
  //   return [];
  // };
  
  // export const getBookById = async (id: number): Promise<Book | null> => {
  //   // Implement fetching single book
  //   return null;
  // };
  
  // export const createBook = async (book: Omit<Book, 'id'>): Promise<Book> => {
  //   // Implement creating new book
  //   return {} as Book;
  // };
  
  // export const updateBook = async (id: number, book: Partial<Book>): Promise<Book> => {
  //   // Implement updating book
  //   return {} as Book;
  // };
  
  // export const deleteBook = async (id: number): Promise<void> => {
  //   // Implement deleting book
  // };

  export const getBooks = async (): Promise<Book[]> => {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            BOOKS_COLLECTION_ID,
            [Query.orderDesc('year')]
        );
        return response.documents.map(doc => ({
            id: doc.$id,
            title: doc.title,
            author: doc.author,
            coverImageID: doc.coverImageID,
            cover: doc.cover,
            year: doc.year,
            category: doc.category,
            description: doc.description,
            buyLink: doc.buyLink 
        })) as Book[];
    } catch (error) {
        // console.error('Error fetching books:');
        throw new Error('Failed to fetch books');
    }
};

export const getBookById = async (id: number): Promise<Book | null> => {
    try {
        const response = await databases.getDocument(
            DATABASE_ID,
            BOOKS_COLLECTION_ID,
            id.toString()
        );
        return {
            id: response.$id,
            title: response.title,
            author: response.author,
            coverImageID: response.coverImageID,
            cover: response.cover,
            year: response.year,
            category: response.category,
            description: response.description,
            buyLink: response.buyLink || '',
            
        } as Book;
    } catch (error) {
        // console.error('Error fetching book:');
        return null;
    }
};

export const createBook = async (book: Omit<Book, 'id'>): Promise<Book> => {
    try {
        const response = await databases.createDocument(
            DATABASE_ID,
            BOOKS_COLLECTION_ID,
            ID.unique(),
            {
                ...book,
                createdAt: new Date().toISOString()
            }
        );
        return {
            id: response.$id,
            title: response.title,
            author: response.author,
            coverImageID: response.coverImageID,
            cover: response.cover,
            year: response.year,
            category: response.category,
            description: response.description,
            buyLink: response.buyLink || '',
           
        } as Book;
    } catch (error) {
        // console.error('Error creating book:');
        throw new Error('Failed to create book');
    }
};

export const updateBook = async (id: number, book: Partial<Book>): Promise<Book> => {
    try {
        const response = await databases.updateDocument(
            DATABASE_ID,
            BOOKS_COLLECTION_ID,
            id.toString(),
            {
                ...book,
                updatedAt: new Date().toISOString()
            }
        );
        return {
            id: response.$id,
            title: response.title,
            author: response.author,
            coverImageID: response.coverImageID,
            cover: response.cover,
            year: response.year,
            category: response.category,
            description: response.description,
            buyLink: response.buyLink || '',
            
        } as Book;
    } catch (error) {
        // console.error('Error updating book:');
        throw new Error('Failed to update book');
    }
};

export const deleteBook = async (id: number): Promise<void> => {
    try {
        await databases.deleteDocument(
            DATABASE_ID,
            BOOKS_COLLECTION_ID,
            id.toString()
        );
    } catch (error) {
        // console.error('Error deleting book:');
        throw new Error('Failed to delete book');
    }
};

// Additional utility functions
export const getBooksByCategory = async (category: string): Promise<Book[]> => {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            BOOKS_COLLECTION_ID,
            [Query.equal('category', category)]
        );
        return response.documents.map(doc => ({
            id: doc.$id,
            title: doc.title,
            author: doc.author,
            coverImageID: doc.coverImageID,
            cover: doc.cover,
            year: doc.year,
            category: doc.category,
            description: doc.description,
            buyLink: doc.buyLink || ''
        })) as Book[];
    } catch (error) {
        // console.error('Error fetching books by category:');
        throw new Error('Failed to fetch books by category');
    }
};

export const searchBooks = async (searchTerm: string): Promise<Book[]> => {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            BOOKS_COLLECTION_ID,
            [Query.search('title', searchTerm)]
        );
        return response.documents.map(doc => ({
            id: doc.$id,
            title: doc.title,
            author: doc.author,
            coverImageID: doc.coverImageID,
            cover: doc.cover,
            year: doc.year,
            category: doc.category,
            description: doc.description,
            buyLink: doc.buyLink || '',
            awards: doc.awards || []
        })) as Book[];
    } catch (error) {
        // console.error('Error searching books:');
        throw new Error('Failed to search books');
    }
};
  
  // // Contact form operations
  // export const submitContactForm = async (message: Omit<ContactMessage, 'id' | 'date'>): Promise<ContactMessage> => {
  //   // Implement contact form submission
  // export const getContactMessages = async (): Promise<ContactMessage[]> => {
  //   // Implement fetching contact messages
  //   return [];
  // };
  //   return {} as ContactMessage;
  // };



export const submitContactForm = async (message: Omit<ContactMessage, 'id' | 'date'>): Promise<ContactMessage> => {
    try {
        // Validate required fields
        if (!message.name || !message.email || !message.subject || !message.message) {
            throw new Error('All fields are required');
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(message.email)) {
            throw new Error('Invalid email format');
        }

        const contactMessage = {
            ...message,
            date: new Date().toISOString(),
            status: 'new' // Optional: track message status
        };

        const response = await databases.createDocument(
            DATABASE_ID,
            CONTACT_COLLECTION_ID,
            ID.unique(),
            contactMessage
        );

        // Optional: Trigger email notification here
        // await sendEmailNotification(response);

        return {
            id: response.$id,
            name: response.name,
            email: response.email,
            subject: response.subject,
            message: response.message,
            date: response.date,
            status: response.status
        } as ContactMessage;
    } catch (error) {
        // console.error('Error submitting contact form:');
        throw new Error('Failed to submit contact form');
    }
};

export const getContactMessages = async (
  limit: number = 50,
  offset: number = 0,
  status?: 'new' | 'read' | 'archived'
): Promise<ContactMessage[]> => {
  try {
      const queries: string[] = [
          Query.orderDesc('date'),
          Query.limit(limit),
          Query.offset(offset)
      ];

      if (status) {
          queries.push(Query.equal('status', status));
      }

      const response = await databases.listDocuments(
          DATABASE_ID,
          CONTACT_COLLECTION_ID,
          queries
      );

      return response.documents.map(doc => ({
          id: doc.$id,
          name: doc.name,
          email: doc.email,
          subject: doc.subject,
          message: doc.message,
          date: doc.date,
          status: doc.status
      })) as ContactMessage[];
  } catch (error) {
    //   console.error('Error fetching contact messages:');
      throw new Error('Failed to fetch contact messages');
  }
};

// Additional utility function for getting a single message
export const getContactMessageById = async (id: string): Promise<ContactMessage | null> => {
  try {
      const response = await databases.getDocument(
          DATABASE_ID,
          CONTACT_COLLECTION_ID,
          id
      );
      return {
          id: response.$id,
          name: response.name,
          email: response.email,
          subject: response.subject,
          message: response.message,
          date: response.date,
          status: response.status
      } as ContactMessage;
  } catch (error) {
    //   console.error('Error fetching contact message:');
      return null;
  }
};

// /////////////////////////////////////////
// / Image operations export const getImages = async (): Promise<Image[]> => { // Implement fetching images return []; };

// export const getImagesByCategory = async (category: string): Promise<Image[]> => { // Implement fetching images by category return []; };

// export const uploadImage = async (image: Omit<Image, 'id' | 'url'>): Promise<Image> => { // Implement image upload return {} as Image; };

// export const deleteImage = async (id: number): Promise<void> => { // Implement image deletion };


  
  // Image operations
  export const getImages = async (): Promise<Image[]> => {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            IMAGES_COLLECTION_ID,
            [Query.orderDesc('date')]
        );
        return response.documents.map(doc => ({
            id: doc.$id,
            url: doc.url,
            title: doc.title,
            category: doc.category,
            date: doc.date,
            description: doc.description
        })) as Image[];
    } catch (error) {
        // console.error('Error fetching images:');
        throw new Error('Failed to fetch images');
    }
};

export const getImagesByCategory = async (category: string): Promise<Image[]> => {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            IMAGES_COLLECTION_ID,
            [
                Query.equal('category', category),
                Query.orderDesc('date')
            ]
        );
        return response.documents.map(doc => ({
            id: doc.$id,
            url: doc.url,
            title: doc.title,
            category: doc.category,
            date: doc.date,
            description: doc.description
        })) as Image[];
    } catch (error) {
        // console.error('Error fetching images by category:');
        throw new Error('Failed to fetch images by category');
    }
};
  
  // Image operations
export const uploadImage = async (file: File, metadata: Omit<Image, 'id' | 'url'>): Promise<Image> => {
  try {
      // Upload file to storage
      const fileResponse = await storages.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          file
      );

      // Get file URL
      const fileUrl = storages.getFileView(IMAGES_BUCKET_ID, fileResponse.$id);

      // Create database entry
      const response = await databases.createDocument(
          DATABASE_ID,
          IMAGES_COLLECTION_ID,
          ID.unique(),
          {
              ...metadata,
              url: fileUrl,
              date: new Date().toISOString()
          }
      );

      return {
          id: response.$id,
          url: response.url,
          title: response.title,
          category: response.category,
          date: response.date,
          description: response.description
      } as Image;
  } catch (error) {
    //   console.error('Error uploading image:');
      throw new Error('Failed to upload image');
  }
};

export const deleteImage = async (id: number): Promise<void> => {
  try {
      // Get image document to find storage file ID
      const image = await databases.getDocument(
          DATABASE_ID,
          IMAGES_COLLECTION_ID,
          id.toString()
      ) as unknown as Image;

      // Delete from storage
      if (image.url) {
          const fileId = image.url.split('/').pop();
          if (fileId) {
              await storages.deleteFile(IMAGES_BUCKET_ID, fileId);
          }
      }

      // Delete database entry
      await databases.deleteDocument(
          DATABASE_ID,
          IMAGES_COLLECTION_ID,
          id.toString()
      );
  } catch (error) {
    //   console.error('Error deleting image:');
      throw new Error('Failed to delete image');
  }
};

// Search operations
export const searchContent = async (query: string): Promise<{
  blogs: BlogPost[];
  books: Book[];
  images: Image[];
}> => {
  try {
      const [blogs, books, images] = await Promise.all([
          databases.listDocuments(
              DATABASE_ID,
              BLOGS_COLLECTION_ID,
              [Query.search('title', query)]
          ),
          databases.listDocuments(
              DATABASE_ID,
              BOOKS_COLLECTION_ID,
              [Query.search('title', query)]
          ),
          databases.listDocuments(
              DATABASE_ID,
              IMAGES_COLLECTION_ID,
              [Query.search('title', query)]
          )
      ]);

      return {
          blogs: blogs.documents.map(doc => ({
              id: doc.$id,
              title: doc.title,
              excerpt: doc.excerpt,
              content: doc.content,
              date: doc.date,
              category: doc.category
          })) as BlogPost[],
          books: books.documents.map(doc => ({
              id: doc.$id,
              title: doc.title,
              author: doc.author,
              coverImageID: doc.coverImageID,
              cover: doc.cover,
              year: doc.year,
              category: doc.category,
              description: doc.description,
              buyLink: doc.buyLink || ''
          })) as Book[],
          images: images.documents.map(doc => ({
              id: doc.$id,
              url: doc.url,
              title: doc.title,
              category: doc.category,
              date: doc.date,
              description: doc.description
          })) as Image[]
      };
  } catch (error) {
    //   console.error('Error searching content:');
      throw new Error('Failed to search content');
  }
};

// Utility functions
export const updateImageMetadata = async (id: number, metadata: Partial<Image>): Promise<Image> => {
  try {
      const response = await databases.updateDocument(
          DATABASE_ID,
          IMAGES_COLLECTION_ID,
          id.toString(),
          metadata
      );
      return {
          id: response.$id,
          url: response.url,
          title: response.title,
          category: response.category,
          date: response.date,
          description: response.description
      } as Image;
  } catch (error) {
    //   console.error('Error updating image metadata:');
      throw new Error('Failed to update image metadata');
  }
};

export const getImageById = async (id: number): Promise<Image | null> => {
  try {
      const response = await databases.getDocument(
          DATABASE_ID,
          IMAGES_COLLECTION_ID,
          id.toString()
      );
      return {
          id: response.$id,
          url: response.url,
          title: response.title,
          category: response.category,
          date: response.date,
          description: response.description
      } as Image;
  } catch (error) {
    //   console.error('Error fetching image:');
      return null;
  }
};

export const getRecentImages = async (limit: number = 10): Promise<Image[]> => {
  try {
      const response = await databases.listDocuments(
          DATABASE_ID,
          IMAGES_COLLECTION_ID,
          [
              Query.orderDesc('date'),
              Query.limit(limit)
          ]
      );
      return response.documents.map(doc => ({
          id: doc.$id,
          url: doc.url,
          title: doc.title,
          category: doc.category,
          date: doc.date,
          description: doc.description
      })) as Image[];
  } catch (error) {
    //   console.error('Error fetching recent images:');
      throw new Error('Failed to fetch recent images');
  }
};


