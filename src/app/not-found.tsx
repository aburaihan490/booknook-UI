'use client';
import Link from 'next/link';
import { BookOpen, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <main className="flex min-h-[80vh] items-center justify-center bg-stone-50 px-5 py-16">
            <div className="w-full max-w-lg text-center">
                {/* Icon */}
                <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-emerald-100">
                    <BookOpen size={48} className="text-emerald-800" />
                </div>

                {/* 404 */}
                <h1 className="text-8xl font-black tracking-tight text-emerald-900">
                    404
                </h1>

                <h2 className="mt-5 text-2xl font-bold text-stone-800">
                    Oops! Page Not Found
                </h2>

                <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-stone-500">
                    Looks like this page has gone missing from our library. The
                    page you are looking for might have been removed, renamed,
                    or is temporarily unavailable.
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-800 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-emerald-900"
                    >
                        <Home size={18} />
                        Back to Home
                    </Link>

                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-stone-300 bg-white px-6 py-3 font-semibold text-stone-700 transition hover:bg-stone-100"
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </button>
                </div>

                <p className="mt-12 text-xs font-medium tracking-widest text-stone-400">
                    BOOKNOOK · YOUR NEXT CHAPTER STARTS HERE
                </p>
            </div>
        </main>
    );
}
