'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import CategoryFilter from './CategoryFilter';
import BookSearch from './BookSearch';
import Image from 'next/image';
import { BookType } from '@/types';
import { Star, BookOpen } from 'lucide-react';
interface AllBooksViewProps {
    books: BookType[];
}

export default function AllBooksView({ books }: AllBooksViewProps) {
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredBooks = useMemo(() => {
        return books.filter((book) => {
            const matchesSearch =
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory =
                selectedCategory === 'All' ||
                book.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [books, searchTerm, selectedCategory]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
            {/* Header & Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-black text-stone-900">
                        Explore All Books
                    </h1>

                    <p className="text-sm text-stone-600 mt-1">
                        Find your next great read.
                    </p>
                </div>

                <BookSearch
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
            </div>
            {/* Category Filter */}
            <CategoryFilter
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
            {/* Books Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredBooks.map((book) => (
                    <div
                        key={book._id}
                        className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                    >
                        {/* Book Cover */}
                        <div className="relative h-64 overflow-hidden bg-stone-100">
                            <Image
                                width={550}
                                height={500}
                                src={book.cover}
                                alt={book.title}
                                loading="eager"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />

                            {/* Category */}
                            <span className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                                {book.category}
                            </span>

                            {/* Rating */}
                            <span className="absolute top-3 right-3 bg-amber-400 text-stone-950 font-bold text-xs px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                                <Star size={12} className="fill-current" />
                                {book.rating}
                            </span>
                        </div>

                        {/* Book Information */}
                        <div className="p-5 flex flex-col grow justify-between space-y-4">
                            <div>
                                <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors line-clamp-1">
                                    {book.title}
                                </h3>

                                <p className="text-xs text-stone-500 font-medium mt-1">
                                    By {book.author}
                                </p>
                            </div>

                            {/* Available Copies */}
                            <div className="space-y-3 pt-3 border-t border-stone-100">
                                <div className="flex items-center gap-x-2 text-xs font-semibold text-stone-600">
                                    <span className="flex items-center gap-1">
                                        <BookOpen size={14} />
                                        Available Copies:
                                    </span>

                                    <span className="text-emerald-700 font-bold">
                                        {book.copies}
                                    </span>
                                </div>

                                {/* Buttons */}
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() =>
                                            router.push(`/books/${book._id}`)
                                        }
                                        className="py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition-colors"
                                    >
                                        Details
                                    </button>

                                    <button
                                        onClick={() =>
                                            router.push(`/books/${book._id}`)
                                        }
                                        disabled={book.copies <= 0}
                                        className="py-2.5 bg-emerald-800 hover:bg-emerald-900 disabled:bg-stone-300 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl shadow-md transition-all"
                                    >
                                        {book.copies > 0
                                            ? 'Borrow'
                                            : 'Unavailable'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {filteredBooks.length === 0 && (
                <p className="text-center py-16 text-gray-500">
                    No books found.
                </p>
            )}
        </div>
    );
}
