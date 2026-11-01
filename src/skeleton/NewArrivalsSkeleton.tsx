const NewArrivalsSkeleton = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
            {/* Header Skeleton */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                <div>
                    <div className="h-6 w-32 bg-stone-200 rounded-md" />

                    <div className="h-10 w-72 max-w-full bg-stone-200 rounded-lg mt-4" />
                </div>

                <div className="mt-4 md:mt-0 h-6 w-36 bg-stone-200 rounded-md" />
            </div>

            {/* Books Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm"
                    >
                        {/* Image Skeleton */}
                        <div className="h-72 bg-stone-200" />

                        {/* Content Skeleton */}
                        <div className="p-6 space-y-4">
                            <div className="h-6 w-3/4 bg-stone-200 rounded-md" />

                            <div className="h-4 w-1/2 bg-stone-200 rounded-md" />

                            <div className="space-y-2">
                                <div className="h-3 w-full bg-stone-200 rounded-md" />
                                <div className="h-3 w-5/6 bg-stone-200 rounded-md" />
                            </div>

                            {/* Footer */}
                            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                                <div className="h-7 w-32 bg-stone-200 rounded-lg" />

                                <div className="h-10 w-28 bg-stone-200 rounded-xl" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Button Skeleton */}
            <div className="text-center mt-12">
                <div className="h-14 w-64 max-w-full mx-auto bg-stone-200 rounded-2xl" />
            </div>
        </section>
    );
};

export default NewArrivalsSkeleton;
