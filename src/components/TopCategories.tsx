const categories = [
    {
        name: 'Fiction',
        count: '1,240 Books',
        icon: '📖',
        color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
        name: 'Sci-Fi',
        count: '850 Books',
        icon: '🚀',
        color: 'bg-blue-50 text-blue-800 border-blue-200',
    },
    {
        name: 'Self-Help',
        count: '610 Books',
        icon: '🌱',
        color: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
        name: 'Biography',
        count: '430 Books',
        icon: '✍️',
        color: 'bg-purple-50 text-purple-800 border-purple-200',
    },
    {
        name: 'Mystery',
        count: '720 Books',
        icon: '🔍',
        color: 'bg-rose-50 text-rose-800 border-rose-200',
    },
    {
        name: 'History',
        count: '510 Books',
        icon: '🏛️',
        color: 'bg-stone-100 text-stone-800 border-stone-200',
    },
];

const TopCategories = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-12">
                <span className="text-emerald-800 font-bold tracking-widest text-xs uppercase bg-emerald-100 px-3 py-1 rounded-md">
                    Explore Genres
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
                    Top Book Categories
                </h2>
                <p className="text-stone-600 max-w-lg mx-auto text-sm">
                    Find books tailored precisely to your mood and intellectual
                    curiosity.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                {categories.map((cat, idx) => (
                    <div
                        key={idx}
                        // onClick={() => navigateTo('all-books')}
                        className={`p-6 rounded-3xl border ${cat.color} hover:shadow-lg transition-all cursor-pointer text-center group flex flex-col items-center justify-center space-y-3`}
                    >
                        <span className="text-4xl group-hover:scale-110 transition-transform">
                            {cat.icon}
                        </span>
                        <h3 className="font-bold text-stone-900 text-lg">
                            {cat.name}
                        </h3>
                        <span className="text-xs font-semibold opacity-80">
                            {cat.count}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TopCategories;
