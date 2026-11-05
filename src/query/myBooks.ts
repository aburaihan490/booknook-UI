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

    if (!jwtToken?.token) {
        throw new Error('No JWT token. Check that the jwt plugin is enabled.');
    }

    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
    if (!baseUrl) {
        throw new Error('BACKEND_BASE_URL is not set');
    }

    const res = await fetch(`${baseUrl}/my-books/${userId}`, {
        headers: {
            authorization: `Bearer ${jwtToken.token}`,
        },
    });

    if (!res.ok) {
        const body = await res.text();
        throw new Error(
            `Failed to fetch books: ${res.status} ${res.statusText} ${body}`,
        );
    }

    const books = await res.json();
    if (!Array.isArray(books)) {
        throw new Error('Expected an array of books from backend');
    }

    return books;
};
