'use client';
import { BookType } from '@/types';
import { BookOpen, Layers, Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';

const MyBookList = ({ book }: { book: BookType }) => {
    return (
        <div>
            <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl ">
                {/* Top Accent */}
                <div className="h-1.5 bg-linear-to-r from-emerald-600 via-emerald-500 to-orange-400" />

                <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center">
                    {/* Book Cover */}
                    <div className="relative h-36 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 shadow-md">
                        <Image
                            src={book.cover}
                            alt={book.title}
                            fill
                            unoptimized
                            sizes="96px"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>

                    {/* Book Information */}
                    <div className="min-w-0 flex-1">
                        <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                            <BookOpen size={13} />
                            Book Collection
                        </span>

                        <h3 className="truncate text-lg font-bold text-slate-800">
                            {book.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            By {book.author}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-2">
                            <span className="rounded-lg bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-600">
                                {book.category}
                            </span>

                            <span className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                                <Layers size={13} />
                                {book.copies} Copies
                            </span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex shrink-0 items-center gap-y-4 sm:flex-col sm:items-stretch">
                        <button
                            // onClick={() => onEdit(book)}
                            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-800 px-4 py-2.5 text-sm font-semibold cursor-pointer text-white transition hover:bg-emerald-900 active:scale-95"
                        >
                            <Pencil size={15} />
                            Edit
                        </button>

                        <button
                            // onClick={() => onDelete(book._id)}
                            className="flex items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold cursor-pointer text-rose-600 transition hover:bg-rose-100 active:scale-95"
                        >
                            <Trash2 size={15} />
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyBookList;
