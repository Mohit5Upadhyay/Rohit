





// // src/services/newsletter.service.ts
// import { Client, Databases, Functions, Query } from 'appwrite';
// import conf from '../config/conf';

// export interface NewsletterSubscription {
//     email: string;
//     subscribedAt: string;
// }
  
// export interface NewsletterResponse {
//     success: boolean;
//     message: string;
//     error?: string;
// }

// class NewsletterService {
//   private client: Client;
//   private databases: Databases;
//   private functions: Functions;

//   constructor() {
//     this.client = new Client()
//       .setEndpoint(conf.appwriteEndpoint)
//       .setProject(conf.appwriteProjectId);

//     this.databases = new Databases(this.client);
//     this.functions = new Functions(this.client);
//   }

//   private async checkExistingSubscription(email: string): Promise<boolean> {
//     const existingSubscriber = await this.databases.listDocuments(
//       conf.appwriteDatabaseId,
//       conf.appwriteNewsletterCollectionId,
//       [Query.equal('email', email)]
//     );
//     return existingSubscriber.documents.length > 0;
//   }

//   async subscribe(email: string): Promise<NewsletterResponse> {
//     try {
//       // Check for existing subscription
//       const exists = await this.checkExistingSubscription(email);
//       if (exists) {
//         return {
//           success: false,
//           message: 'Email already subscribed to the newsletter.'
//         };
//       }

//       // Save to newsletter collection
//       await this.databases.createDocument(
//         conf.appwriteDatabaseId,
//         conf.appwriteNewsletterCollectionId,
//         'unique()',
//         {
//           email,
//           subscribedAt: new Date().toISOString()
//         }
//       );

//       // Execute newsletter function
//       await this.functions.createExecution(
//         conf.appwriteNewsletterFunctionId,
//         JSON.stringify({ email })
//       );

//       return {
//         success: true,
//         message: 'Successfully subscribed to newsletter!'
//       };
//     } catch (error) {
//       console.error('Newsletter subscription failed:', error);
//       return {
//         success: false,
//         message: 'Failed to subscribe',
//         error: error instanceof Error ? error.message : 'Unknown error'
//       };
//     }
//   }

//   async notifySubscribers(subject: string, content: string): Promise<NewsletterResponse> {
//     try {
//       await this.functions.createExecution(
//         conf.appwriteNewsletterFunctionId,
//         JSON.stringify({ subject, content })
//       );

//       return {
//         success: true,
//         message: 'Newsletter sent successfully!'
//       };
//     } catch (error) {
//       console.error('Newsletter sending failed:', error);
//       return {
//         success: false,
//         message: 'Failed to send newsletter',
//         error: error instanceof Error ? error.message : 'Unknown error'
//       };
//     }
//   }
// }

// export const newsletterService = new NewsletterService();
















// src/services/newsletter.service.ts
import { Client, Databases, Functions, Query } from 'appwrite';
import conf from '../config/conf';

export interface NewsletterSubscription {
    email: string;
    subscribedAt: string;
}

export interface NewsletterResponse {
    success: boolean;
    message: string;
    error?: string;
}

class NewsletterService {
    private client: Client;
    private databases: Databases;
    private functions: Functions;

    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appwriteEndpoint)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.functions = new Functions(this.client);
        this.validateConfig();
    }

    private validateConfig() {
        if (!conf.appwriteNewsletterCollectionId) {
            throw new Error('Newsletter collection ID is not configured');
        }
    }

    private async checkExistingSubscription(email: string): Promise<boolean> {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteNewsletterCollectionId,
                [Query.equal('email', email)]
            );
            return response.documents.length > 0;
        } catch (error) {
            console.error('Error checking subscription:', error);
            throw error;
        }
    }

    async subscribe(email: string): Promise<NewsletterResponse> {
        try {
            const exists = await this.checkExistingSubscription(email);
            if (exists) {
                return {
                    success: false,
                    message: 'Email already subscribed to newsletter'
                };
            }

            await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteNewsletterCollectionId,
                'unique()',
                {
                    email,
                    subscribedAt: new Date().toISOString()
                }
            );

            await this.functions.createExecution(
                conf.appwriteNewsletterFunctionId,
                JSON.stringify({ email })
            );

            return {
                success: true,
                message: 'Successfully subscribed to newsletter!'
            };
        } catch (error) {
            console.error('Newsletter subscription failed:', error);
            return {
                success: false,
                message: 'Failed to subscribe',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }
}

export const newsletterService = new NewsletterService();








