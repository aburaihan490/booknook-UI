'use client';

interface CategoryFilterProps {
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

const categories = [
    'All',
    'Fiction',
    'Sci-Fi',
    'Self-Help',
    'Biography',
    'Mystery',
    'History',
];

export default function CategoryFilter({
    selectedCategory,
    setSelectedCategory,
}: CategoryFilterProps) {
    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
                        selectedCategory === cat
                            ? 'bg-emerald-800 text-white shadow-md shadow-emerald-800/20'
                            : 'bg-white text-stone-700 border border-stone-200 hover:border-emerald-600'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}
