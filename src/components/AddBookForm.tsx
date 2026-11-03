'use client';
import { authClient } from '@/lib/auth-client';
import { toast } from '@heroui/react';

const AddBookForm = () => {
    const { data: session } = authClient.useSession();

    const userId = session?.user?.id;

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const bookData = Object.fromEntries(formData.entries());

        const AddData = {
            ...bookData,
            userId,
            rating: Number(bookData.rating),
            copies: Number(bookData.copies),
        };

        try {
            const { data, error } = await authClient.token();
            if (error || !data?.token) {
                toast.danger('Network error', {
                    description: `${error?.message} || Unauthorized access. Please log in again.`,
                });
            }
            const jwtToken = data?.token;

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/add-book`,
                {
                    method: 'POST',
                    headers: {
                        authorization: `Bearer ${jwtToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(AddData),
                },
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to add book');
            } else {
                toast.success('Book added successfully!', {
                    description: `"${bookData.title || 'Book'}" has been added to your library.`,
                });
            }

            form.reset();
        } catch (error) {
            toast.danger('Network error', {
                description:
                    'Could not reach the server. Please try again later.',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title and Author */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                        Book Title *
                    </label>

                    <input
                        type="text"
                        name="title"
                        placeholder="e.g. The Great Gatsby"
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-emerald-700"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                        Author Name *
                    </label>

                    <input
                        type="text"
                        name="author"
                        placeholder="e.g. F. Scott Fitzgerald"
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-emerald-700"
                        required
                    />
                </div>
            </div>

            {/* Category, Rating and Copies */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                        Category
                    </label>

                    <select
                        name="category"
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-emerald-700"
                    >
                        <option value="Fiction">Fiction</option>
                        <option value="Sci-Fi">Sci-Fi</option>
                        <option value="Self-Help">Self-Help</option>
                        <option value="Biography">Biography</option>
                        <option value="Mystery">Mystery</option>
                        <option value="History">History</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                        Rating (1 - 5)
                    </label>

                    <input
                        type="number"
                        name="rating"
                        step="0.1"
                        min="1"
                        max="5"
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-emerald-700"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                        Copies Available
                    </label>

                    <input
                        type="number"
                        name="copies"
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-emerald-700"
                        required
                    />
                </div>
            </div>

            {/* Cover Image */}
            <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Cover Image URL *
                </label>

                <input
                    type="url"
                    name="cover"
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-emerald-700"
                    required
                />
            </div>

            {/* Description */}
            <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Book Description *
                </label>

                <textarea
                    name="description"
                    rows={4}
                    placeholder="Provide a compelling summary of the book..."
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-emerald-700"
                    required
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full py-4 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-2xl shadow-xl shadow-emerald-800/20 transition-all hover:scale-[1.01]"
            >
                Add Book to Catalog
            </button>
        </form>
    );
};

export default AddBookForm;
