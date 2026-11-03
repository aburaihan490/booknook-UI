'use server';

import { BookType } from '@/types';
import { notFound } from 'next/navigation';

export const getAllBooks = async (): Promise<BookType[]> => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/all-books`,
    );
    if (!res.ok) notFound();
    const books = await res.json();
    return books;
};
