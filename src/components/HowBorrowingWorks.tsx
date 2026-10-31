import React from 'react';

const HowBorrowingWorks = () => {
    return (
        <section className="bg-emerald-900 text-white py-20 my-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-16">
                <span className="text-emerald-300 font-bold tracking-widest text-xs uppercase bg-emerald-800/80 px-3 py-1 rounded-md">
                    Simple 3-Step Process
                </span>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                    How Borrowing Works
                </h2>
                <p className="text-emerald-100/80 max-w-xl mx-auto text-base">
                    Enjoy your favorite reads without hassle. Our streamlined
                    digital checkout takes seconds.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-emerald-800/60 border border-emerald-700/60 p-8 rounded-3xl backdrop-blur-md relative">
                    <div className="w-14 h-14 bg-emerald-700 text-white rounded-2xl flex items-center justify-center text-2xl font-black mb-6 shadow-lg">
                        1
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                        Explore & Select
                    </h3>
                    <p className="text-emerald-100/80 text-sm leading-relaxed">
                        Browse our extensive library catalog, filter by category
                        or search your preferred author, and pick your next
                        read.
                    </p>
                </div>

                <div className="bg-emerald-800/60 border border-emerald-700/60 p-8 rounded-3xl backdrop-blur-md relative">
                    <div className="w-14 h-14 bg-emerald-700 text-white rounded-2xl flex items-center justify-center text-2xl font-black mb-6 shadow-lg">
                        2
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                        Choose Duration
                    </h3>
                    <p className="text-emerald-100/80 text-sm leading-relaxed">
                        Click &ldquo;Borrow Now&rdquo; and choose your preferred
                        reading duration for a few days. Instant confirmation
                        guaranteed.
                    </p>
                </div>

                <div className="bg-emerald-800/60 border border-emerald-700/60 p-8 rounded-3xl backdrop-blur-md relative">
                    <div className="w-14 h-14 bg-emerald-700 text-white rounded-2xl flex items-center justify-center text-2xl font-black mb-6 shadow-lg">
                        3
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                        Read & Return
                    </h3>
                    <p className="text-emerald-100/80 text-sm leading-relaxed">
                        Track your borrowed titles in your dashboard. Return
                        them seamlessly when finished so others can enjoy them.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default HowBorrowingWorks;
