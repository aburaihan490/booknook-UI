import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star } from 'lucide-react';
import { getBookDetails } from '@/query/getBookDetails';
import BroowActionButton from '@/components/common/BroowActionButton';

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'BookNook | Book Details',
};

export default async function BookDetails({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const book = await getBookDetails(id);

    const isAvailable = book.copies > 0;

    return (
        <main className="min-h-screen bg-[#fafaf9] px-4 py-8">
            <div className="mx-auto max-w-5xl">
                {/* Back Button */}
                <Link
                    href="/books"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 transition hover:text-emerald-600"
                >
                    <ArrowLeft size={17} />
                    Back to All Books
                </Link>

                {/* Book Details Card */}
                <div className="grid gap-8 rounded-3xl border border-gray-200 bg-white p-5 shadow-xl md:grid-cols-[minmax(280px,355px)_1fr] md:gap-8 md:p-12">
                    {/* Book Cover */}
                    <div className="relative h-107.5 overflow-hidden rounded-2xl bg-gray-100 shadow-lg sm:h-125 md:h-133">
                        <Image
                            src={book.cover}
                            alt={book.title}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 355px"
                            className="object-cover"
                        />
                    </div>

                    {/* Book Information */}
                    <div className="flex min-w-0 flex-col">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="rounded-md bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                                {book.category}
                            </span>

                            <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                                <Star size={13} fill="currentColor" />
                                {book.rating} Rating
                            </span>
                        </div>

                        <h1 className="mt-4 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
                            {book.title}
                        </h1>

                        <p className="mt-4 text-base font-medium text-gray-700">
                            Author:{' '}
                            <span className="font-semibold">{book.author}</span>
                        </p>

                        <p className="mt-6 text-sm leading-7 text-gray-600 sm:text-base">
                            {book.description}
                        </p>

                        {/* Availability Status */}
                        <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                            <p className="text-xs font-bold uppercase tracking-wide text-gray-700">
                                Availability Status
                            </p>

                            <p
                                className={`mt-2 text-sm font-bold ${
                                    isAvailable
                                        ? 'text-emerald-700'
                                        : 'text-red-600'
                                }`}
                            >
                                {isAvailable
                                    ? `${book.copies} Copies available in library inventory`
                                    : 'Currently unavailable'}
                            </p>
                        </div>

                        {/* Borrow Button */}
                        <div className="mt-auto pt-10">
                            <div className="mb-6 border-t border-gray-100" />
                            <BroowActionButton
                                big={true}
                                copies={book?.copies}
                                isAvailable={isAvailable}
                                bookId={id}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
