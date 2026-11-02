'use server';

import { auth } from '@/lib/auth';
import { BookType } from '@/types';
import { headers } from 'next/headers';

export const MyBooksList = async ({
    userId,
}: {
    userId: string;
}): Promise<BookType[]> => {
    const jwtToken = await auth.api.getToken({
        headers: await headers(),
    });

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/my-books/${userId}`,
        {
            headers: {
                authorization: `Bearer ${jwtToken?.token}`,
            },
        },
    );

    if (!res.ok) {
        throw new Error('Failed to fetch books');
    }

    const books = await res.json();
    return books;
};
