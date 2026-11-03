import MyBorrowsList from '@/components/MyBorrowsList';
import { auth } from '@/lib/auth';
import { getAllBorrow } from '@/query/getAllBorrow';
import { headers } from 'next/headers';

const page = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const userId = session?.user?.id;
    const borrow = await getAllBorrow(userId as string);
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
                <span className="text-emerald-800 font-bold tracking-widest text-xs uppercase bg-emerald-100 px-3 py-1 rounded-md">
                    Checkouts
                </span>
                <h1 className="text-3xl font-black text-stone-900 mt-2 tracking-tight">
                    My Borrowed Books
                </h1>
                <p className="text-sm text-stone-600 mt-1">
                    Track due dates and return borrowed books seamlessly.
                </p>
            </div>
            <MyBorrowsList books={borrow} />
        </div>
    );
};

export default page;
