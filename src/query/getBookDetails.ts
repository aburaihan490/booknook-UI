'use server';
import { auth } from '@/lib/auth';
import { BookType } from '@/types';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

export const getBookDetails = async (bookId: string): Promise<BookType> => {
    const jwtToken = await auth.api.getToken({
        headers: await headers(),
    }); // Get the token from auth.api.getToken()

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/book/${bookId}`,
            {
                headers: {
                    authorization: `Bearer ${jwtToken?.token}`,
                },
                cache: 'no-store',
            },
        );

        const data = await response.json();

        if (!response.ok) notFound();

        return data.book ?? data;
    } catch (error) {
        console.error('Error fetching book details:', error);
        throw error;
    }
};
