import { auth } from '@/lib/auth';
import { BorrowType } from '@/types';
import { headers } from 'next/headers';

export const getAllBorrow = async (): Promise<BorrowType[]> => {
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

    const response = await fetch(`${baseUrl}/all-borrow`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${jwtToken.token}`,
        },
    });

    if (!response.ok) {
        const body = await response.text();
        throw new Error(`Failed to fetch borrows: ${response.status} ${body}`);
    }

    const result = await response.json();

    // Accept either a plain array or { success, data }
    if (Array.isArray(result)) return result;
    if (!result.success) {
        throw new Error(result.message || 'Something went wrong');
    }
    if (!Array.isArray(result.data)) {
        throw new Error('Expected an array of borrows in result.data');
    }
    return result.data;
};
