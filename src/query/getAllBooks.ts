'use server';

import { BookType } from '@/types';
import { cacheLife } from 'next/cache';

export const getAllBooks = async (): Promise<BookType[]> => {
    'use cache';
    cacheLife('hours');
    const res = await fetch(`${process.env.BACKEND_URL}/all-books`);
    if (!res.ok) {
        throw new Error('Failed to fetch books');
    }
    const books = await res.json();
    return books;
};
