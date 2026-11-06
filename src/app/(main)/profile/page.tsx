'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    BookOpen,
    BookmarkCheck,
    Mail,
    ShieldCheck,
    Edit3,
} from 'lucide-react';
import { authClient } from '@/lib/auth-client';

const ProfilePage = () => {
    const { data: currentUser, isPending } = authClient.useSession();
    const [activeTab, setActiveTab] = useState<'books' | 'borrows'>('books');

    const defaultUserPhoto =
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150';

    if (isPending) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-800"></div>
            </div>
        );
    }

    const user = currentUser?.user;

    return (
        <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Profile Header Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden">
                    <div className="h-40 bg-linear-to-r from-emerald-800 via-emerald-700 to-teal-800 relative">
                        <div className="absolute inset-0 bg-black/10"></div>
                    </div>

                    <div className="px-6 sm:px-10 pb-8 pt-0 relative flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-20 gap-6">
                        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 text-center sm:text-left">
                            <Image
                                width={128}
                                height={128}
                                src={user?.image || defaultUserPhoto}
                                alt={user?.name || 'User'}
                                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl bg-white"
                            />
                            <div className="space-y-1 mb-2">
                                <h1 className="text-2xl sm:text-3xl font-black bg-linear-to-r from-yellow-400 via-black-700 to-teal-500 bg-clip-text text-transparent">
                                    {user?.name || 'Library Member'}
                                </h1>
                                <p className="text-sm font-medium text-stone-500 flex items-center justify-center sm:justify-start gap-1.5">
                                    <Mail
                                        size={15}
                                        className="text-emerald-700"
                                    />
                                    {user?.email || 'user@example.com'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link
                                href="/profile/edit"
                                className="px-5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-xl transition-all flex items-center gap-2 shadow-sm text-sm"
                            >
                                <Edit3 size={16} />
                                Edit Profile
                            </Link>
                        </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-stone-100 bg-stone-50/50">
                        <div className="px-6 py-4 flex items-center gap-4 border-b sm:border-b-0 sm:border-r border-stone-100">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                                <BookOpen size={22} />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                                    My Books
                                </p>
                                <p className="text-xl font-black text-stone-800">
                                    4 Books
                                </p>
                            </div>
                        </div>

                        <div className="px-6 py-4 flex items-center gap-4 border-b sm:border-b-0 sm:border-r border-stone-100">
                            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center">
                                <BookmarkCheck size={22} />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                                    Active Borrows
                                </p>
                                <p className="text-xl font-black text-stone-800">
                                    2 Books
                                </p>
                            </div>
                        </div>

                        <div className="px-6 py-4 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                                <ShieldCheck size={22} />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                                    Account Status
                                </p>
                                <p
                                    className={`text-xl font-black  ${user?.emailVerified ? 'text-emerald-700' : 'text-red-500'}`}
                                >
                                    {user?.emailVerified
                                        ? 'Verified'
                                        : 'UnVerified'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section with Tabs */}
                <div className="bg-white rounded-3xl shadow-xl border border-stone-200 p-6 sm:p-8 space-y-6">
                    <div className="flex border-b border-stone-200 gap-8">
                        <button
                            onClick={() => setActiveTab('books')}
                            className={`pb-4 font-bold text-base transition-colors relative cursor-pointer ${
                                activeTab === 'books'
                                    ? 'text-emerald-800 border-b-2 border-emerald-800'
                                    : 'text-stone-400 hover:text-stone-700'
                            }`}
                        >
                            Recently Added Books
                        </button>
                        <button
                            onClick={() => setActiveTab('borrows')}
                            className={`pb-4 font-bold text-base transition-colors relative cursor-pointer ${
                                activeTab === 'borrows'
                                    ? 'text-emerald-800 border-b-2 border-emerald-800'
                                    : 'text-stone-400 hover:text-stone-700'
                            }`}
                        >
                            Current Borrowed Books
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div>
                        {activeTab === 'books' ? (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-stone-800 text-lg">
                                        Books Uploaded by You
                                    </h3>
                                    <Link
                                        href="/my-books"
                                        className="text-sm font-semibold text-emerald-700 hover:underline"
                                    >
                                        View All →
                                    </Link>
                                </div>
                                <div className="p-8 text-center bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                                    <p className="text-stone-500 text-sm">
                                        You have added books to the library.
                                    </p>
                                    <Link
                                        href="/add-book"
                                        className="mt-3 inline-block px-4 py-2 bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md hover:bg-emerald-900 transition-colors"
                                    >
                                        + Add New Book
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-stone-800 text-lg">
                                        Books You Borrowed
                                    </h3>
                                    <Link
                                        href="/my-borrows"
                                        className="text-sm font-semibold text-emerald-700 hover:underline"
                                    >
                                        View All →
                                    </Link>
                                </div>
                                <div className="p-8 text-center bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                                    <p className="text-stone-500 text-sm">
                                        You currently have active borrowed
                                        books.
                                    </p>
                                    <Link
                                        href="/books"
                                        className="mt-3 inline-block px-4 py-2 bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md hover:bg-emerald-900 transition-colors"
                                    >
                                        Browse Library
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
