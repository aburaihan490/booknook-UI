'use server';

import { BookType } from '@/types';

export const getAllBooks = async (): Promise<BookType[]> => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

        if (!baseUrl) {
            throw new Error('BACKEND_URL is not configured');
        }

        const res = await fetch(`${baseUrl}/all-books`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch books: ${res.status}`);
        }

        const data = await res.json();

        // Backend যদি সরাসরি Array পাঠায়
        if (Array.isArray(data)) {
            return data;
        }

        // Backend যদি { success, books } পাঠায়
        if (Array.isArray(data.books)) {
            return data.books;
        }

        throw new Error('Invalid books API response');
    } catch (error) {
        console.error('Get All Books Error:', error);
        throw error;
    }
};
