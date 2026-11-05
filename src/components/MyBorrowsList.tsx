'use client';

import { authClient } from '@/lib/auth-client';
import { BorrowType } from '@/types';
import { toast } from '@heroui/react';
import { BookMarked } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export interface Props {
    books: BorrowType[];
}

export default function MyBorrowsList({ books }: Props) {
    const router = useRouter();

    const onReturn = async (bookId: string) => {
        try {
            const { data, error } = await authClient.token();

            if (error || !data?.token) {
                toast.danger('Authentication failed. Please login again.');
                return;
            }
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/delete-borrow/${bookId}`,
                {
                    method: 'DELETE',
                    headers: {
                        authorization: `Bearer ${data?.token}`,
                    },
                },
            );
            const returnBook = await res.json();
            console.log(returnBook);

            if (!res.ok) {
                throw new Error(returnBook.message || 'Failed to return book');
            }

            toast.success(returnBook.message);
            router.refresh();
        } catch (error) {
            console.log(error);
            toast.danger(
                error instanceof Error ? error.message : 'Something went wrong',
            );
        }
    };
    return (
        <section className="w-full">
            {books.length === 0 ? (
                <div className="space-y-4 rounded-3xl border border-stone-200 bg-white py-20 text-center">
                    <BookMarked size={48} className="mx-auto text-stone-300" />

                    <h3 className="text-xl font-bold text-stone-800">
                        No active borrows
                    </h3>

                    <p className="text-sm text-stone-500">
                        Explore our catalog and borrow a book for a few days.
                    </p>

                    <Link
                        href="/books"
                        className="inline-block rounded-xl bg-emerald-800 px-6 py-3 font-bold text-white shadow-md transition-colors hover:bg-emerald-900"
                    >
                        Browse Catalog
                    </Link>
                </div>
            ) : (
                <div className="w-full overflow-x-auto rounded-lg border border-stone-200 bg-[#072113e5]">
                    <table className="w-full min-w-[750px] text-left text-sm text-gray-200">
                        <thead className="border-b border-white/10 text-gray-300">
                            <tr>
                                <th className="px-5 py-4 font-medium">Image</th>
                                <th className="px-5 py-4 font-medium">Title</th>
                                <th className="px-5 py-4 font-medium">
                                    Author
                                </th>
                                <th className="px-5 py-4 font-medium">
                                    Borrow Date
                                </th>
                                <th className="px-5 py-4 text-right font-medium">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {books.map((book) => (
                                <tr
                                    key={book._id}
                                    className="border-b border-white/5 transition hover:bg-white/5 last:border-0"
                                >
                                    <td className="px-5 py-3">
                                        <Image
                                            src={book.cover}
                                            alt={book.title}
                                            width={42}
                                            height={54}
                                            className="h-[54px] w-[42px] rounded object-cover"
                                        />
                                    </td>

                                    <td className="px-5 py-3 font-medium">
                                        {book.title}
                                    </td>

                                    <td className="px-5 py-3 text-gray-300">
                                        {book.author}
                                    </td>

                                    <td className="px-5 py-3 text-gray-300">
                                        {new Date(
                                            book.borrowDate,
                                        ).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </td>

                                    <td className="px-5 py-3 text-right">
                                        <button
                                            type="button"
                                            onClick={() => onReturn(book?._id)}
                                            className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white transition hover:bg-emerald-600 cursor-pointer"
                                        >
                                            Return Book
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}
