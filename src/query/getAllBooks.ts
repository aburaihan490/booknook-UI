'use server';

import { BookType } from '@/types';

export const getAllBooks = async (): Promise<BookType[]> => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/all-books`,
    );
    if (!res.ok) {
        throw new Error('Failed to fetch books');
    }
    const books = await res.json();
    return books;
};
