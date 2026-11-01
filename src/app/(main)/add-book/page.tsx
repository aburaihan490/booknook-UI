'use client';
import { toast } from '@heroui/react';
// Book Type
interface Book {
    id: number;
    title: string;
    author: string;
    category: string;
    cover: string;
    rating: number;
    description: string;
    copies: number;
    addedBy: string;
}

const AddBookView = () => {
    // Form Submit Handler
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const bookData = Object.fromEntries(formData.entries());

        console.log(bookData);
        try {
            const response = await fetch('/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookData),
            });

            if (response.ok) {
                toast.success('Book added successfully!', {
                    description: `"${bookData.title || 'Book'}" has been added to your library.`,
                });
                e.currentTarget.reset();
            } else {
                toast.danger('Failed to add book', {
                    description: 'Please check your details and try again.',
                });
            }
        } catch (error) {
            toast.danger('Network error', {
                description:
                    'Could not reach the server. Please try again later.',
            });
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <div className="bg-white rounded-3xl border border-stone-200 shadow-xl p-8 sm:p-12 space-y-8">
                {/* Header */}
                <div>
                    <span className="text-emerald-800 font-bold tracking-widest text-xs uppercase bg-emerald-100 px-3 py-1 rounded-md">
                        Contribution
                    </span>

                    <h1 className="text-3xl font-black text-stone-900 mt-2 tracking-tight">
                        Add a New Book
                    </h1>

                    <p className="text-sm text-stone-600 mt-1">
                        Contribute a book to the BookNook community library.
                    </p>
                </div>

                {/* Form */}
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
                                min="1"
                                max="20"
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
            </div>
        </div>
    );
};

export default AddBookView;
