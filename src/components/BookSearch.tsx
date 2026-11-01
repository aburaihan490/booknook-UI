'use client';

import { Search } from 'lucide-react';

interface BookSearchProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
}

export default function BookSearch({
    searchTerm,
    setSearchTerm,
}: BookSearchProps) {
    return (
        <div className="relative w-full md:w-96">
            <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                size={20}
            />

            <input
                type="text"
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm focus:outline-none focus:border-emerald-700 transition-colors"
            />
        </div>
    );
}
