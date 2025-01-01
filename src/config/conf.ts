// conf.ts
const conf = {
    appwriteEndpoint: String(import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1'),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DB_ID),
    appwriteBlogCollectionId: String(import.meta.env.VITE_APPWRITE_BLOGS_COLLECTION_ID),
    appwriteBookCollectionId: String(import.meta.env.VITE_APPWRITE_BOOKS_COLLECTION_ID),
    appwriteContactCollection: String(import.meta.env.VITE_APPWRITE_CONTACT_COLLECTION_ID),
    appwriteImageCollection: String(import.meta.env.VITE_APPWRITE_IMAGE_COLLECTION_ID),
    appwriteAuthorImageBucketId: String(import.meta.env.VITE_APPWRITE_AUTHOR_IMAGE_BUCKET_ID),
    appwriteBookCoverBucketId: String(import.meta.env.VITE_APPWRITE_COVER_IMAGE_BUCKET_ID),
    appwriteBlogImageBucketId: String(import.meta.env.VITE_APPWRITE_BLOG_IMAGE_BUCKET_ID),
    appwriteTinyMCEApiKey: String(import.meta.env.VITE_TINY_MCE_EDITOR_API_KEY),
    appwriteAdminTeamId: String(import.meta.env.VITE_APPWRITE_ADMIN_TEAM_ID),
};

// Validation
Object.entries(conf).forEach(([key, value]) => {
    if (!value) {
        console.error(`Missing configuration for ${key}`);
    }
});

export default conf;