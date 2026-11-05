'use server';

import { BookType } from '@/types';
import { notFound } from 'next/navigation';

export const getAllBooks = async (): Promise<BookType[]> => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

        if (!baseUrl) {
            throw new Error('BACKEND_URL is not configured');
        }

        const res = await fetch(`${baseUrl}/all-books`, {
            cache: 'no-store',
        });

        if (res.status === 404) {
            notFound();
        }

        if (!res.ok) {
            throw new Error(`Failed to fetch books: ${res.status}`);
        }

        const books: BookType[] = await res.json();

        return books;
    } catch (error) {
        console.error('Get All Books Error:', error);
        throw error;
    }
};
