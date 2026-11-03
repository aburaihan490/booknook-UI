'use client';

import { BookMarked } from 'lucide-react';
import Image from 'next/image';

export interface BorrowedBook {
    _id: string;
    title: string;
    cover: string;
    borrowDate: string;
    returnDate: string;
}
const books: BorrowedBook[] = [
    {
        _id: '1',
        title: 'Pride and Prejudice',
        cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f',
        borrowDate: '2026-10-29',
        returnDate: '2026-11-05',
    },
];

export default function MyBorrowsList() {
    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });

    return (
        <section className="">
            <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 space-y-4">
                <BookMarked size={48} className="mx-auto text-stone-300" />
                <h3 className="text-xl font-bold text-stone-800">
                    No active borrows
                </h3>
                <p className="text-sm text-stone-500">
                    Explore our catalog and borrow a book for a few days.
                </p>
                <button className="px-6 py-3 bg-emerald-800 text-white font-bold rounded-xl shadow-md hover:bg-emerald-900 transition-colors">
                    Browse Catalog
                </button>
            </div>
            {/* Borrow Card */}
            <div className="w-full overflow-x-auto rounded-lg border border-white/10 bg-[#19241e]">
                <table className="w-full min-w-[750px] text-left text-sm text-gray-200">
                    <thead className="border-b border-white/10 text-gray-300">
                        <tr>
                            <th className="px-5 py-3 font-medium">Image</th>
                            <th className="px-5 py-3 font-medium">Title</th>
                            <th className="px-5 py-3 font-medium">
                                Borrow Date
                            </th>
                            <th className="px-5 py-3 font-medium">
                                Return Date
                            </th>
                            <th className="px-5 py-3 text-right font-medium">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {books.length > 0 ? (
                            books.map((book) => (
                                <tr
                                    key={book._id}
                                    className="border-b border-white/5 transition hover:bg-white/5 last:border-0"
                                >
                                    <td className="px-5 py-2">
                                        <Image
                                            src={book.cover}
                                            alt={book.title}
                                            width={42}
                                            height={54}
                                            className="h-[54px] w-[42px] rounded object-cover"
                                        />
                                    </td>

                                    <td className="px-5 py-2 font-medium">
                                        {book.title}
                                    </td>

                                    <td className="px-5 py-2 text-gray-300">
                                        {new Date(
                                            book.borrowDate,
                                        ).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </td>

                                    <td className="px-5 py-2 text-gray-300">
                                        {new Date(
                                            book.returnDate,
                                        ).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </td>

                                    <td className="px-5 py-2 text-right">
                                        <button
                                            // onClick={() => onReturn(book._id)}
                                            className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white transition hover:bg-emerald-600"
                                        >
                                            Return Book
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="py-10 text-center text-gray-400"
                                >
                                    You haven&apos;t borrowed any books yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
