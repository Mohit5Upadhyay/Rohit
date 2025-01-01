// types.ts
export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    category: string;
    imageUrl: string;
}

export interface Book {
    id: string;
    title: string;
    coverImageID: string;
    year: string;
    category: string;
    description: string;
    buyLink: string;
    awards?: string[];
}

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status:'new' | 'read' | 'archived';
}

export interface Image {
    id: string;
    url: string;
    title: string;
    category: string;
    date: string;
    description: string;
}