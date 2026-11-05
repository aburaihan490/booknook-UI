'use server';

import { auth } from '@/lib/auth';
import { BorrowType } from '@/types';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

export const getAllBorrow = async (): Promise<BorrowType[]> => {
    const jwtToken = await auth.api.getToken({
        headers: await headers(),
    });
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/all-borrow`,
            {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${jwtToken?.token}`,
                },
            },
        );

        if (!response.ok) notFound();

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || 'Something went wrong');
        }

        return result.data;
    } catch (error) {
        console.error('Get All Borrow Error:', error);
        throw error;
    }
};
