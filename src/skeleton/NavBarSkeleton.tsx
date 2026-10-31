const NavBarSkeleton = () => {
    return (
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                {/* Logo Skeleton */}
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-stone-200 animate-pulse" />

                    <div className="space-y-2">
                        <div className="w-28 h-5 rounded bg-stone-200 animate-pulse" />
                        <div className="w-20 h-3 rounded bg-stone-200 animate-pulse" />
                    </div>
                </div>

                {/* Desktop Navigation Skeleton */}
                <nav className="hidden md:flex items-center gap-8">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div
                            key={item}
                            className="w-16 h-4 rounded bg-stone-200 animate-pulse"
                        />
                    ))}
                </nav>

                {/* Auth Skeleton */}
                <div className="hidden md:flex items-center gap-4">
                    <div className="w-16 h-9 rounded-xl bg-stone-200 animate-pulse" />
                    <div className="w-24 h-9 rounded-xl bg-stone-200 animate-pulse" />
                </div>

                {/* Mobile Skeleton */}
                <div className="md:hidden flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-stone-200 animate-pulse" />
                    <div className="w-8 h-8 rounded-lg bg-stone-200 animate-pulse" />
                </div>
            </div>
        </header>
    );
};

export default NavBarSkeleton;
