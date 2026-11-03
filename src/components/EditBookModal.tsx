'use client';

import { authClient } from '@/lib/auth-client';
import { BookType } from '@/types';
import { toast } from '@heroui/react';
import { X, BookOpen, Save, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface EditBookModalProps {
    book: BookType;
    isOpen: boolean;
    onClose: () => void;
}

const EditBookModal = ({ book, isOpen, onClose }: EditBookModalProps) => {
    const router = useRouter();
    const [isUpdating, setIsUpdating] = useState(false);

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const bookData = Object.fromEntries(
            formData.entries(),
        ) as unknown as BookType;

        const updatedData = {
            ...bookData,
            rating: Number(bookData.rating),
            copies: Number(bookData.copies),
        };

        try {
            setIsUpdating(true);

            const { data, error } = await authClient.token();

            if (error || !data?.token) {
                toast.danger('Authentication failed. Please login again.');
                return;
            }
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/update-book/${book._id}`,
                {
                    method: 'PUT',
                    headers: {
                        authorization: `Bearer ${data?.token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedData),
                },
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to update book');
            }

            toast.success('Book updated successfully!', {
                description: `"${updatedData?.title}" has been updated.`,
            });

            onClose();
            router.refresh();
        } catch (error) {
            toast.danger(
                error instanceof Error
                    ? error.message
                    : 'Failed to update book.',
            );
        } finally {
            setIsUpdating(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-100 bg-white px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-emerald-100 p-3 text-emerald-800">
                            <BookOpen size={22} />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-stone-800">
                                Edit Book
                            </h2>
                            <p className="text-sm text-stone-500">
                                Update your book information
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isUpdating}
                        className="rounded-full bg-stone-100 p-2 text-stone-600 transition hover:bg-rose-100 hover:text-rose-600"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6 p-6">
                    {/* Title & Author */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                                Book Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                defaultValue={book.title}
                                required
                                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-700"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                                Author Name
                            </label>
                            <input
                                type="text"
                                name="author"
                                defaultValue={book.author}
                                required
                                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-700"
                            />
                        </div>
                    </div>

                    {/* Category, Rating, Copies */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                                Category
                            </label>

                            <select
                                name="category"
                                defaultValue={book.category}
                                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-3 text-sm outline-none focus:border-emerald-700"
                            >
                                {[
                                    'Fiction',
                                    'Sci-Fi',
                                    'Self-Help',
                                    'Biography',
                                    'Mystery',
                                    'History',
                                ].map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                                Rating
                            </label>

                            <input
                                type="number"
                                name="rating"
                                step="0.1"
                                min="1"
                                max="5"
                                defaultValue={book.rating}
                                required
                                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-3 text-sm outline-none focus:border-emerald-700"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                                Copies
                            </label>

                            <input
                                type="number"
                                name="copies"
                                defaultValue={book.copies}
                                required
                                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-3 text-sm outline-none focus:border-emerald-700"
                            />
                        </div>
                    </div>

                    {/* Cover */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                            Cover Image URL
                        </label>

                        <input
                            type="url"
                            name="cover"
                            defaultValue={book.cover}
                            required
                            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-emerald-700"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                            Description
                        </label>

                        <textarea
                            name="description"
                            rows={5}
                            defaultValue={book.description}
                            required
                            className="w-full resize-none rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-emerald-700"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col-reverse gap-3 border-t border-stone-100 pt-5 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isUpdating}
                            className="rounded-xl border border-stone-200 px-6 py-3 text-sm font-semibold text-stone-600 transition hover:bg-stone-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-800 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-800/20 transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isUpdating ? (
                                <>
                                    <Loader2
                                        size={17}
                                        className="animate-spin"
                                    />
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <Save size={17} />
                                    Update Book
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBookModal;
