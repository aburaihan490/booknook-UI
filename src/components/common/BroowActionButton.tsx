'use client';
import { authClient } from '@/lib/auth-client';
import { toast } from '@heroui/react';
import { useRouter } from 'next/navigation';

interface Props {
    isAvailable?: boolean;
    big: boolean;
    copies: number;
    bookId: string;
}

const BroowActionButton = ({ isAvailable, big, copies, bookId }: Props) => {
    const router = useRouter();

    // add borrow function emplements
    const handleBorrow = async () => {
        try {
            // Get JWT token from Better Auth
            const { data, error } = await authClient.token();

            if (error || !data?.token) {
                toast.danger('Please login to borrow this book.');
                router.push('/login');
                return;
            }
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/add-borrow/${bookId}`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${data?.token}`,
                        'Content-Type': 'application/json',
                    },
                },
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                toast.danger(result.message || 'Failed to borrow book');
                return;
            }

            toast.success('Book borrowed successfully!');

            router.refresh();
        } catch (error) {
            console.error('Borrow error:', error);
            toast.danger('Something went wrong!');
        }
    };
    return (
        <>
            {big ? (
                <button
                    type="button"
                    onClick={handleBorrow}
                    disabled={!isAvailable}
                    className="w-full rounded-2xl bg-emerald-800 px-6 py-4 text-base font-bold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none cursor-pointer"
                >
                    {isAvailable ? 'Borrow Book Now' : 'Book Unavailable'}
                </button>
            ) : (
                <button
                    type="button"
                    disabled={copies <= 0}
                    onClick={handleBorrow}
                    className="py-2.5 bg-emerald-800 hover:bg-emerald-900 disabled:bg-stone-300 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                >
                    {copies > 0 ? 'Borrow' : 'Unavailable'}
                </button>
            )}
        </>
    );
};

export default BroowActionButton;
