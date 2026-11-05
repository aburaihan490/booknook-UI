import MyBorrowsList from '@/components/MyBorrowsList';
import { getAllBorrow } from '@/query/getAllBorrow';
import MyBorrowsSkeleton from '@/skeleton/MyBorrowsSkeleton';
import { Suspense } from 'react';

const page = async () => {
    const borrow = await getAllBorrow();
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
            <Suspense fallback={<MyBorrowsSkeleton />}>
                <MyBorrowsList books={borrow} />
            </Suspense>
        </div>
    );
};

export default page;
