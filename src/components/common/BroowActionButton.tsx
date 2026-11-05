'use client';
import { authClient } from '@/lib/auth-client';
import { toast } from '@heroui/react';
import { BookOpen, Loader2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
    isAvailable?: boolean;
    big: boolean;
    copies: number;
    bookId: string;
}

const BroowActionButton = ({ isAvailable, big, copies, bookId }: Props) => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { data: currentUser } = authClient.useSession();
    currentUser?.user.name;
    // Open popup
    const handleBorrowClick = () => {
        setIsModalOpen(true);
    };

    // add borrow function emplements
    const handleBorrow = async () => {
        if (isLoading) return;

        try {
            setIsLoading(true);

            const { data, error } = await authClient.token();

            if (error || !data?.token) {
                toast.danger('Please login to borrow this book.');
                setIsModalOpen(false);
                router.push('/login');
                return;
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/add-borrow/${bookId}`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${data.token}`,
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

            setIsModalOpen(false);
            router.refresh();
        } catch (error) {
            console.error('Borrow error:', error);
            toast.danger('Something went wrong!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {big ? (
                <button
                    type="button"
                    onClick={handleBorrowClick}
                    disabled={!isAvailable}
                    className="w-full rounded-2xl bg-emerald-800 px-6 py-4 text-base font-bold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none cursor-pointer"
                >
                    {isAvailable ? 'Borrow Book Now' : 'Book Unavailable'}
                </button>
            ) : (
                <button
                    type="button"
                    disabled={copies <= 0}
                    onClick={handleBorrowClick}
                    className="py-2.5 bg-emerald-800 hover:bg-emerald-900 disabled:bg-stone-300 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                >
                    {copies > 0 ? 'Borrow' : 'Unavailable'}
                </button>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                        {/* Close Button */}
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            disabled={isLoading}
                            className="absolute right-4 top-4 text-stone-400 hover:text-stone-700 disabled:opacity-50"
                        >
                            <X size={22} />
                        </button>

                        {/* Icon */}
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                            <BookOpen size={30} className="text-emerald-800" />
                        </div>

                        {/* Content */}
                        <div className="text-center space-y-2">
                            <h2 className="text-xl font-bold text-stone-900">
                                Confirm Borrow?
                            </h2>

                            <p className="text-sm text-stone-500">
                                Are you sure you want to borrow this book?
                            </p>

                            <p className="text-xs text-stone-400">
                                Available copies: {copies}
                            </p>
                        </div>

                        {/* Form Fields */}
                        {/* User Information */}
                        <div className="mt-6 space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                                    Your Name
                                </label>

                                <input
                                    type="text"
                                    value={currentUser?.user.name}
                                    readOnly
                                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-600 outline-none cursor-not-allowed"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                                    Your Email
                                </label>

                                <input
                                    type="email"
                                    value={currentUser?.user.email}
                                    readOnly
                                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-600 outline-none cursor-not-allowed"
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-7 flex gap-3">
                            <button
                                type="button"
                                disabled={isLoading}
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 rounded-xl border border-stone-200 py-3 font-semibold text-stone-600 hover:bg-stone-50 disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleBorrow}
                                disabled={isLoading}
                                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-800 py-3 font-semibold text-white hover:bg-emerald-900 disabled:opacity-60"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2
                                            size={18}
                                            className="animate-spin"
                                        />
                                        Borrowing...
                                    </>
                                ) : (
                                    'Confirm Borrow'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BroowActionButton;
