import MyBookList from '@/components/MyBookList';
import { auth } from '@/lib/auth';
import { MyBooksList } from '@/query/myBooks';
import { PlusCircle } from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

// 1. Force Next.js to render this route dynamically per request
export const dynamic = 'force-dynamic';

const MyBookPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user?.id) {
        redirect('/login');
    }

    const userId = session?.user?.id;
    const books = await MyBooksList({ userId: userId ?? '' });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
                <div>
                    <span className="text-emerald-800 font-bold tracking-widest text-xs uppercase bg-emerald-100 px-3 py-1 rounded-md">
                        Management
                    </span>
                    <h1 className="text-3xl font-black text-stone-900 mt-2 tracking-tight">
                        My Contributed Books
                    </h1>
                    <p className="text-sm text-stone-600 mt-1">
                        Manage all the books you have added to the BookNook
                        library.
                    </p>
                </div>
                <Link
                    href="/add-book"
                    className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2 w-fit"
                >
                    <PlusCircle size={18} /> Add New Book
                </Link>
            </div>
            {books?.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 shadow-sm">
                    <h2 className="text-xl font-bold text-stone-900">
                        No Books Found
                    </h2>
                </div>
            ) : (
                books?.map((book) => <MyBookList key={book._id} book={book} />)
            )}
        </div>
    );
};

export default MyBookPage;
