'use server';

import { BorrowType } from '@/types';

export const getAllBorrow = async (userId: string): Promise<BorrowType[]> => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/all-borrow/${userId}`,
            {
                method: 'GET',
                cache: 'no-store',
            },
        );

        if (!response.ok) {
            throw new Error('Failed to fetch borrowed books');
        }

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
